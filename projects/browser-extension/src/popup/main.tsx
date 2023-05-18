import { AppBar, Menu, Toolbar, IconButton, Typography, MenuItem } from '@mui/material'
import { Search as SearchIcon, MoreVert as MoreIcon, Menu as IconMenu } from '@mui/icons-material'
import { SwitchThemeMode } from './components/switchModeTheme'
import styled from '@emotion/styled'

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    alignItems: 'flex-start',
    '@media all': {
        minWidth: 300,
    }
}))

export const Popup = () => {
    return (
        <AppBar position='static'>
            <StyledToolbar variant='dense'>
                <IconButton edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
                    <IconMenu />
                </IconButton>

                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}></Typography>

                <IconButton aria-label='search' color='inherit'>
                    <SearchIcon />
                </IconButton>

                <IconButton aria-label='display more actions' edge='end' color='inherit'>
                    <MoreIcon />
                </IconButton>

                <SwitchThemeMode />
            </StyledToolbar>
        </AppBar>
    )
}
