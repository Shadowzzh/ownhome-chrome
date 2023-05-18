import { ThemeOptions, createTheme } from '@mui/material/styles'

export const themeOptions: ThemeOptions = createTheme({
    palette: {
        mode: 'dark',

        primary: {
            main: '#61398f'
        },
        secondary: {
            main: '#9c27b0'
        }
    }
})
