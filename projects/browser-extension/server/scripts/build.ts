import { webpack } from 'webpack'

import prodConfig from '../webpack.config'

const compiler = webpack(prodConfig)
compiler.run((error) => {
    if (error) {
        console.error(error)
        return
    }
})
