import type { Configuration } from 'webpack'
import { resolve } from 'path'
import merge from 'webpack-merge'
import { SRC_PATH } from './constant'
import webpackCommonConfig from './webpack.common'

const backgroundPath = resolve(SRC_PATH, './background.ts')
const optionsPath = resolve(SRC_PATH, './options/index.tsx')
const popupPath = resolve(SRC_PATH, './popup/index.tsx')
const contentScriptPath = resolve(SRC_PATH, './contentScript.ts')

const webpackConfig: Configuration = {
    mode: 'production',

    entry: {
        background: [backgroundPath],
        options: [optionsPath],
        popup: [popupPath],
        content: [contentScriptPath]
    },

    devtool: false,

    cache: {
        type: 'filesystem'
    },

    plugins: []
}

export default merge(webpackCommonConfig, webpackConfig)
