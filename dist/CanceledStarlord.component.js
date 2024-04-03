let getComponent;(()=>{"use strict";var t={769:function(t,e,s){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});const r=i(s(313)),n=i(s(300)),o=s(863),a=i(s(123)),d=279709,u=new r.default(false),l="Canceled Starlord";e.default=getComponent=()=>{if(1!==reportGroup.fights.length)return(0,n.default)(l,"Please select a single fight");const t=reportGroup.fights[0];if(1!==t.combatantInfoEvents.length)return(0,n.default)(l,"Please select a single <Druid>");const e=t.combatantInfoEvents[0].source;if(!e||"Druid"!==e.subType)return(0,n.default)(l,"Please select a single <Druid>");const s=(0,o.eventsByCategoryAndDisposition)(t,"aurasGained","friendly"),i=new a.default(s,{sourceFilters:[{idInReport:e.idInReport}],auraIds:new Set([d]),captureEvent:!0});if(u.addMessage("BuffManager",i),!i.actors[e.id]||!i.actors[e.id].targets[e.id]||!i.actors[e.id].targets[e.id].buffs[279709])return[];const r=i.actors[e.id].targets[e.id].buffs[279709].sortedTimeSpans;let f=0;const c=[];for(const[t,e]of r){const s=Math.round(e/1e3)-Math.round(t/1e3),i=e/1e3-t/1e3;c.push(i),s<15&&s>1&&f++}u.addMessage("Applications",r.length),u.addMessage("Canceled",f),u.addMessage("All Durations",c),u.addMessage("All Timings",r);return{component:"EnhancedMarkdown",props:{content:`\n# <u>${l} for <Druid>${e.name}</Druid></u>\nDetected Starlord applications: ${r.length}\n\n\nStarlord canceled: ${f}\n`}}}},313:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0});e.default=class{constructor(t){this.messages=[],this.debug=t}addMessage(t,e){if(!this.debug)return;const s={};s[t]=e,this.messages.push(s)}}},123:function(t,e,s){var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.Aura=void 0;const r=i(s(561));e.default=class{constructor(t,e={}){this.actors={};for(const s of t){if(!s.ability||!s.target||!s.source)continue;if(s.type.includes("stack"))continue;if("Pet"===s.target.type)continue;if("friendly"!==s.targetDisposition)continue;if(e.auraIds&&!e.auraIds.has(s.ability.id))continue;if(e.fight&&e.fight.isEventExcludedFromDamageRankings(s))continue;if(e.targetFilters&&(0,r.default)(s.target,e.targetFilters))continue;if(e.sourceFilters&&(0,r.default)(s.source,e.sourceFilters))continue;if(e.abilityFilters&&(0,r.default)(s.ability,e.abilityFilters))continue;const t=new n(s.source.id),i=new o(s.target.id),d=new a(s.ability.id);s.type.includes("apply")?this.addActor(t).addTarget(i).addBuff(d).buffApplied(s,e.captureEvent):s.type.includes("remove")&&this.addActor(t).addTarget(i).addBuff(d).buffRemoved(s,e.captureEvent)}}addActor(t){return this.actors[t.id]?this.actors[t.id]:(this.actors[t.id]=t,t)}getAurasBySourceActor(t){if(this.actors[t])return this.actors[t]}getSelfBuff(t,e){return this.actors[t].targets[t].buffs[e]}};class n{constructor(t){this.targets={},this.id=t}addTarget(t){return this.targets[t.id]?this.targets[t.id]:(this.targets[t.id]=t,t)}}class o{constructor(t){this.buffs={},this.id=t}addBuff(t){return this.buffs[t.id]?this.buffs[t.id]:(this.buffs[t.id]=t,t)}}class a{constructor(t){this.applied=[],this.removed=[],this.events={},this.id=t}buffApplied(t,e=!1){this.applied.push(t.timestamp),e&&(this.events[t.timestamp]=t)}buffRemoved(t,e=!1){this.removed.push(t.timestamp),e&&(this.events[t.timestamp]=t)}get appliedTimings(){return this.applied}get removedTimings(){return this.removed}get sortedTimeSpans(){if(this._sortedTimes)return JSON.parse(JSON.stringify(this._sortedTimes));for(this.applied=Array.from(new Set(this.applied)),this.removed=Array.from(new Set(this.removed));this.applied.length<this.removed.length;)this.applied.unshift(0);for(this.applied.sort(((t,e)=>t-e));this.removed.length<this.applied.length;)this.removed.push(1/0);return this.removed.sort(((t,e)=>t-e)),this._sortedTimes=Array.from(Array(Math.max(this.applied.length,this.removed.length)),((t,e)=>[this.applied[e]?this.applied[e]:0,this.removed[e]?this.removed[e]:1/0])),JSON.parse(JSON.stringify(this._sortedTimes))}isTimeInTimeSpans(t){let e=0,s=this.sortedTimeSpans.length-1;for(;e<=s;){const i=Math.floor((e+s)/2),[r,n]=this.sortedTimeSpans[i];if(t>=r&&t<=n)return!0;t<r?s=i-1:e=i+1}return!1}getFullDuration(t){let e=0;const s=this._sortedTimes?this._sortedTimes:this.sortedTimeSpans;for(const i of s){let[s,r]=i;null!=s||(s=t.startTime),null!=r||(r=t.endTime),e+=r-s}return e}}e.Aura=a},561:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=(t,e)=>{for(const s of e)for(const e in s)if(t[e]!==s[e])return!0}},300:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t,e){return{component:"EnhancedMarkdown",props:{content:`\n<u># ${t} Error</u>\n${e}\n`}}}},863:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.allEventsByCategoryAndDisposition=e.eventsByCategoryAndDisposition=void 0,e.eventsByCategoryAndDisposition=function(t,e,s){return t.eventsByCategoryAndDisposition(e,s)},e.allEventsByCategoryAndDisposition=function(t,e,s){return t.allEventsByCategoryAndDisposition(e,s)}}},e={};var s=function s(i){var r=e[i];if(void 0!==r)return r.exports;var n=e[i]={exports:{}};return t[i].call(n.exports,n,n.exports,s),n.exports}(769);globalThis.getComponent=s.default})();
 /*Source Code LZString compressed, Base64 encoded 
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
*/