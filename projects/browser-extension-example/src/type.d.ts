/** 各个页面的相互痛惜 */
export namespace Message {
    interface Data {
        /** 打印 */
        print: undefined
        /** 网页内容可编辑 */
        contentEditable: boolean
        /** 页面跳转 */
        navToUrl: string
        /** 请求 */
        'request-send:load': {
            responseURL: string
            responseText: string
        }
    }

    type Cmd = keyof Data

    type DataMap<C extends Cmd, D> = {
        cmd: C
        data?: D
    }

    type AllContent = { [K in Cmd]: DataMap<K, Data[K]> }
    export type AnyContent = AllContent[Cmd]

    export interface Content<D = undefined> {
        cmd: Cmd
        data?: D
    }
}

export namespace Inject {}
