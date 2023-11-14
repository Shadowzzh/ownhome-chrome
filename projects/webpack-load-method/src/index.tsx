import { HashRouter } from 'react-router-dom'

import Home from './home'
import About from './about'

import ReactDOM from 'react-dom/client'
import React, { Suspense } from 'react'

const Page = () => {
    const PromiseConfig = React.lazy(() => import('./config'))
    return (
        <>
            <Home />
            <About />

            <Suspense fallback={<div>Loading...</div>}>
                <PromiseConfig />
            </Suspense>
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <HashRouter>
        <React.StrictMode>
            <Page />
        </React.StrictMode>
    </HashRouter>
)
