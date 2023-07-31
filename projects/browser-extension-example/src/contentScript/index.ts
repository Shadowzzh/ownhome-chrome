import { STORAGE, storage } from '../storage'
import { Message } from '../type'
import { printPdfFunction } from './printPdfFunction'

console.log('Hello from contentScript')

const initial = async () => {
    printPdfFunction.watch()

    const storageData = await storage.get(STORAGE.CONTENT_EDITABLE)

    if (storageData.contentEditable !== undefined) {
        setContentEditable(storageData.contentEditable)
    }
}

initial()
storage.set({ [STORAGE.REQUEST_LIST]: [] })

window.addEventListener(
    'message',
    function (e) {
        const message = e.data as Message.AnyContent
        const { cmd, data } = message
        switch (cmd) {
            case 'request-send:load':
                1
                ;(async () => {
                    if (!data) return
                    // 保存登录表单数据
                    const requestList = (await storage.get(STORAGE.REQUEST_LIST)).requestList ?? []
                    requestList.push(data)

                    storage.set({ [STORAGE.REQUEST_LIST]: requestList })
                    // chrome.runtime.sendMessage(message, function (response) {
                    //     console.log('收到来自后台的回复：' + response)
                    // })
                })()

                break
        }
    },
    false
)

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
