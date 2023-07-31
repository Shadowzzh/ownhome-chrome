export const STORAGE = {
    CONTENT_EDITABLE: 'contentEditable',
    THEME: 'theme',
    LOGIN_FORM_DATA: 'loginFormData',
    REQUEST_LIST: 'requestList'
} as const

export interface StorageData {
    /** 是否可编辑网页文字 */
    contentEditable: boolean
    /** 网站主题 */
    theme: 'light' | 'dark'
    /** 登录表单数据 */
    loginFormData: {
        account: string
        password: string
        address: string
    }
    /** 请求列表 */
    requestList: {
        responseURL: string
        responseText: string
    }[]
}

type StorageKey = keyof StorageData

/** 浏览器存储 */
export const storage = {
    get: (key: StorageKey | StorageKey[]) => {
        const res = new Promise<StorageData>((r) => {
            // 读取数据，第一个参数是指定要读取的key以及设置默认值
            chrome.storage.sync.get(key, function (items) {
                r(items as StorageData)
            })
        })

        return res
    },
    set: <T>(data: Partial<StorageData>) => {
        const res = new Promise((r) => {
            // 保存数据
            chrome.storage.sync.set(data, function () {
                r(undefined)
            })
        })

        return res as Promise<T>
    }
}
