const puppeteer = require("puppeteer");
const { inspect } = require("util");
const path = require("path");
const fs = require("fs");
require('dotenv').config({ path: ".env" });

class AutoTestPlugin {
    pageCache = {}
    browser = undefined
    componentEditStates = {} // Track whether components are in edit mode
    importedComponents = {}  // Track imported components

    /**@type {import("../definitions/template").AutoTestPluginOption}*/
    options

    /**
     * @type {Record<string, number>}
     */
    componentCache = {}

    /**
     * @param options {import("../definitions/template").AutoTestPluginOption}
     */
    constructor(options) {
        this.options = options
        this.setupTestingBrowser().then(browser => this.browser = browser)

        const tempPath = path.resolve(__dirname, "tmp/fileHashes.json")
        if (fs.existsSync(tempPath)) {
            const cache = fs.readFileSync(tempPath)
            this.componentCache = JSON.parse(cache)
        }
    }

    cyrb53(str, seed = 0) {
        let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
        for (let i = 0, ch; i < str.length; i++) {
            ch = str.charCodeAt(i);
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }
        h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
        h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
        h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
        h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

        return 4294967296 * (2097151 & h2) + (h1 >>> 0);
    }

    apply(compiler) {
        compiler.hooks.assetEmitted.tapAsync('AutoTestPlugin', (file, info, callback) => {
            if (!file.endsWith('.component.js') && !file.endsWith('component.import.txt')) {
                callback();
                return;
            }

            let componentPath = file.replace('.component.js', '')
                .replace('.component.import.txt', '');
            const componentParts = componentPath.split(path.sep);
            const componentName = componentParts[componentParts.length - 1];
            const componentCategory = componentParts.slice(0, -1).join(path.sep);

            let testingURL;

            // Check if the component is in a subfolder
            if (this.options.components[componentCategory] && this.options.components[componentCategory][componentName]) {
                testingURL = this.options.components[componentCategory][componentName];
            } else if (this.options.components[componentName]) {
                // Check if the component is at the root level
                testingURL = this.options.components[componentName];
            }

            if (!testingURL) {
                callback();
                return;
            }

            console.log(file);
            console.log(file.endsWith('.component.import.txt'));

            // Determine if this is an import file or the first load
            const isImportFile = file.endsWith('.component.import.txt');
            const isFirstLoad = !this.pageCache[componentName];
            console.log("IsFirstLoad", isFirstLoad);
            console.log("Component Cache:", this.componentCache);
            console.log("Page Cache:", this.pageCache);

            const content = info.content.toString();
            const hash = this.cyrb53(content);

            // Check if this component has already been imported
            if (isImportFile && this.importedComponents[componentName]) {
                console.log(`Import file for ${componentName} already processed. Skipping.`);
                callback();
                return;
            }

            // For first load, try to read the import file
            let importContent = null;
            if (isFirstLoad) {
                // Construct path using dist directory
                const distPath = path.resolve(compiler.options.output.path);
                const importFilePath = path.join(distPath, componentPath + '.component.import.txt');
                if (fs.existsSync(importFilePath)) {
                    importContent = fs.readFileSync(importFilePath, 'utf8');
                    console.log(`Found import file for ${componentName}`);
                } else {
                    console.log(`No import file found for ${componentName} at ${importFilePath}`);
                }
            }

            // Get the cached hash, defaulting to -1 if not found
            const cachedHash = this.componentCache[componentName] || -1;

            // Only proceed if the hash is different from the cached hash
            if (hash !== cachedHash) {
                console.log(`Component ${componentName} changed (hash: ${hash}, cached: ${cachedHash})`);
                this.componentCache[componentName] = hash;

                // Save the updated component cache
                const folder = path.resolve(__dirname, 'tmp');
                if (!fs.existsSync(folder)) {
                    fs.mkdirSync(folder);
                }
                const ws = fs.createWriteStream(path.join(folder, '/fileHashes.json'));
                ws.write(JSON.stringify(this.componentCache));

                // Mark as imported if this is an import file
                if (isImportFile) {
                    this.importedComponents[componentName] = true;
                }

                // Run test for the changed component
                this.getTestingPage(this.browser, componentName, testingURL, importContent)
                    .then((page) => {
                        return this.runCode(page, content, testingURL);
                    })
                    .then(() => {
                        callback();
                    })
                    .catch((err) => {
                        console.error(`Error running test for component: ${componentName}`, err);
                        callback();
                    });
            } else {
                console.log(`Component ${componentName} unchanged (hash: ${hash})`);
                callback();
            }
        });
    }

    /**
     *
     * @param browser {import("puppeteer").Browser}
     * @param componentName {string}
     * @return {Promise<import("puppeteer").Page>}
     */
    async getTestingPage(browser, componentName, testingURL, importString) {
        if (this.pageCache[componentName]) {
            return this.pageCache[componentName]
        }

        // Component will start in edit mode when first created/imported
        this.componentEditStates[componentName] = true;

        const page = await browser.newPage()

        // Get the screen dimensions
        const { width, height } = await page.evaluate(() => {
            return {
                width: window.screen.availWidth,
                height: window.screen.availHeight,
            };
        });

        await page.setViewport({ width, height });
        await page.goto(testingURL)

        const changeTitle = page.evaluate(({ componentName }) => {
            document.title = componentName
        }, { componentName })

        // enter dashboard edit
        await page.click("button.react-tile__action:nth-child(3)")

        // Selectors for import process
        const importButtonSelector = ".report-component-dashboard__component-buttons > button:nth-child(2)";
        const importTextareaSelector = '#report-component-dashboard-container > div > div:nth-child(2) > div.react-tile__content.react-tile__content--regular > div > div.textarea > textarea';
        const importContinueButtonSelector = '#report-component-dashboard-container > div > div:nth-child(2) > div.react-tile__content.react-tile__content--regular > div > div.vertical-content.save-changes-or-cancel-buttons.vertical-content--position-center.vertical-content--gap-content-padding > div > button.react-button.react-button--style-primary';

        await page.waitForSelector(importButtonSelector, { timeout: 60000 });

        const componentsCount = (await page.$$('.report-component-dashboard__cell-overlay')).length;

        if (importString) {
            await page.click(importButtonSelector);

            await page.waitForSelector(importTextareaSelector);
            await page.focus(importTextareaSelector);
            await page.keyboard.down('Control');
            await page.keyboard.press('A');
            await page.keyboard.up('Control');
            await page.keyboard.press('Backspace');

            // Use clipboardy to paste the string
            const clipboardy = (await import("clipboardy")).default;
            await clipboardy.writeSync(importString);
            await page.keyboard.down('Control');
            await page.keyboard.press('V');
            await page.keyboard.up('Control');

            await page.click(importContinueButtonSelector);

            // // Wait for import to complete and for edit button to be registered
            // await page.waitForSelector('#report-component-dashboard-container > div > div.react-tile.report-component-dashboard.report-component-dashboard--is-being-edited > div.react-tile__content.react-tile__content--narrow > div > div.react-grid-layout.layout > div:nth-child(1) > div.report-component-dashboard__cell-buttons > button:nth-child(2)', { timeout: 60000 });

            // // Add a small delay to ensure component is fully loaded
            // await page.waitForTimeout(1000);
        } else {
            // If no import string, create a new component
            const newComponentButton = ".report-component-dashboard__component-buttons > button:nth-child(1)";
            await page.waitForSelector(newComponentButton, { timeout: 60000 })
            await page.$eval(newComponentButton, element => element.click())
        }

        await page.waitForFunction(componentsCount => {
            return document.getElementsByClassName("report-component-dashboard__cell-overlay").length > componentsCount
        }, {}, componentsCount)

        // Wait for component to be fully rendered and interactable
        // await page.waitForTimeout(500);

        await this.selectAndEditLatestComponent(page, componentName);


        const printResponse = (response) => {
            if (response.url().includes('https://www.warcraftlogs.com/reports/evaluate-component-script') && response.ok()) {
                response.json().then((content) => {
                    if (content.result?.props?.content && content.result.props.content === "Hello world!") {
                        return
                    }
                    console.log(inspect(content, true, 10, true))
                })
            }
        }
        page.on('response', printResponse);

        await changeTitle
        this.pageCache[componentName] = page
        return page
    }

    // Improved component selection and editing
    async selectAndEditLatestComponent(page, componentName) {
        try {
            // Wait for all components to be visible
            await page.waitForSelector('.react-grid-layout .react-grid-item', { visible: true, timeout: 5000 });

            // Find the most recently added component
            const components = await page.$$('.react-grid-layout .react-grid-item');
            const latestComponent = components[0];

            // Hover over the latest component
            await latestComponent.hover();

            // Wait briefly after hover
            await page.waitForTimeout(100);

            // Find and click the edit button for this specific component
            const editButton = await latestComponent.$('button.react-button:nth-child(2)');
            if (editButton) {
                await editButton.click();
            } else {
                console.warn('Edit button not found for the latest component');

                // Fallback: try to find edit button using more generic selector
                const fallbackEditSelector = '.react-grid-layout .react-grid-item button.react-button:nth-child(2)';
                await page.click(fallbackEditSelector);
            }
        } catch (error) {
            console.error('Error selecting and editing component:', error);

            // Last resort: try original method
            const firstComponentSelector = "div.react-grid-layout div.react-grid-item:first-child";
            await page.waitForSelector(firstComponentSelector, { visible: true });
            await page.hover(firstComponentSelector);
            await page.waitForTimeout(100);
            const editButtonSelector = `${firstComponentSelector} button.react-button:nth-child(2)`;
            await page.waitForSelector(editButtonSelector, { visible: true });
            await page.click(editButtonSelector);
            this.componentEditStates[componentName] = true;
        }
        this.componentEditStates[componentName] = true;
    }

    async setupTestingBrowser() {
        if (this.browser) {
            return this.browser
        }

        const browser = await puppeteer.launch({
            headless: false,
            args: ['--start-maximized']
        });
        const page = await browser.newPage();
        await page.goto('https://www.warcraftlogs.com/login');

        // Get the screen dimensions
        const { width, height } = await page.evaluate(() => {
            return {
                width: window.screen.availWidth,
                height: window.screen.availHeight,
            };
        });

        // Set the viewport size to match the screen dimensions
        await page.setViewport({ width, height });

        switch (this.options.loginMethod) {
            case "WCL":
                await this.loginToWCLWithWCL(page)
                break
            case "USA":
                await this.loginWithBNET(page, 1)
                break
            case "EUROPE":
                await this.loginWithBNET(page, 2)
                break
            case "KOREA":
                await this.loginWithBNET(page, 3)
                break
            case "TAIWAN":
                await this.loginWithBNET(page, 4)
                break
        }
        return browser
    }

    /**
     * @param page {import("puppeteer").Page}
     * @return {Promise<void>}
     */
    async loginToWCLWithWCL(page) {
        const login = process.env.WCL_LOGIN_EMAIL ? process.env.WCL_LOGIN_EMAIL : ""
        const passwort = process.env.WCL_PASSWORD ? process.env.WCL_PASSWORD : ""
        await page.type("#email", login)
        await page.type("#password", passwort)

        await Promise.all([
            page.click(".dialog-table > tbody:nth-child(1) > tr:nth-child(4) > td:nth-child(1) > input:nth-child(1)"),
            page.waitForNavigation({
                waitUntil: "networkidle0"
            })
        ]);
    }

    /**
     * @param page {import("puppeteer").Page}
     * @param regionNumber
     * @return {Promise<void>}
     */
    async loginWithBNET(page, regionNumber) {
        const nthButtonSelector = `.bnet-tab:nth-of-type(${regionNumber})`;

        const nthButton = await page.$(nthButtonSelector);

        if (nthButton) {
            await nthButton.click();
        } else {
            console.error(`No button found with selector ${nthButtonSelector}`);
        }

        await page.waitForNavigation({
            waitUntil: 'networkidle0',
        });

        const login = process.env.BNET_LOGIN_EMAIL ? process.env.BNET_LOGIN_EMAIL : ""
        const passwort = process.env.BNET_PASSWORD ? process.env.BNET_PASSWORD : ""

        await page.waitForSelector('#accountName', { visible: true });
        await page.type("#accountName", login)
        await page.type("#password", passwort)
        await page.click('#submit');
        await page.waitForFunction(() => {
            return !document.URL.includes("battle.net")
        }, { timeout: 60000 });
    }

    /**
     *
     * @param page {import("puppeteer").Page}
     * @param content {string}
     * @return {Promise<void>}
     */
    async runCode(page, content, testingURL) {
        try {
            await page.bringToFront()
        } catch (e) {
            this.browser = undefined
            this.pageCache = {}
            this.browser = await this.setupTestingBrowser()
            this.pageCache = await this.getTestingPage(this.browser, await page.title(), testingURL, content)
        }

        const componentName = await page.title();

        // If component is not in edit mode, enter edit mode
        if (!this.componentEditStates[componentName]) {
            await this.selectAndEditLatestComponent(page, componentName);
        }

        await this.pasteCode(page, content);

        // Click Run
        const runButtonSelector = "#report-component-dashboard-container > div > div.react-tile.report-component-dashboard__cell-edited > div.react-tile__content.react-tile__content--regular > div > div:nth-child(1) > div.report-component-sandbox__buttons > button"
        console.log("runCode: Waiting for run button");
        await page.waitForSelector(runButtonSelector, { timeout: 60000 });
        console.log("runCode: Clicking run button");
        await page.$eval(runButtonSelector, element => element.click());
        console.log("runCode: Clicked run button");

        // Click Continue
        console.log("runCode: Waiting for continue button");
        const continueButtonSelector = "div.vertical-content.save-changes-or-cancel-buttons.vertical-content--position-center.vertical-content--gap-content-padding > div > button.react-button.react-button--style-primary";
        await page.waitForSelector(continueButtonSelector, { timeout: 60000 });

        // Wait for the button to not be disabled
        await page.waitForFunction((selector) => {
            const button = document.querySelector(selector);
            return button && !button.disabled;
        }, { timeout: 60000 }, continueButtonSelector);
        
        console.log("runCode: Clicking continue button");
        await page.click(continueButtonSelector);
        console.log("runCode: Clicked continue button");

        // Update edit state
        this.componentEditStates[componentName] = false;
    }

    async pasteCode(page, content) {
        const monacoEditor = ".monaco-editor.no-user-select";
        const editorHandle = (await page.$$(monacoEditor))[1];
        await editorHandle.click();
        await page.keyboard.down('ControlLeft');
        await page.keyboard.press('KeyA');
        await page.keyboard.up('ControlLeft');
        await page.keyboard.press('Backspace');
        const clipboardy = (await import("clipboardy")).default;
        clipboardy.writeSync(content);
        await page.keyboard.down('ControlLeft');
        await page.keyboard.press('KeyV');
        await page.keyboard.up('ControlLeft');
    }
}

module.exports = AutoTestPlugin