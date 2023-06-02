import type { Configuration } from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import speedMeasurePlugin from 'speed-measure-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import { HotModuleReplacementPlugin } from 'webpack'
import { DIR_PATH, SRC_PATH, BUILD_PATH } from './constant'
import devEntry from './entry'

const webpackConfig: Configuration = {
    mode: 'development',

    entry: devEntry,

    devtool: false,

    cache: {
        type: 'filesystem'
    },

    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.([cm]?ts|tsx)$/,
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true
                        },
                        exclude: /node_modules/
                    },
                    {
                        test: /\.css$/,
                        use: ['style-loader', 'css-loader'],
                        exclude: /node_modules/
                    }
                ]
            }
        ]
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },

    output: {
        filename: '[name].js',
        path: BUILD_PATH,
        clean: true,
        publicPath: '/'
    },

    optimization: {
        minimize: false,

        runtimeChunk: 'single',

        splitChunks: {
            chunks: 'all'
        }
    },

    plugins: [
        // 清除dist目录
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),

        // 热更新模块
        new HotModuleReplacementPlugin(),

        // React热更新模块
        new ReactRefreshWebpackPlugin({
            overlay: {
                sockIntegration: 'whm'
            }
        }),

        new CopyPlugin({
            patterns: [{ from: path.resolve(SRC_PATH, 'manifest.json') }]
        }),

        // popup页面
        new HtmlWebpackPlugin({
            filename: 'popup.html',
            chunks: ['popup'],
            template: `${DIR_PATH}/public/popup.html`
        }),

        // options页面
        new HtmlWebpackPlugin({
            filename: 'options.html',
            chunks: ['options'],
            template: `${DIR_PATH}/public/options.html`
        })
    ]
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

export default webpackConfig
