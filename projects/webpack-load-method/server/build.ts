import webpack from 'webpack'
import webConfig from '../webpack.config'

const compiler = webpack(webConfig)

compiler.run((err) => {
    if (err) {
        console.error(err)
        return
    }
})
