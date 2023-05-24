import React from 'react'
import { NiceModalIdContext, NiceModalContext, getUid, register, MODAL_REGISTRY } from './store'
import { dispatch, useModalReducer } from './useModal'
import type { RecordType } from './interface'

export const show = <T extends RecordType>(Com: React.FC<T>, args: RecordType) => {
    const uid = getUid(Com)

    register(uid, Com, args)
    dispatch({ type: 'modal/show', payload: { id: uid } })
}

export const hide = <T extends RecordType>(Com: React.FC<T>, args: RecordType) => {
    const uid = getUid(Com)

    register(uid, Com, args)
    dispatch({ type: 'modal/hide', payload: { id: uid } })
}

export const create = (Com: React.FC<any>) => {
    return function innerCreate(params: { id: string } & RecordType) {
        const { id, ...args } = params

        return (
            <NiceModalIdContext.Provider value={id}>
                <Com {...args} />
            </NiceModalIdContext.Provider>
        )
    }
}

const NiceModalPlaceholder = () => {
    const modals = React.useContext(NiceModalContext)
    const modalsIds = Object.keys(modals)

    const modalsList = modalsIds.map((id) => {
        const { Com, props } = MODAL_REGISTRY[id]

        return <Com key={id} id={id} {...props} />
    })

    return <>{modalsList}</>
}

export const Provider = (props: { children?: React.ReactNode }) => {
    const [modals] = useModalReducer()

    return (
        <NiceModalContext.Provider value={modals}>
            {props.children}
            <NiceModalPlaceholder />
        </NiceModalContext.Provider>
    )
}
