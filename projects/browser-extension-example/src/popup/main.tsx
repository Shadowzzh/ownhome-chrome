import type { SwitchProps } from '@mui/material'
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

import { ModeEditTwoTone as ModeEditTwoToneIcon, Menu as IconMenu } from '@mui/icons-material'
import { SwitchThemeMode } from './components/switchModeTheme'
import { useState } from 'react'
import { useEffect } from 'react'
import { sendMessageToContentScript } from './utils'
import { storage, STORAGE } from '../storage'

/** 修改网页文字 */
const AlterText = () => {
    const [checked, setChecked] = useState(false)

    const onChange: SwitchProps['onChange'] = async (e) => {
        const checked = e.target.checked

        await sendMessageToContentScript({ cmd: 'contentEditable', data: checked })
        await storage.set({ [STORAGE.CONTENT_EDITABLE]: checked })

        setChecked(checked)
    }

    useEffect(() => {
        const init = async () => {
            const storageData = await storage.get(STORAGE.CONTENT_EDITABLE)

            const contentEditable = (() => {
                if (storageData.contentEditable !== undefined) {
                    return storageData.contentEditable
                } else {
                    return document.body.contentEditable === 'true'
                }
            })()

            setChecked(contentEditable)
            await sendMessageToContentScript({ cmd: 'contentEditable', data: contentEditable })
        }

        init()
    }, [])

    return (
        <ListItem>
            <ListItemIcon>
                <ModeEditTwoToneIcon fontSize='small' />
            </ListItemIcon>

            <ListItemText primary='修改网页文字' secondary={<>开启之后可以修改网页字</>} />

            <Switch edge='end' color='primary' size='small' checked={checked} onChange={onChange} />
        </ListItem>
    )
}

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
                    bgcolor: 'background.paper',
                    color: 'text.primary'
                }}
            >
                <List
                    component='nav'
                    dense
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                >
                    <AlterText />
                </List>
            </Box>
        </div>
    )
}
