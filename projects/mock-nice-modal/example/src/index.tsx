import { HashRouter } from 'react-router-dom'
import { App } from './app'

import React from 'react'
import ReactDOM from 'react-dom/client'
import NiceModal from '../../src'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <HashRouter>
        <NiceModal.Provider>
            <App />
        </NiceModal.Provider>
    </HashRouter>
)
