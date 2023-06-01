import type { Configuration } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import speedMeasurePlugin from 'speed-measure-webpack-plugin'
import { HotModuleReplacementPlugin } from 'webpack'
import { DIR_PATH } from './constant'

const smp = new speedMeasurePlugin({
    disable: false, // 默认值：false，表示该插件是否禁用
    outputFormat: 'human', // 默认值：human，表示为格式打印其测量值，可选human/json/humanVerbose,或者是Function
    outputTarget: console.log // 默认值：console.log，表示输出到的文件的路径或者是调用输出
})

const webpackConfig: Configuration = {
    mode: 'development',

    entry: {
        index: [
            // 我的入口文件
            `${DIR_PATH}/src/index.tsx`,
            // 开发时的客户端，用于web socket传输，热更新和实时刷新逻辑
            'webpack-hot-middleware/client'
        ]
    },

    stats: {
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    },

    module: {
        rules: [
            {
                test: /\.([cm]?ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },

    output: {
        filename: '[name].bundle.js',
        path: `${DIR_PATH}/dist`
    },

    plugins: [
        // 热更新模块
        new HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            chunks: ['index'],
            template: `${DIR_PATH}/public/index.html`
        })
    ]
}

export default smp.wrap({ ...webpackConfig })
