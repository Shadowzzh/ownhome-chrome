import type { Configuration } from 'webpack'
import { HotModuleReplacementPlugin } from 'webpack'
import { merge } from 'webpack-merge'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'

import devEntry from './entry'
import webpackCommonConfig from './webpack.common'

const webpackConfig: Configuration = {
    mode: 'development',

    entry: devEntry,

    devtool: false,

    cache: {
        type: 'filesystem'
    },

    plugins: [
        // 热更新模块
        new HotModuleReplacementPlugin(),

        // React热更新模块
        new ReactRefreshWebpackPlugin({
            overlay: {
                sockIntegration: 'whm'
            }
        })
    ]
}

export default merge(webpackCommonConfig, webpackConfig)
