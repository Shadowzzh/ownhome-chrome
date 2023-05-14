import webpack from 'webpack'
import express from 'express'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webConfig from '../webpack.config'

const app = express()
const compiler = webpack(webConfig)

const publicPath = webConfig.output?.publicPath ?? '/'

app.use(
    webpackDevMiddleware(compiler, {
        publicPath,
        writeToDisk: true,
        stats: 'minimal'
    })
)

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
