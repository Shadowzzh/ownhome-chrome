import webpack from 'webpack'
import webpackConfig from '../webpack.prod'

const compiler = webpack(webpackConfig)

compiler.run((error, stats) => {
    if (error) {
        console.error(error)
        return
    }

    const analyzeStatsOpts = {
        preset: 'normal',
        colors: true
    }

    console.log(stats?.toString(analyzeStatsOpts))
})
