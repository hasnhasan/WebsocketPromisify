function t(t,e,o,s){return new(o||(o=Promise))(function(n,i){function l(t){try{c(s.next(t))}catch(t){i(t)}}function r(t){try{c(s.throw(t))}catch(t){i(t)}}function c(t){t.done?n(t.value):new o(function(e){e(t.value)}).then(l,r)}c((s=s.apply(t,e||[])).next())})}const e="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",o=e.length-1;var s=t=>{const s=[];for(;t>=1;)s.push(e[t%(o+1)]),t=t/o|0;return s.join("")};const n=(t,e,o)=>t.addEventListener(e,o),i=t=>{let e=!1,o=null;return(...s)=>e?o:(e=!0,o=t(...s))},l=(t,e)=>setTimeout(e,t),r=function(e){const o=this.config;this.open=!0,this.onReadyQueue.forEach(t=>t()),this.onReadyQueue.splice(0);const{id_key:s,data_key:i}=o.server;this.messages.forEach(t=>t.send()),null!==this.reconnect_timeout&&(clearInterval(this.reconnect_timeout),this.reconnect_timeout=null),n(e,"close",()=>t(this,void 0,void 0,function*(){this.log("Closed."),this.open=!1,this.onCloseQueue.forEach(t=>t()),this.onCloseQueue=[];const e=o.reconnect;if("number"!=typeof e||isNaN(e)||this.forcibly_closed)this.ws=null,this.open=null;else{const o=()=>t(this,void 0,void 0,function*(){this.log("Trying to reconnect..."),null!==this.ws&&(this.ws.close(),this.ws=null),null!==(yield this.connect())&&(this.reconnect_timeout=setTimeout(o,1e3*e))});o()}this.forcibly_closed=!1})),n(e,"message",t=>{try{const e=o.decode(t.data);if(e[s]){const t=this.queue[e[s]];if(t){const o=t.sent_time?Date.now()-t.sent_time:null;this.log("Message.",e[i],o),t.ff(e[i]),clearTimeout(t.timeout),delete this.queue[e[s]]}}}catch(e){console.error(e,`Decode error. Got: ${t.data}`)}})},c=function(t){if(!0===this.open)return t(null);const e=this.config,o=e.socket||e.adapter(`ws://${e.url}`,e.protocols);if(this.ws=o,!o||o.readyState>1)return this.ws=null,this.log("Error: ready() on closing or closed state! Status 2."),t(2);n(o,"error",i(()=>(this.ws=null,this.log("Error status 3."),t(3)))),o.readyState?(r.call(this,o),t(null)):n(o,"open",i(()=>(this.log("Opened."),r.call(this,o),t(null))))},u={data_type:"json",log:()=>null,timer:!1,url:"localhost",timeout:1400,reconnect:2,lazy:!1,socket:null,adapter:(t,e)=>new WebSocket(t,e),encode:(t,e,{server:o})=>JSON.stringify({[o.id_key]:t,[o.data_key]:e}),decode:t=>JSON.parse(t),protocols:[],pipes:[],server:{id_key:"id",data_key:"data"}},h=t=>{const e=Object.assign({},u,t),o=e.url;if("/"==o[0])try{e.url=`${location.hostname}:${location.port}${o}`}catch(t){throw new Error("WSP: URL starting with / in non-browser environment!")}return e},a=Math.pow(2,31)-1;export default class{constructor(t={}){this.open=null,this.ws=null,this.forcibly_closed=!1,this.reconnect_timeout=null,this.queue={},this.messages=[],this.onReadyQueue=[],this.onCloseQueue=[],this.config={},this.config=h(t),this.init_flush(),this.open=!1,this.reconnect_timeout=null,this.forcibly_closed=!1,this.config.lazy||this.connect()}init_flush(){this.queue={},this.messages=[]}log(t,e=null,o=null){const s=this.config;t=`WSP: ${t}`,null!==o?s.log(t,o,e):s.timer?s.log(t,null,e):s.log(t,e)}connect(){return t(this,void 0,void 0,function*(){return new Promise(t=>{c.call(this,t)})})}get socket(){return this.ws}ready(){return t(this,void 0,void 0,function*(){return new Promise(t=>{this.open?t():this.onReadyQueue.push(t)})})}on(t,e,o){return n(this.ws,t,t=>{o&&!o(t)||e(t)})}close(){return t(this,void 0,void 0,function*(){return new Promise((t,e)=>{null===this.ws?e("WSP: closing a non-inited socket!"):(this.open=null,this.onCloseQueue.push(()=>{this.init_flush(),this.ws=null,this.forcibly_closed=!0,t(null)}),this.ws.close())})})}send(e,o={}){return t(this,void 0,void 0,function*(){this.log("Send.",e);const t=this.config,n={},i=t.server.data_key,r=t.lazy&&!this.open,c=s(Math.random()*(a-10)|0);if("object"==typeof o.top){if(o.top[i])throw new Error("Attempting to set data key/token via send() options!");Object.assign(n,o.top)}if(t.pipes.forEach(t=>e=t(e)),!0===this.open)this.ws.send(t.encode(c,e,t));else if(!1===this.open||r)this.messages.push({send:()=>this.ws.send(t.encode(c,e,t))}),r&&this.connect();else if(null===this.open)throw new Error("Attempting to send via closed WebSocket connection!");return new Promise((e,o)=>{this.queue[c]={ff:e,data_type:t.data_type,sent_time:t.timer?Date.now():null,timeout:l(t.timeout,()=>{this.queue[c]&&(o({"Websocket timeout expired: ":t.timeout,"for the message":n}),delete this.queue[c])})}})})}}
