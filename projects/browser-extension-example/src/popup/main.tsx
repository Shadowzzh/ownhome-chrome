import type { LoginParams } from './api'
import { Button, FormGroup, InputAdornment, SwitchProps, TextField } from '@mui/material'
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
import { Controller, useForm } from 'react-hook-form'

import {
    ModeEditTwoTone as ModeEditTwoToneIcon,
    Menu as IconMenu,
    AirlineStopsOutlined as AirlineStopsOutlinedIcon,
    AccountCircle,
    KeyRounded
} from '@mui/icons-material'

import { SwitchThemeMode } from './components/switchModeTheme'
import { useState } from 'react'
import { useEffect } from 'react'
import { sendMessageToContentScript } from './utils'
import { storage, STORAGE } from '../storage'
import { ExpandBlock } from '../components/expandBlock'
import { Close as CloseIcon } from '@mui/icons-material'
import { login } from './api'

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

/** 登入锄禾 */
const LoginChuHe = () => {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            account: '19165940712',
            password: '940712',
            address: 'http://localhost:9529/#/login?token=${token}'
        }
    })

    const onLogin = async (params: LoginParams) => {
        const data = await login(params)
        if (!data) return

        const url = params.address.replace('${token}', data.accessToken)
        await sendMessageToContentScript({ cmd: 'navToUrl', data: url })
    }

    const LoginForm = (
        <form onSubmit={handleSubmit(onLogin)}>
            <FormGroup
                sx={{
                    height: '100%',
                    padding: '12px',
                    bgcolor: 'background.paper',
                    color: 'text.primary',
                    '& > :not(style)': { m: 1 }
                }}
                onSubmit={handleSubmit((data) => console.log(data))}
            >
                <Controller
                    name='account'
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            id='account'
                            label='用户名'
                            size='small'
                            variant='standard'
                            helperText={fieldState.error?.message}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <AccountCircle />
                                    </InputAdornment>
                                )
                            }}
                        />
                    )}
                />

                <Controller
                    name='password'
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            id='password'
                            label='密码'
                            variant='standard'
                            size='small'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <KeyRounded />
                                    </InputAdornment>
                                )
                            }}
                        />
                    )}
                />

                <Controller
                    name='address'
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            multiline
                            id='address'
                            maxRows={4}
                            label='登录地址'
                            variant='standard'
                            size='small'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <KeyRounded />
                                    </InputAdornment>
                                )
                            }}
                        />
                    )}
                />

                <Button variant='contained' color='primary' type='submit'>
                    登录
                </Button>
            </FormGroup>
        </form>
    )

    return (
        <ExpandBlock
            container='#app-container'
            faced={
                <ListItem>
                    <ListItemIcon>
                        <AirlineStopsOutlinedIcon fontSize='small' />
                    </ListItemIcon>

                    <ListItemText primary='登入锄禾' secondary={<>打开锄禾的登录窗口</>} />
                </ListItem>
            }
        >
            {({ close }) => {
                return (
                    <>
                        <AppBar sx={{}} position='relative'>
                            <Toolbar variant='dense'>
                                <IconButton size='small' sx={{ mr: 2 }} onClick={close}>
                                    <CloseIcon />
                                </IconButton>

                                <Typography component='div' sx={{ flexGrow: 1 }}>
                                    登录锄禾
                                </Typography>
                            </Toolbar>
                        </AppBar>

                        {LoginForm}
                    </>
                )
            }}
        </ExpandBlock>
    )
}

export const Popup = () => {
    return (
        <div id='app-container'>
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
                    color: 'text.primary',
                    minHeight: 400
                }}
            >
                <List
                    component='nav'
                    dense
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                >
                    <AlterText />
                    <LoginChuHe />
                </List>
            </Box>
        </div>
    )
}
