import { STORAGE, storage } from '../storage'
import { Message } from '../type'
import { printPdfFunction } from './printPdfFunction'

const initial = async () => {
    printPdfFunction.watch()

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
            printPdfFunction.print()
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
