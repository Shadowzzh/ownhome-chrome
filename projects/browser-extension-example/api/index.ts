import useSWR from 'swr'

export const BASE_URL = `https://api.cloud.wozp.cn/admin/v1.1`

export const fetcher = async (params: RequestInfo | URL) => {
    const res = await fetch(params)

    return res.json()
}

export const useSwr = (...params: Partial<Parameters<typeof useSWR>>) => {
    const [key] = params

    const res = useSWR(`${BASE_URL}/${key}`, fetcher)

    return res as ReturnType<typeof useSWR>
}

export interface Response<T> {
    code: number
    data: T
    message: string
    success: boolean
}

// 定义 AJAX 请求函数
export function ajax<T>(url: string, method: string, data?: any): Promise<Response<T>> {
    return new Promise<Response<T>>((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open(method, url)
        xhr.setRequestHeader('Content-Type', 'application/json')

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                const responseData: Response<T> = JSON.parse(xhr.responseText)
                resolve(responseData)
            } else {
                reject(new Error(xhr.statusText))
            }
        }

        xhr.onerror = () => {
            reject(new Error('Network error'))
        }

        xhr.send(JSON.stringify(data))
    })
}
