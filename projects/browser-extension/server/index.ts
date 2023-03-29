import { HOST, PORT } from './utils/constants'

import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import config from './webpack.config'

const app = express()
const compiler = webpack(config)

// 告知 express 使用 webpack-dev-middleware，
// 以及将 webpack.config.js 配置文件作为基础配置。
app.use(
    webpackDevMiddleware(compiler, {
        publicPath: config.output?.publicPath
    })
)

// 将文件 serve 到 port 3000。
app.listen(PORT, HOST, function () {
    console.log(`Example app listening on ${PORT} !\n`)
})
