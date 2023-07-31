import type { Configuration } from 'webpack'
import { BUILD_PATH, DIR_PATH, SRC_PATH } from './constant'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import speedMeasurePlugin from 'speed-measure-webpack-plugin'
import WebpackBuildAnAlyzer from 'webpack-bundle-analyzer'

function getCssLoaders(importLoaders: number) {
    return [
        {
            loader: MiniCssExtractPlugin.loader
        },
        {
            loader: 'css-loader'
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
        filename: 'js/[name].js',
        chunkFilename: 'js/[name]~[chunkhash]~chunk.js',
        path: BUILD_PATH,
        clean: true,
        publicPath: '/'
    },

    optimization: {
        runtimeChunk: {
            name: 'chunk-manifest'
        },
        chunkIds: 'named',
        moduleIds: 'named',
        splitChunks: {
            minSize: 100 * 1024, //生成块的最小大小（以字节为单位）1024字节=1KB。
            maxSize: 5 * 1024 * 1024,
            minChunks: 1, //拆分前必须共享模块的最小块数。
            maxAsyncRequests: 20, //所有异步请求不得超过 个
            maxInitialRequests: 30, //初始话并行请求不得超过 个
            automaticNameDelimiter: '~', //名称分隔符，默认是~
            chunks: 'initial',
            cacheGroups: {
                coreJs: {
                    test: /[\\/]node_modules[\\/]core-js-pure[\\/]/,
                    name: 'chunk-coreJs',
                    priority: 100,
                    enforce: true
                },
                material: {
                    test: /[\\/]node_modules[\\/]@mui[\\/]/,
                    name: 'chunk-material',
                    priority: 1,
                    enforce: true
                },
                react: {
                    test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/,
                    name: 'chunk-react',
                    priority: 10,
                    enforce: true
                },
                router: {
                    test: /[\\/]node_modules[\\/](@remix-run)[\\/]/,
                    name: 'chunk-react-router',
                    priority: 10,
                    enforce: true
                },
                nodeModule: {
                    test: /node_modules/,
                    name: 'chunk-nodeModule',
                    priority: -10, //权重
                    enforce: true
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

/**
 * 开启webpack-bundle-analyzer
 */
if (process.env.ANALYZER === 'true' && webpackCommonConfig.plugins) {
    webpackCommonConfig.plugins.push(
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

    smp.wrap(webpackCommonConfig as any)
}

export default webpackCommonConfig
