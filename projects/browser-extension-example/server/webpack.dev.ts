import type { Configuration } from 'webpack'
import speedMeasurePlugin from 'speed-measure-webpack-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import WebpackBuildAnAlyzer from 'webpack-bundle-analyzer'
import { HotModuleReplacementPlugin } from 'webpack'
import devEntry from './entry'
import webpackCommonConfig from './webpack.common'
import { merge } from 'webpack-merge'

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

/**
 * 开启webpack-bundle-analyzer
 */
if (process.env.ANALYZER === 'true' && webpackConfig.plugins) {
    webpackConfig.plugins.push(
        new WebpackBuildAnAlyzer.BundleAnalyzerPlugin({
            openAnalyzer: false,
            analyzerMode: 'static'
        })
    )
}

/**
 * 注意使用{@link smpWebpackConfig}后，会导致热更新失效。
 * 具体原因不明，所以只在你想要测量构建时间的时候才使用它。
 */
if (process.env.START_SPEED === 'true') {
    const smp = new speedMeasurePlugin({
        disable: false, // 默认值：false，表示该插件是否禁用
        outputFormat: 'human', // 默认值：human，表示为格式打印其测量值，可选human/json/humanVerbose,或者是Function
        outputTarget: console.log // 默认值：console.log，表示输出到的文件的路径或者是调用输出
    })

    smp.wrap(webpackConfig as any)
}

export default merge(webpackCommonConfig, webpackConfig)
