export namespace Message {
    type Cmd = 'print' | 'contentEditable'

    export interface Content<D = undefined> {
        cmd: Cmd
        data?: D
    }
}
