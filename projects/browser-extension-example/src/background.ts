import { sendMessageToContentScript } from "./utils";

console.log("Hello from background");

chrome.contextMenus.create({
  id: "custom-print",
  title: "自定义打印",
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  info;
  tab;
  sendMessageToContentScript({ cmd: "print" });
});
