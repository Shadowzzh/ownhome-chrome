const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { merge } = require('webpack-merge')

const pathInfo = {
    src: path.resolve(__dirname, '../src'),
    build: path.resolve(__dirname, '../dist'),
    dir: path.resolve(__dirname, '../')
}
const config = (env, argv) =>
    merge(
        {},
        {
            mode: 'development',
            devtool: argv.mode === 'production' ? false : 'source-map',
            entry: {
                background: './src/background.ts',
                popup: './src/popup/index.tsx',
                options: './src/options/index.tsx',
                contentScript: './src/contentScript.ts'
            },

            output: {
                filename: '[name].js',
                path: pathInfo.build,
                clean: true
            },

            module: {
                rules: [{ test: /\.([cm]?ts|tsx)$/, loader: 'ts-loader', exclude: /node_modules/ }]
            },

            plugins: [
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
                })
            ]
        }
    )

module.exports = config
