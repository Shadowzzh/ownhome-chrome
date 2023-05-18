chrome.contextMenus.create({
    id: 'custom-print',
    title: '自定义打印'
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
    sendMessageToContentScript({ cmd: 'print' })
})

/** 发送信息给{@link ContentScript}文件 */
function sendMessageToContentScript<Res>(
    message: Record<string, any>,
    callback?: (args: Res) => void
) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const [tab] = tabs
        if (!tab?.id) return

        chrome.tabs.sendMessage(tab.id, message, function (response) {
            callback?.(response)
        })
    })
}
