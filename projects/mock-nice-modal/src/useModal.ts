import type { NiceModalAction, NiceModalReducer } from './interface'

import { useContext, useReducer } from 'react'
import { NiceModalContext, NiceModalIdContext, initialModalStore } from './store'

export let dispatch: React.Dispatch<NiceModalAction> = () => {
    throw new Error('No dispatch method detected, did you embed your app with NiceModal.Provider?')
}

export const reducer: NiceModalReducer = (state, action) => {
    const { id } = action.payload

    switch (action.type) {
        case 'modal/show':
            return {
                ...state,
                [id]: { ...state[id], visible: true }
            }
        case 'modal/hide':
            return {
                ...state,
                [id]: { ...state[id], visible: false }
            }
        default:
            throw new Error('No action type detected')
    }
}

export const useModalReducer = () => {
    const [state, _dispatch] = useReducer(reducer, initialModalStore)
    dispatch = _dispatch

    return [state, dispatch] as const
}

export const useModal = () => {
    const modals = useContext(NiceModalContext)
    const id = useContext(NiceModalIdContext)

    const modal = id ? modals[id] : undefined

    const show = () => {
        if (!id) return

        dispatch({
            type: 'modal/show',
            payload: { id, visible: true }
        })
    }

    const hide = () => {
        if (!id) return

        dispatch({
            type: 'modal/hide',
            payload: { id, visible: false }
        })
    }

    return {
        visible: modal?.visible,
        show,
        hide
    }
}
