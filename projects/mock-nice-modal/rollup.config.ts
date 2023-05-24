import { RollupOptions } from 'rollup'
import typescript from '@rollup/plugin-typescript'

const options: RollupOptions = {
    input: 'src/index.ts',
    output: {
        file: 'dist/bundle.js',
        format: 'esm'
    },

    plugins: [typescript()]
}

export default options
