// eslint-disable-next-line no-undef
module.exports = {
    ignorePatterns: ['/node_modules', '/dist'],
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {},
    overrides: [
        {
            files: ['*.js', '*.ts', '*.jsx', '*.tsx'],
            rules: {
                'no-use-before-define': 'off', // 不能在定义之前使用
                // 使用 === 替代 ==
                eqeqeq: [2, 'allow-null'],
                // 禁止使用空解构模式
                'no-empty-pattern': 'error',
                // 取消const强制
                'prefer-const': [
                    0,
                    {
                        ignoreReadBeforeAssign: false
                    }
                ],

                'react-hooks/rules-of-hooks': 'error',
                'react-hooks/exhaustive-deps': 'warn',
                // 不允许未使用的表达式(允许三元和短路运算)
                'no-unused-expressions': 'off',
                '@typescript-eslint/no-unused-expressions': [
                    0,
                    {
                        allowShortCircuit: true,
                        allowTernary: true
                    }
                ]
            }
        }
    ]
}
