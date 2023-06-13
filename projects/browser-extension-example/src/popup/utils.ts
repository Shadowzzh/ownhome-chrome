import type { Message } from '../type'

/** 发送信息给{@link ContentScript}文件 */
export const sendMessageToContentScript = function <Res>(
    message: Message.AnyContent,
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
