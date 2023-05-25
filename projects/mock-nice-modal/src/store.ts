import type { ModalRegistry, NiceModalStore } from './interface'
import React from 'react'

/** 表示带有特定 Symbol 标识的 React 组件，用于模态框（Modal） */
const symModalId = Symbol('NiceModalId')

/** 储存NiceModal所有modal的信息 */
export const initialModalStore: NiceModalStore = {}
export const NiceModalContext = React.createContext<NiceModalStore>(initialModalStore)

/** 储存NiceModal的id信息 */
export const NiceModalIdContext = React.createContext<string | undefined>(undefined)

/** 储存NiceModal.create创建的组件，和组件Props */
export const MODAL_REGISTRY: ModalRegistry = {}

/** 每个modal的唯一id */
let _modal_id = 0

/**
 * 获取modal的唯一id
 * @description 根据传入的modal组件，获取其唯一id。如果该组件没有id，则为其分配一个id。
 *  */
export const getUid = (modal: React.FC<any>) => {
    const _modal = modal as React.FC & { [key: symbol]: number }

    if (_modal[symModalId] === undefined) {
        _modal[symModalId] = _modal_id
        return String(_modal_id++)
    } else {
        return String(_modal[symModalId])
    }
}

/**
 * 注册modal组件到{@link MODAL_REGISTRY}中，返回其id
 */
export const register = (id: string, Com: React.FC<any>, props: Record<string, any>) => {
    MODAL_REGISTRY[id] = {
        Com,
        props
    }
    return id
}
