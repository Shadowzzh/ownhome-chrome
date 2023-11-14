import type { RequestHandler } from 'express'
// import type MemoryFileSystem from 'memory-fs'
import fs from 'fs'

import webpackConfig from '../../webpack.config'
import path from 'path'
import mime from 'mime'

/** 命中静态资源 */
const hintStaticResource = () => {
    const middleware: RequestHandler = (req, res) => {
        const filename = req.url.slice(1)
        const distPath = webpackConfig.output?.path ?? path.resolve(__dirname, 'dist')

        let filePath = path.join(distPath, filename)

        // 如果没有文件名,默认访问index.html
        if (filename === '') {
            filePath = path.join(distPath, 'index.html')
        }

        console.log('filename=>', filename)

        try {
            let stat = fs.statSync(filePath)
            if (stat.isFile()) {
                // 判断是否存在这个文件,如果在的话直接把这个读出来发给浏览器
                let content = fs.readFileSync(filePath)
                let contentType = mime.getType(filePath) ?? ''

                res.setHeader('Content-Type', contentType)
                res.statusCode = res.statusCode || 200
                res.send(content)
            }
        } catch (error) {
            console.log(`=> 未命中静态资源: ${filePath}`)
        }
    }

    return middleware
}

export default hintStaticResource
