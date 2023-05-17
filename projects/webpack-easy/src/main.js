import { a } from './A'

const main = () => {
    a()
    import('./B').then(({ b }) => b())
}

main()
