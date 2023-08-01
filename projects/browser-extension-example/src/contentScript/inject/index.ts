/**
 * code in inject.js
 * added "web_accessible_resources": ["myXHRScript.js"] to manifest.json
 * inject "myXHRScript.js" to content document for replacing AJAX default methods;
 */
const $script = document.createElement("script");

$script.src = chrome.runtime.getURL("js/interceptAjaxScript.js");

$script.onload = function (this: any) {
  this.remove();
};
(document.head || document.documentElement).appendChild($script);
