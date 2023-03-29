import React from 'react'
import ReactDOM from 'react-dom/client'

import { HashRouter } from 'react-router-dom'

const Options = () => {
    return <p>Choose a different background color! zzh 123</p>
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <HashRouter>
        <React.StrictMode>
            <Options />
        </React.StrictMode>
    </HashRouter>
)
