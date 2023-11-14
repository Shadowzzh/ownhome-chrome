import { Configuration } from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const pathInfo = {
    src: path.resolve(__dirname, './src'),
    build: path.resolve(__dirname, './dist'),
    dir: __dirname
}

const webpackConfig: Configuration = {
    mode: 'development',

    devtool: false,

    entry: {
        main: `${pathInfo.src}/index.ts`
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
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },

    // optimization: {
    //     runtimeChunk: 'single'
    // },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/public/index.html'
        }),
        // new HotModuleReplacementPlugin()
    ]
}

export default webpackConfig
