let rightClickTarget: HTMLElement | null = null

document.body.addEventListener('mousedown', (e) => {
    if (e.button !== 2 || !e.target) return

    rightClickTarget = e.target as HTMLElement
})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    const command = request.cmd as 'print'

    switch (command) {
        case 'print':
            if (!rightClickTarget) return
            printPdf({ dom: rightClickTarget })

            break

        default:
            break
    }
})

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

    const iframeDocument = iframe.contentDocument!
    const iframeWindow = iframe.contentWindow!

    const dom = params.dom.cloneNode(true)

    iframeDocument.body.appendChild(dom)

    setStyleByFrame(iframeDocument, styles)
    setStyleByFrame(iframeDocument, links)

    // 打印。成功之后删除
    iframeWindow.print()
    iframeWindow.onafterprint = () => {
        document.body.removeChild(iframe)
    }
}
