import { Configuration } from 'webpack'
import { HotModuleReplacementPlugin } from 'webpack'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

import CopyPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import path from 'path'
import devEntry from './utils/entry'

const pathInfo = {
    src: path.resolve(__dirname, '../src'),
    build: path.resolve(__dirname, '../dist'),
    dir: path.resolve(__dirname, '../')
}

const devConfig: Configuration = {
    mode: 'development',
    devtool: 'source-map',

    entry: devEntry,

    output: {
        filename: '[name].js',
        path: pathInfo.build,
        clean: true
    },

    module: {
        rules: [
            { test: /\.([cm]?ts|tsx)$/, loader: 'ts-loader', exclude: /node_modules/ },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false,
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin({
            overlay: {
                sockIntegration: 'whm'
            }
        }),
        new CopyPlugin({
            patterns: [
                { from: path.resolve(pathInfo.src, 'manifest.json') },
                { from: path.resolve(pathInfo.src, 'assets'), to: 'assets' }
            ]
        }),
        new HtmlWebpackPlugin({
            filename: 'popup.html',
            chunks: ['popup'],
            template: path.resolve(pathInfo.dir, 'public/popup.html')
        }),
        new HtmlWebpackPlugin({
            filename: 'options.html',
            chunks: ['options'],
            template: path.resolve(pathInfo.dir, 'public/options.html')
        }),
        new MiniCssExtractPlugin({
            filename: `css/[name].css`,
            ignoreOrder: false
        })
    ]
}

export default devConfig
