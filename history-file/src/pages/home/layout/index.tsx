import { ThemeProvider } from '@material-ui/core'
import { useTheme } from '../store/modules'

interface Props {
  children: JSX.Element[]
}
export default function layout(props: Props) {
  const { theme } = useTheme()

  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
}
