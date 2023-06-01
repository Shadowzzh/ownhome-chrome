import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config'
import { PORT } from '../constant'

const app = express()
const compiler = webpack(webpackConfig)

// 告知 express 使用 webpack-dev-middleware，
// 以及将 webpack.config.js 配置文件作为基础配置。
app.use(
    webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output!.publicPath,
        writeToDisk: true
    }),
    webpackHotMiddleware(compiler, {})
)

// 将文件 serve 到 port 3000。
app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!\n`)
})
