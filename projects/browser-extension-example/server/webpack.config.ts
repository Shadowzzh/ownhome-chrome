import type { Configuration } from 'webpack'
import { DIR_PATH } from './constant'
import { HotModuleReplacementPlugin } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

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

export default webpackConfig
