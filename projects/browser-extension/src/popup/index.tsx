import React from 'react'
import ReactDOM from 'react-dom/client'

import { HashRouter } from 'react-router-dom'

const Popup = () => {
    return <div style={{ width: 300 }}>P1sop1u12sp</div>
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <HashRouter>
        <React.StrictMode>
            <Popup />
        </React.StrictMode>
    </HashRouter>
)
