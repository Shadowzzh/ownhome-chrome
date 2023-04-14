import { hello } from './hello'

const ws = new WebSocket('ws://127.0.0.1:8080')

function showMessage(message: string) {
    console.log(message)
}

ws.onerror = function () {
    showMessage('WebSocket error')
}

ws.onopen = function () {
    showMessage('WebSocket connection established')
}

let preHotHash = ''
let hotCurrentHash = ''

ws.onmessage = async function (e) {
    hotCurrentHash = e.data

    if (true) {
        reloadApp(true)
    } else {
        reloadApp(false)
    }
}

async function hotUpload() {
    if (!preHotHash || preHotHash === hotCurrentHash) {
        return (preHotHash = hotCurrentHash)
    }

    console.log(preHotHash)

    const a = await hotDownloadManifest(preHotHash)
    hotDownloadUpdateChunk(preHotHash, a.c ?? [])

    preHotHash = hotCurrentHash
}

function hotDownloadManifest(hotCurrentHash: string): Promise<{ c: string[]; m: []; r: [] }> {
    return new Promise((resolve) => {
        console.log('新的hash', hotCurrentHash)
        console.log('上一次的hash', preHotHash)
        let request = new XMLHttpRequest()

        //hot-update.json文件里存放着从上一次编译到这一次编译 取到差异
        const hotPath = `/runtime.${preHotHash}.hot-update.json`

        request.open('GET', hotPath, true)
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                let update = JSON.parse(request.responseText)
                resolve(update)
            }
        }

        request.send()
    })
}

function hotDownloadUpdateChunk(preHotHash: string, chunkIds: string[]) {
    chunkIds.forEach((chunkId) => {
        const filePath = `/${chunkId}.${preHotHash}.hot-update.js`

        let script = document.createElement('script')
        script.charset = 'utf-8'
        // /main.xxxx.hot-update.js
        script.src = filePath
        document.head.appendChild(script)
    })
}

// 当收到ok事件后，会重新刷新app
async function reloadApp(hot: boolean) {
    if (hot) {
        // 如果hot为true 走热更新的逻辑
        hotUpload()
    } else {
        // 如果不支持热更新，则直接重新加载
        window.location.reload()
    }
}

ws.onclose = function () {
    showMessage('WebSocket connection closed')
    ws.close()
}

let count = 1

const self = window as any
self.

window.addEventListener('DOMContentLoaded', () => {
    const div = document.createElement('div')
    div.innerHTML = 'Hello World123' + hello

    const button = document.createElement('button')
    button.innerHTML = 'Click me'
    button.onclick = () => {
        ws.send(String(count++))
    }

    document.body.appendChild(div)
    document.body.appendChild(button)
})
