import { Switch } from '@mui/material'
import { useThemeStore } from '../store/theme'
import { Brightness4Outlined, ModeNightOutlined } from '@mui/icons-material'

export const SwitchThemeMode = () => {
    const { setThemeMode, themeOptions } = useThemeStore((state) => state)

    const value = themeOptions.palette?.mode === 'dark' ? false : true

    const onChange = () => {
        if (themeOptions.palette?.mode === 'dark') {
            setThemeMode('light')
        } else {
            setThemeMode('dark')
        }
    }

    return (
        <Switch
            color='default'
            value={value}
            icon={<ModeNightOutlined />}
            checkedIcon={<Brightness4Outlined />}
            onChange={onChange}
        />
    )
}
