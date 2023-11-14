export type RecordType = Record<string, any>

export interface NiceModalState {
    visible?: boolean
    id: string
}

export interface NiceModalStore {
    [key: string]: NiceModalState
}

export interface NiceModalAction {
    type: string
    payload: NiceModalState
}

export type NiceModalReducer = (state: NiceModalStore, action: NiceModalAction) => NiceModalStore

export type ModalRegistry = Record<
    string,
    { Com: React.FC<{ id: string }>; props: Record<string, any> }
>
