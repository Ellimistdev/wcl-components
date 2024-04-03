let getComponent;(()=>{"use strict";var e={3:function(e,t,n){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=n(863),i=o(n(74)),s=403543;t.default=getComponent=()=>{var e,t;const n=[];for(const o of reportGroup.fights){if(2680!==o.encounterId)continue;if(o.endTime-o.startTime<45e3)continue;const i=(0,r.eventsByCategoryAndDisposition)(o,"deathsAndResurrects","friendly");for(const r of i){if("death"!==r.type)continue;if(!r.target||"Player"!==r.target.type)continue;if(r.isFeign)continue;if(!r.killer)continue;if(r.ability&&r.ability.id===s){n.push(r.target);continue}const i=o.eventsPriorToDeath(r);let a;for(const o of i){if(a||"damage"!==o.type||(a=o),(null===(e=o.target)||void 0===e?void 0:e.idInReport)===r.target.idInReport&&o.targetResources&&o.targetResources.hitPoints/o.targetResources.maxHitPoints>=.95)break;if("damage"===o.type&&(null===(t=o.ability)||void 0===t?void 0:t.id)===s){if((null==a?void 0:a.overkill)&&a.overkill>=o.amount)continue;n.push(r.target);break}}}}const o={};for(const e of n){const t=e.name;o[t]?o[t].y+=1:o[t]={y:1,color:(0,i.default)(e.subType)}}const a=[];for(const e in o)a.push([e,o[e]]);a.sort(((e,t)=>t[1].y-e[1].y));const u={};return a.forEach((e=>u[e[0]]=e[1])),{component:"Chart",props:{chart:{type:"column"},title:{text:'Deaths in which <AbilityIcon id={LAVA_WAVE_ID} icon="spell_shaman_lavasurge">Lava Wave</AbilityIcon> was involved'},xAxis:{categories:Object.keys(u)},yAxis:{min:0,title:{text:"Death Count"},tickInterval:1},series:[{name:"Deaths",data:Object.values(u),colorByPoint:!0}]}}}},74:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){switch(e){case"DeathKnight":return"#C41E3A";case"DemonHunter":return"#A330C9";case"Druid":return"#FF7C0A";case"Evoker":return"#33937F";case"Hunter":return"#AAD372";case"Mage":return"#3FC7EB";case"Monk":return"#00FF98";case"Paladin":return"#F48CBA";case"Priest":return"#FFFFFF";case"Rogue":return"#FFF468";case"Shaman":return"#0070DD";case"Warlock":return"#8788EE";case"Warrior":return"#C69B6D"}throw new Error("Argument not supported")}},863:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.allEventsByCategoryAndDisposition=t.eventsByCategoryAndDisposition=void 0,t.eventsByCategoryAndDisposition=function(e,t,n){return e.eventsByCategoryAndDisposition(t,n)},t.allEventsByCategoryAndDisposition=function(e,t,n){return e.allEventsByCategoryAndDisposition(t,n)}}},t={};var n=function n(o){var r=t[o];if(void 0!==r)return r.exports;var i=t[o]={exports:{}};return e[o].call(i.exports,i,i.exports,n),i.exports}(3);globalThis.getComponent=n.default})();
 /*Source Code LZString compressed, Base64 encoded 
N4KABBYEQKYHYGMD2BXOAXGAnAygBxgQEsAzIhAHQoBEiYATAFSQBkBDANzYHVOYoAXNHjI0mXAWJlKNOk1acefMKIA29MHCTowAIxhgSqOPSggAvkA=
*/