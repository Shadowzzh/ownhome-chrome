import type { Configuration } from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import speedMeasurePlugin from 'speed-measure-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import { HotModuleReplacementPlugin } from 'webpack'
import { DIR_PATH, SRC_PATH } from './constant'
import devEntry from './entry'

const smp = new speedMeasurePlugin({
    disable: false, // 默认值：false，表示该插件是否禁用
    outputFormat: 'human', // 默认值：human，表示为格式打印其测量值，可选human/json/humanVerbose,或者是Function
    outputTarget: console.log // 默认值：console.log，表示输出到的文件的路径或者是调用输出
})

const webpackConfig: Configuration = {
    mode: 'development',

    entry: devEntry,

    devtool: false,

    stats: 'errors-only',

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
        path: `${DIR_PATH}/dist`
    },

    optimization: {
        minimize: false,

        runtimeChunk: 'single',

        splitChunks: {
            chunks: 'all'
        }
    },

    plugins: [
        // 热更新模块
        new HotModuleReplacementPlugin(),

        new CopyPlugin({
            patterns: [
                { from: path.resolve(SRC_PATH, 'manifest.json') }
                // { from: path.resolve(SRC_PATH, 'assets'), to: 'assets' }
            ]
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

export default smp.wrap({ ...(webpackConfig as any) }) as any
