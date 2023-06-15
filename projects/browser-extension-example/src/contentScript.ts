import type { Message } from './type'
import { STORAGE, storage } from './storage'

let rightClickTarget: HTMLElement | null = null

document.body.addEventListener('mousedown', (e) => {
    if (e.button !== 2 || !e.target) return
    rightClickTarget = e.target as HTMLElement
})

const initial = async () => {
    const storageData = await storage.get(STORAGE.CONTENT_EDITABLE)

    if (storageData.contentEditable !== undefined) {
        setContentEditable(storageData.contentEditable)
    }
}

initial()

chrome.runtime.onMessage.addListener(function (request: Message.AnyContent) {
    const { cmd, data } = request

    switch (cmd) {
        case 'print':
            if (!rightClickTarget) return
            printPdf({ dom: rightClickTarget })

            break
        case 'contentEditable':
            data !== undefined && setContentEditable(data)

            break

        case 'navToUrl':
            data && navToUrl(data)
            break

        default:
            break
    }
})

function navToUrl(url: string) {
    window.open(url, '_blank')
}

/** 设置网页内容可编辑 */
function setContentEditable(data: boolean) {
    if (data === true) {
        document.body.contentEditable = 'true'
        document.designMode = 'on'
    } else {
        document.body.contentEditable = 'false'
        document.designMode = 'off'
    }
}

/** 使用${@link window.link}方式，打印dom */
function printPdf(params: { dom: HTMLElement }) {
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
