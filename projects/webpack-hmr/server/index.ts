import { WebSocketServer } from 'ws'

import webpack from 'webpack'
import webpackConfig from '../webpack.config'
import express from 'express'
import getPort from './utils/getPort'
// import MemoryFileSystem from 'memory-fs'
import hintStaticResource from './middleware/hitStaticResource'
import path from 'path'
// import fs from 'fs'

const app = express()
const compiler = webpack(webpackConfig)

const pathDir = path.resolve(__dirname, '../')
console.log('pathDir=>', pathDir)

const run = async () => {
    const wss = new WebSocketServer({ host: '127.0.0.1', port: 8080 })

    wss.on('connection', function connection(ws) {
        ws.on('error', console.error)
        ws.on('message', function message(data) {
            console.log('wss-received: %s', data)
        })
    })

    compiler.hooks.done.tap('tests', (stats) => {
        /** 根据{@link stats }生成文件 */

        console.log('webpack => 文件hash值', stats.hash)
        wss.clients.forEach((client) => {
            client.send(stats.hash)
        })
    })

    compiler.watch({}, (e) => {
        console.log('webpack => 编译任务完成', e)
    })

    // const mfs = new MemoryFileSystem()
    // // 如果你把compiler的输出文件系统改成了 MemoryFileSystem的话，则以后再产出文件都打包内存里去了
    // compiler.outputFileSystem = mfs

    const port = await getPort('127.0.0.1', 3000)

    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })

    /** 命中静态资源 */
    app.use(hintStaticResource())
}

run()
