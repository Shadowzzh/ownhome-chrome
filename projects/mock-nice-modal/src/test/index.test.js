import React, { useEffect, useRef } from 'react'
import { render, screen, fireEvent, waitForElementToBeRemoved, act } from '@testing-library/react'
import NiceModal from '../index'

test('throw error if no provider', async () => {
    render(<div />)

    let err
    act(() => {
        try {
            NiceModal.show('test-modal-without-provider')
        } catch (e) {
            err = e
        }
        expect(err).toBeInstanceOf(Error)
    })
})
