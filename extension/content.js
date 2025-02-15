console.log("content.js loaded");

const script = document.createElement("script");
script.src = chrome.runtime.getURL("injected.js");
script.onload = function () {
    console.log("injected.js loaded");
    script.remove();
};
(document.head || document.documentElement).appendChild(script);
