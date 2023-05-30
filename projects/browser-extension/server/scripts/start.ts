import { webpack } from 'webpack'
import { HOST, PORT, HRM_PATH } from '../utils/constants'

import express from 'express'
import devConfig from '../webpack.config'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import cors from 'cors'

const start = async () => {
    const compiler = webpack(devConfig)
    const devServer = express()

    devServer.use(cors())
    devServer.use([
        webpackDevMiddleware(compiler, {
            publicPath: devConfig.output?.publicPath,
            stats: 'minimal',
            writeToDisk: true
        }),
        webpackHotMiddleware(compiler, { path: HRM_PATH })
    ])

    const httpServer = devServer.listen(PORT, HOST, () => {
        console.log(`Listening on port ${PORT}`)
    })
    httpServer
}

start()
