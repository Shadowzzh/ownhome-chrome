import { Configuration } from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { Module } from 'webpack'
import { Chunk } from 'webpack'
const pathInfo = {
    src: path.resolve(__dirname, './src'),
    build: path.resolve(__dirname, './dist'),
    dir: __dirname
}

const webpackConfig: Configuration = {
    mode: 'development',

    target: 'web',

    devtool: false,

    entry: {
        main: `${pathInfo.src}/index.tsx`
    },

    output: {
        clean: true,
        path: pathInfo.build,
        filename: '[name].js'
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },

    module: {
        rules: [{ test: /\.([cm]?ts|tsx)$/, loader: 'ts-loader' }]
    },

    optimization: {
        // 把webpackRuntime代码单独打包
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            minSize: 20000,
            // 代码拆分时，剩余模块的最小大小阈值。当拆分后的模块大小小于这个阈值时，将不再继续拆分，以避免过度细化导致的额外网络请求和加载性能损耗。
            minRemainingSize: 0,
            // 拆分前必须共享模块的最小 chunks 数。
            minChunks: 1,
            // 按需加载时的最大并行请求数。
            maxAsyncRequests: 30,
            // 入口点处的最大并行请求数。
            maxInitialRequests: 30,
            // 强制执行拆分的体积阈值,过了这阈值忽略其他条件，强制拆分。
            enforceSizeThreshold: 50000,

            // name: (module: Module, chunks: Chunk[], cacheGroupKey: string) => {
            //     cacheGroupKey
            //     chunks

            //     const moduleFileName = module
            //         .identifier()
            //         .split('/')
            //         .reduceRight((item) => item)
            //     const allChunksNames = chunks.map((item) => item.name).join('~')

            //     // const pageName = module
            //     //     .identifier()
            //     //     .split('/')
            //     //     .reduceRight((item: any) => item)
            //     console.log(`${cacheGroupKey}-${allChunksNames}-${moduleFileName}`)
            // },
            cacheGroups: {
                vendors: {
                    name: 'chunk-vendors',
                    test: /[\\/]node_modules[\\/]/,
                    // 具有较高优先级的拆分策略会被优先执行，拆分出的模块会先被分配到高优先级的拆分策略中，直到不再符合高优先级策略的条件，才会尝试分配到低优先级的策略中。
                    priority: -10,
                    // reuseExistingChunk 属性表示是否复用已经存在的 chunk
                    reuseExistingChunk: true
                },
                page: {
                    test: /[\\/]src[\\/]/,
                    minChunks: 1,
                    priority: -20,
                    enforce: true,
                    name: (module: Module, chunks: Chunk[], cacheGroupKey: string) => {
                        cacheGroupKey
                        chunks

                        const moduleFileName = module
                            .identifier()
                            .split('/')
                            .reduceRight((item) => item)
                        const allChunksNames = chunks.map((item) => item.name).join('~')

                        // const pageName = module
                        //     .identifier()
                        //     .split('/')
                        //     .reduceRight((item: any) => item)
                        console.log(`${cacheGroupKey}-${allChunksNames}-${moduleFileName}`)
                    }
                }
            }
        }
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/public/index.html'
        }),
        new BundleAnalyzerPlugin({
            openAnalyzer: false,
            analyzerPort: 8889
        })

        // new HotModuleReplacementPlugin()
    ]
}

export default webpackConfig
