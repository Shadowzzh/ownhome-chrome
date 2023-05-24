import type { ModalRegistry, NiceModalStore } from './interface'
import React from 'react'

/** 约定有这个Symbol的react组件。是modal */
const symModalId = Symbol('NiceModalId')

export const initialModalStore: NiceModalStore = {}
export const NiceModalContext = React.createContext<NiceModalStore>(initialModalStore)

export const NiceModalIdContext = React.createContext<string | undefined>(undefined)

export const MODAL_REGISTRY: ModalRegistry = {}

let _modal_id = 0

export const getUid = (modal: React.FC<any>) => {
    const _modal = modal as React.FC & { [key: symbol]: number }

    if (_modal[symModalId] === undefined) {
        _modal[symModalId] = _modal_id
        return String(_modal_id++)
    } else {
        return String(_modal[symModalId])
    }
}

export const register = (id: string, Com: React.FC<any>, props: Record<string, any>) => {
    MODAL_REGISTRY[id] = {
        Com,
        props
    }
    return id
}
