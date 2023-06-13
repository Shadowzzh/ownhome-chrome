export namespace Message {
    interface Data {
        print: undefined
        contentEditable: boolean
        navToUrl: string
    }

    type Cmd = keyof Data

    type DataMap<C extends Cmd, D> = {
        cmd: C
        data?: D
    }

    type AllContent = { [K in Cmd]: DataMap<K, Data[K]> }
    export type AnyContent = AllContent[Cmd]

    export interface Content<D = undefined> {
        cmd: Cmd
        data?: D
    }
}
