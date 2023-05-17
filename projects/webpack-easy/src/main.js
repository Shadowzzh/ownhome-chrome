import { a } from './A'

const main = async () => {
    const aStr = a()
    const b = await import('./B')

    console.log(aStr + b.b())
}

main()
