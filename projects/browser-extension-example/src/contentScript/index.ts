import { STORAGE, storage } from '../storage'
import { Message } from '../type'
import { printPdfFunction } from './printPdfFunction'

console.log('contentScript')
/**
 * 重写ajax方法，以便在请求结束后通知content_script
 * inject_script无法直接与background通信，所以先传到content_script，再通过他传到background
 */

// class ReplaceXMLHttpRequest extends XMLHttpRequest {
//     constructor() {
//         console.log(12312)
//         super()
//     }
// }

// // eslint-disable-next-line no-global-assign
// XMLHttpRequest = null

const initial = async () => {
    printPdfFunction.watch()
    // xhrHook({
    //     open: function (args, xhr) {
    //         console.log('open called!', args, xhr)
    //         // return true // 返回true将终止请求，这个就是常规拦截的精髓了
    //     },
    //     setRequestHeader: function (args, xhr) {
    //         console.log('setRequestHeader called!', args, xhr)
    //     },
    //     onload: function (xhr) {
    //     }
    // })

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
