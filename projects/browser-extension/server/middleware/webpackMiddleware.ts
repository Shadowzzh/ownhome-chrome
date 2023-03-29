import type { Compiler } from 'webpack'

import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from '@lukeapage/webpack-hot-middleware'

import devConfig from '../webpack.config'

const webpackMiddleware = (compiler: Compiler) => {
    return [
        webpackDevMiddleware(compiler, {
            publicPath: devConfig.output?.publicPath,
            stats: 'minimal',
            writeToDisk: true
        }),
        webpackHotMiddleware(compiler)
    ]
}

export default webpackMiddleware
