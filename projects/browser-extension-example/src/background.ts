import { sendMessageToContentScript } from "./utils"

chrome.contextMenus.create({
    id: 'custom-print',
    title: '自定义打印'
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
    info
    tab
    sendMessageToContentScript({ cmd: 'print' })
})
