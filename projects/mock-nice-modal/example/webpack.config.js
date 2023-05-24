const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Tailwindcss = require('tailwindcss')

module.exports = {
    mode: 'development',

    entry: './src/index.tsx',

    devtool: 'inline-source-map',

    devServer: {
        static: {
            directory: path.join(__dirname, 'public')
        },
        compress: true,
        port: 9000
    },

    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    module: {
        rules: [
            {
                test: /\.js$/i,
                include: path.resolve(__dirname, 'src'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            }
        ]
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}
