let getComponent;(()=>{"use strict";var e={306:function(e,o,r){var t=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(o,"__esModule",{value:!0});const n=t(r(313)),s=r(863),l=r(803),a=r(207),i=new n.default(false),c=27e3,p={425610:!0},u={Tank:!0,Healer:!0},d={Augmentation:!1};o.default=getComponent=()=>{var e,o,r;const t={},n={};for(const f of reportGroup.fights){const g=f.startTime+4e3,m=g+54e3,D=(0,a.getIgnoredActors)(f,n,u,d,i),v=(0,s.eventsByCategoryAndDisposition)(f,"damage","friendly"),y={},h=(0,l.binarySearch)(v,g,0,v.length-1),A=(0,l.binarySearch)(v,m,h,v.length-1);for(let n=h;n<A;n++){const s=v[n],l=s.source;if(l){const a=l.id,i="Pet"===l.type,u=i&&null!==l.petOwner;if(a&&D[a]||i&&u&&l.petOwner&&D[null===(e=l.petOwner)||void 0===e?void 0:e.id])continue;const d=null===(o=s.ability)||void 0===o?void 0:o.id;if(d&&p[d])continue;const f=u?null===(r=l.petOwner)||void 0===r?void 0:r.name:l.name,m=s.amount,v=Math.floor((s.timestamp-g)/c);if(y[v]?y[v].endIndex=n:y[v]={startIndex:n,endIndex:n},f&&(u||!i)){if(!t[f]){t[f]={};for(let e=0;e<2;e++)t[f][e]=0}t[f][v]=(t[f][v]||0)+m}}}}for(const e in t)for(const o in t[e])t[e][o]/=n[e];i.addMessage("aggregatedDamage",t);const f=(e=>{const o={};for(let e=1;e<=14;e++)o[`Player ${e}`]="-";return e.map((e=>{const r=Object.assign({Time:e.Time||"-"},o);for(const o in e)"Time"!==o&&(r[o]=e[o]);return r}))})((e=>{const o=new Array(2);let r=0;for(let t=0;t<2;t++){const n=t*c+4e3,s=n+c,a=[];for(const o in e){const r=e[o][t]||0;a.push([o,r])}if(a.sort(((e,o)=>o[1]-e[1])),0===a.length||0===a[0][1])continue;const i={Time:`${(0,l.formatTime)(n)}-${(0,l.formatTime)(s)}`};for(let e=0;e<a.length;e++){const[o,r]=a[e];i[`Player ${e+1}`]=`${o} - ${(r/1e6).toFixed(2)}m`}o[r]=i,r++}return o.length=r,o})(t));i.addMessage("chartData",f);const g=new Set;for(const e of f)for(const o in e)"Time"!==o&&g.add(o);const m={Time:{header:"Time",textAlign:"center"}};for(const e of g)m[e]={header:e,textAlign:"center"};return{component:"Table",props:{columns:m,data:f}}}},704:(e,o)=>{Object.defineProperty(o,"__esModule",{value:!0}),o.CLASSES=void 0,o.CLASSES={DeathKnight:{color:"#C41E3A",specs:{Blood:{role:"Tank"},Frost:{role:"Dps"},Unholy:{role:"Dps"}}},DemonHunter:{color:"#A330C9",specs:{Havoc:{role:"Dps"},Vengeance:{role:"Tank"}}},Druid:{color:"#FF7C0A",specs:{Balance:{role:"Dps"},Feral:{role:"Dps"},Guardian:{role:"Tank"},Restoration:{role:"Healer"}}},Evoker:{color:"#33937F",specs:{Devastation:{role:"Dps"},Preservation:{role:"Healer"}}},Hunter:{color:"#AAD372",specs:{BeastMastery:{role:"Dps"},Marksmanship:{role:"Dps"},Survival:{role:"Dps"}}},Mage:{color:"#3FC7EB",specs:{Arcane:{role:"Dps"},Fire:{role:"Dps"},Frost:{role:"Dps"}}},Monk:{color:"#00FF98",specs:{Brewmaster:{role:"Tank"},Mistweaver:{role:"Healer"},Windwalker:{role:"Dps"}}},Paladin:{color:"#F48CBA",specs:{Holy:{role:"Healer"},Protection:{role:"Tank"},Retribution:{role:"Dps"}}},Priest:{color:"#FFFFFF",specs:{Discipline:{role:"Healer"},Holy:{role:"Healer"},Shadow:{role:"Dps"}}},Rogue:{color:"#FFF468",specs:{Assassination:{role:"Dps"},Outlaw:{role:"Dps"},Subtlety:{role:"Dps"}}},Shaman:{color:"#0070DD",specs:{Elemental:{role:"Dps"},Enhancement:{role:"Dps"},Restoration:{role:"Healer"}}},Warlock:{color:"#8788EE",specs:{Affliction:{role:"Dps"},Demonology:{role:"Dps"},Destruction:{role:"Dps"}}},Warrior:{color:"#C69B6D",specs:{Arms:{role:"Dps"},Fury:{role:"Dps"},Protection:{role:"Tank"}}}}},313:(e,o)=>{Object.defineProperty(o,"__esModule",{value:!0});o.default=class{constructor(e){this.messages=[],this.debug=e}addMessage(e,o){if(!this.debug)return;const r={};r[e]=o,this.messages.push(r)}}},155:(e,o,r)=>{Object.defineProperty(o,"__esModule",{value:!0});const t=r(704);o.default=function(e,o){var r;const n=o.subType,s=e.specForPlayer(o);if(n in t.CLASSES&&s){const e=t.CLASSES[n].specs;if(s in e)return null===(r=e[s])||void 0===r?void 0:r.role}}},207:function(e,o,r){var t=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(o,"__esModule",{value:!0}),o.getIgnoredActors=void 0;const n=t(r(155));o.getIgnoredActors=function(e,o,r,t,s){const l={};for(const s of e.allCombatantInfoEvents){const a=s.source;if(a&&(r[(0,n.default)(e,a)]||t[e.specForPlayer(a)]))l[a.id]=!0;else{const e=null==a?void 0:a.name;e&&(o[e]||(o[e]=1),o[e]++)}}return s.addMessage("ignoredActors",l),l}},803:(e,o)=>{Object.defineProperty(o,"__esModule",{value:!0}),o.binarySearch=o.unslug=o.removeSpaces=o.formatTime=void 0;o.formatTime=e=>{const o=Math.floor(e/1e3),r=Math.floor(o/60),t=o%60;return`${String(r).padStart(2,"0")}:${String(t).padStart(2,"0")}`};o.removeSpaces=e=>e.replace(/\s+/g,"");o.unslug=e=>e.replace(/([A-Z])/g,((e,o,r)=>0===r?o:" "+o));o.binarySearch=(e,o,r,t)=>{for(;r<=t;){const n=Math.floor((r+t)/2),s=e[n].timestamp;if(s<o)r=n+1;else{if(!(s>o))return n;t=n-1}}return r}},863:(e,o)=>{Object.defineProperty(o,"__esModule",{value:!0}),o.allEventsByCategoryAndDisposition=o.eventsByCategoryAndDisposition=void 0,o.eventsByCategoryAndDisposition=function(e,o,r){return e.eventsByCategoryAndDisposition(o,r)},o.allEventsByCategoryAndDisposition=function(e,o,r){return e.allEventsByCategoryAndDisposition(o,r)}}},o={};var r=function r(t){var n=o[t];if(void 0!==n)return n.exports;var s=o[t]={exports:{}};return e[t].call(s.exports,s,s.exports,r),s.exports}(306);globalThis.getComponent=r.default})();
 /*Source Code LZString compressed, Base64 encoded 
N4KABBYEQMYPYFsFwHYB00BECGDsHMBTABUICcBJFAF3IDdsAbKALmniVQxzyNMpr0mYeAFdGAEzAo41MACNCYAGZxRKCVBABfIA
*/