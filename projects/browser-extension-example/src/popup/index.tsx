import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import { HashRouter } from 'react-router-dom'
import { Popup } from './main'
import { ThemeProvider } from '@mui/material/styles'
import { useThemeStore } from './store/theme'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const ThemeProviderWrapper = (props: { children: React.ReactNode }) => {
    const themeOptions = useThemeStore((state) => state.themeOptions)

    return <ThemeProvider theme={themeOptions}>{props.children}</ThemeProvider>
}

root.render(
    <HashRouter>
        <React.StrictMode>
            <ThemeProviderWrapper>
                <Popup />
            </ThemeProviderWrapper>
        </React.StrictMode>
    </HashRouter>
)
