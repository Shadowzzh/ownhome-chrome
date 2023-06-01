import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Switch,
    Box
} from '@mui/material'
import { Menu as IconMenu } from '@mui/icons-material'
import { SwitchThemeMode } from './components/switchModeTheme'
import ModeEditTwoToneIcon from '@mui/icons-material/ModeEditTwoTone'

export const Popup = () => {
    return (
        <div>
            <AppBar style={{ width: 300, alignItems: 'flex-start' }} position='static'>
                <Toolbar variant='dense'>
                    <IconButton edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
                        <IconMenu />
                    </IconButton>

                    <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}></Typography>

                    <SwitchThemeMode />
                </Toolbar>
            </AppBar>

            <Box
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                    color: 'text.primary'
                }}
            >
                <List
                    component='nav'
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                >
                    <ListItem>
                        <ListItemIcon>
                            <ModeEditTwoToneIcon />
                        </ListItemIcon>

                        <ListItemText
                            primary='修改网页文字'
                            secondary={<>开启之后可以修改网页的文字</>}
                        />

                        <Switch edge='end' color='primary' />
                    </ListItem>
                </List>
            </Box>
        </div>
    )
}
