/*
 * @Author: tackchen
 * @Date: 2022-07-24 17:44:42
 * @Description: Coding something
 */
import Main from '../src/index';

const {Logger} = Main;

(window as any).lg = new Logger({id: 'test'});

const code = /* javascript*/`
!function(e){var o={};function n(t){if(o[t])return o[t].exports;var r=o[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=o,n.d=function(e,o,t){n.o(e,o)||Object.defineProperty(e,o,{enumerable:!0,get:t})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,o){if(1&o&&(e=n(e)),8&o)return e;if(4&o&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(n.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&o&&"string"!=typeof e)for(var r in e)n.d(t,r,function(o){return e[o]}.bind(null,r));return t},n.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(o,"a",o),o},n.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)},n.p="",n(n.s=0)}([function(e,o,n){"use strict";n.r(o);var t,r=void 0;function i(){t&&t.close()}var a={init:function(e){if(!t){var o=r.indexedDB.open("tc_logger",1);o.onerror=function(e){console.error("数据库打开报错",e)},o.onsuccess=function(e){t=o.result,console.log("数据库打开成功",e)},o.onupgradeneeded=function(o){var n,t=null===(n=o.target)||void 0===n?void 0:n.result;t.objectStoreNames.contains(e)||t.createObjectStore(e,{autoIncrement:!0})}}},saveLog:function(e){var o=e.id,n=e.data,r=t.transaction([o],"readwrite").objectStore(o).add(n);r.onsuccess=function(e){console.log("数据写入成功",e)},r.onerror=function(e){console.log("数据写入失败",e)}},close:i,clear:function(){i(),r.indexedDB.deleteDatabase("tc_logger")}};console.log(globalThis),globalThis.addEventListener("message",(function(e){console.log(globalThis,globalThis.location,e),a.saveLog(e.data),globalThis.postMessage("You said: "+e.data)}),!1)}]);
`;
function codeToBlob (code: string) {
    const blob = new window.Blob([code], {type: 'text/javascript'}); // 生成js文件对象
    const objectURL = window.URL.createObjectURL(blob); // 生成js文件的url
    return objectURL;
}

const worker = new window.Worker(codeToBlob(code)); // 使用 blob对象的url

worker.onmessage = function (event) {
    console.log('Received message ' + event.data);
};
worker.postMessage({
    id: 'aaa',
    data: {
        a: 1,
        b: 2,
    }
});