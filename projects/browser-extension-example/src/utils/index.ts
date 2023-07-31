import type { Message } from '../type'

/** 发送信息给 ContentScript 文件 */
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

/** 使用${@link window.link}方式，打印dom */
export const printPdf = (params: { dom: HTMLElement }) => {
    if (!params.dom) return

    const setStyleByFrame = (dom: Document, styles: HTMLCollectionOf<HTMLStyleElement>) =>
        Array.prototype.slice
            .call(styles)
            .forEach((node) => dom.head.appendChild(node.cloneNode(true)))

    const iframe = document.createElement('iframe')
    document.body.appendChild(iframe)

    const styles = document.getElementsByTagName('style')
    const links = document.getElementsByTagName('link')

    const iframeDocument = iframe.contentDocument
    const iframeWindow = iframe.contentWindow

    const dom = params.dom.cloneNode(true)

    if (iframeDocument) {
        iframeDocument.body.appendChild(dom)

        setStyleByFrame(iframeDocument, styles)
        setStyleByFrame(iframeDocument, links)
    }

    // 打印。成功之后删除
    if (iframeWindow) {
        iframeWindow.print()
        iframeWindow.onafterprint = () => {
            document.body.removeChild(iframe)
        }
    }
}
