import { HashRouter } from 'react-router-dom'

import Home from './home'
import About from './about'
import Config from './config'
import ReactDOM from 'react-dom/client'
import React from 'react'

const getPage = () => {
    return [Home, About, Config][Math.round(Math.random() * 2)]
}
const Page = getPage()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <HashRouter>
        <React.StrictMode>
            <Page />
        </React.StrictMode>
    </HashRouter>
)
