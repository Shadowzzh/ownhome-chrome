import NiceModal from '../../src'
import React from 'react'
import { Button, Drawer, Modal, Space } from 'antd'

const FirstModal = NiceModal.create((props: { a: number; b: number }) => {
    const modal = NiceModal.useModal()

    return (
        <Modal title='Basic Modal' open={modal.visible} onOk={modal.hide} onCancel={modal.hide}>
            <p>a: {props.a}</p>
            <p>b: {props.b}</p>
        </Modal>
    )
})

const SecondModal = NiceModal.create((props: { a: number; b: number }) => {
    const modal = NiceModal.useModal()

    return (
        <Drawer title='Basic Drawer' placement='right' onClose={modal.hide} open={modal.visible}>
            <p>a: {props.a}</p>
            <p>b: {props.b}</p>
        </Drawer>
    )
})

export const App = () => {
    return (
        <Space direction='vertical'>
            <p className='text-3xl font-bold underline'>Hello world!</p>

            <Button
                onClick={() => {
                    NiceModal.show(FirstModal, { a: 1, b: 2 })
                }}
            >
                弹窗
            </Button>
            <Button
                onClick={() => {
                    NiceModal.show(SecondModal, { a: 2, b: 3 })
                }}
            >
                抽屉
            </Button>
        </Space>
    )
}
