import { resolve } from 'path'
import { SRC_PATH } from './constant'

/** 开发时的客户端，用于web socket传输，热更新和实时刷新逻辑 */
const HMRClientScript = 'webpack-hot-middleware/client'

const backgroundPath = resolve(SRC_PATH, './background.ts')
const optionsPath = resolve(SRC_PATH, './options/index.tsx')
const popupPath = resolve(SRC_PATH, './popup/index.tsx')
const contentScriptPath = resolve(SRC_PATH, './contentScript.ts')

/** 我的入口文件 */
const devEntry: Record<string, string[]> = {
    background: [backgroundPath, HMRClientScript],
    options: [optionsPath, HMRClientScript],
    popup: [popupPath, HMRClientScript],
    content: [contentScriptPath, HMRClientScript]
}

export default devEntry
