import type { Configuration } from 'webpack'
import merge from 'webpack-merge'
import webpackCommonConfig from './webpack.common'
import {
    backgroundPath,
    contentScriptPath,
    injectPath,
    interceptAjaxScriptPath,
    optionsPath,
    popupPath
} from './entry'

const webpackConfig: Configuration = {
    mode: 'production',

    entry: {
        background: [backgroundPath],
        options: [optionsPath],
        popup: [popupPath],
        content: [contentScriptPath],
        inject: [injectPath],
        interceptAjaxScript: [interceptAjaxScriptPath]
    },

    devtool: false,

    cache: {
        type: 'filesystem'
    },

    plugins: []
}

export default merge(webpackCommonConfig, webpackConfig)
