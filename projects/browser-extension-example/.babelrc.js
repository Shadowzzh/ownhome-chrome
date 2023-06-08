module.exports = function (api) {
    api.cache(true)

    // Babel 配置选项
    return {
        // 插件和预设配置
        plugins: [
            [
                'babel-plugin-import',
                {
                    libraryName: '@mui/material',
                    libraryDirectory: '',
                    camel2DashComponentName: false
                },
                'core'
            ],
            [
                'babel-plugin-import',
                {
                    libraryName: '@mui/icons-material',
                    libraryDirectory: '',
                    camel2DashComponentName: false
                },
                'icons'
            ]
        ],
        presets: [
            ['@babel/preset-env'],
            ['@babel/preset-react', { runtime: 'automatic' }],
            '@babel/preset-typescript'
        ]
    }
}
