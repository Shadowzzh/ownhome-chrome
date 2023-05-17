const path = require('path')

module.exports = {
    mode: 'development',

    target: 'node',

    devtool: false,

    entry: {
        main: `./src/main.js`
    },

    output: {
        clean: true,
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },

    resolve: {
        extensions: ['.js']
    },

    module: {},

    optimization: {
        runtimeChunk: 'single'
    },

    plugins: []
}
