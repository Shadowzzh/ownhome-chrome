import { resolve } from 'path'
import { HOST, PORT, SRC_PATH } from './constant'
import { Configuration } from 'webpack'

/** 开发时的客户端，用于web socket传输，热更新和实时刷新逻辑 */
export const HRM_PATH = '/__webpack_HMR__'
const HMRSSEPath = encodeURIComponent(`http://${HOST}:${PORT}${HRM_PATH}`)
const HMRClientScript = `webpack-hot-middleware/client?path=${HMRSSEPath}&reload=false`

export const backgroundPath = resolve(SRC_PATH, './background.ts')
export const optionsPath = resolve(SRC_PATH, './options/index.tsx')
export const popupPath = resolve(SRC_PATH, './popup/index.tsx')
export const contentScriptPath = resolve(SRC_PATH, './contentScript/index.ts')
export const injectPath = resolve(SRC_PATH, './contentScript/inject/index.ts')
export const interceptAjaxScriptPath = resolve(
    SRC_PATH,
    './contentScript/inject/interceptAjaxScript.ts'
)

/** 我的入口文件 */
const devEntry: Configuration['entry'] = {
    background: [backgroundPath, HMRClientScript],
    options: [optionsPath, HMRClientScript],
    popup: [popupPath, HMRClientScript],
    content: [contentScriptPath, HMRClientScript],
    inject: [injectPath, HMRClientScript],
    interceptAjaxScript: [interceptAjaxScriptPath, HMRClientScript]
}

export default devEntry
