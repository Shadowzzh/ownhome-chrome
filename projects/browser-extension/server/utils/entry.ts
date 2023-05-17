import { resolve } from 'path'
import { HMRClientScript } from './constants'

const src = resolve(__dirname, '../../src')

const backgroundPath = resolve(src, './background.ts')
const optionsPath = resolve(src, './options/index.tsx')
const popupPath = resolve(src, './popup/index.tsx')
const contentScriptPath = resolve(src, './contentScript.ts')

const devEntry: Record<string, string[]> = {
    background: [HMRClientScript, backgroundPath],
    options: [HMRClientScript, optionsPath],
    popup: [HMRClientScript, popupPath],
    content: [HMRClientScript, contentScriptPath]
}

export default devEntry
