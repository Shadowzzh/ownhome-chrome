import type { Configuration } from 'webpack'
import { BUILD_PATH, DIR_PATH, SRC_PATH } from './constant'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'

function getCssLoaders(importLoaders: number) {
    return [
        {
            loader: MiniCssExtractPlugin.loader
        },
        {
            loader: 'css-loader',
            // options: {
            //     modules: {
            //         localIdentName: '[name]__[hash:base64:5]'
            //     },
            //     sourceMap: true,
            //     importLoaders
            // }
        }
    ]
}

const webpackCommonConfig: Configuration = {
    module: {
        rules: [
            {
                test: /\.([cm]?ts|tsx)$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ],
                exclude: /node_modules/
            },

            {
                test: /\.css$/,
                use: [...getCssLoaders(0)],
                exclude: /node_modules/
            },

            {
                test: /\.less$/i,
                use: [
                    ...getCssLoaders(1),
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@mui/base': '@mui/base/legacy',
            '@mui/lab': '@mui/lab/legacy',
            '@mui/material': '@mui/material/legacy',
            '@mui/styled-engine': '@mui/styled-engine/legacy',
            '@mui/system': '@mui/system/legacy',
            '@mui/utils': '@mui/utils/legacy'
        }
    },

    output: {
        filename: '[name].js',
        path: BUILD_PATH,
        clean: true,
        publicPath: '/'
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                material: {
                    test: /[\\/]node_modules[\\/]@mui[\\/]/,
                    name: 'chunk-material',
                    chunks: 'all',
                    priority: 10,
                    enforce: true
                },
                react: {
                    test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/,
                    name: 'chunk-react',
                    chunks: 'all',
                    priority: 10,
                    enforce: true
                },
                router: {
                    test: /[\\/]node_modules[\\/](@remix-run)[\\/]/,
                    name: 'chunk-@remix-run',
                    chunks: 'all',
                    priority: 10,
                    enforce: true
                },
                vendor: {
                    chunks: 'async',
                    test: /node_modules/,
                    name: 'chunk-vendor',
                    minChunks: 1, //在分割之前，这个代码块最小应该被引用的次数
                    maxInitialRequests: 5,
                    minSize: 0, //大于 0 个字节
                    priority: -10 //权重
                }
            }
        }
    },

    plugins: [
        // 清除dist目录
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),

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
        }),

        new MiniCssExtractPlugin({
            filename: `css/[name].css`,
            ignoreOrder: false
        })
    ]
}

export default webpackCommonConfig
