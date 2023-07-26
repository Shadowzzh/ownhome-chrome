import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    ListItem,
    ListItemIcon,
    ListItemText,
    Button,
    FormGroup,
    InputAdornment,
    TextField
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { Close as CloseIcon } from '@mui/icons-material'

import {
    AirlineStopsOutlined as AirlineStopsOutlinedIcon,
    AccountCircle,
    KeyRounded
} from '@mui/icons-material'
import { LoginParams, login } from '../../api'
import { STORAGE, storage } from '../../../storage'
import { sendMessageToContentScript } from '../../../utils'
import { FloatFullBlock } from '../../../components/floatFullBlock'

/** 登入锄禾 */
export const LoginChuHe = () => {
    const { control, handleSubmit, setValue } = useForm({
        defaultValues: {
            account: '19165940712',
            password: 'Wt123456.',
            address: 'http://localhost:9529/#/login?token=${token}'
        }
    })

    const onLogin = async (params: LoginParams) => {
        const data = await login(params)
        if (!data) {
            return
        }

        // 保存登录表单数据
        storage.set({ [STORAGE.LOGIN_FORM_DATA]: params })

        // 页面跳转
        const url = params.address.replace('${token}', data.accessToken)
        await sendMessageToContentScript({ cmd: 'navToUrl', data: url })
    }

    useEffect(() => {
        const init = async () => {
            const storageData = await storage.get(STORAGE.LOGIN_FORM_DATA)

            if (storageData.loginFormData) {
                const { account, password, address } = storageData.loginFormData

                setValue('account', account)
                setValue('password', password)
                setValue('address', address)
            }
        }

        init()
    }, [setValue])

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
        <FloatFullBlock
            container='#app-container'
            facade={
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
        </FloatFullBlock>
    )
}
