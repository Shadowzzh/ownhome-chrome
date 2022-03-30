import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import { Menu as MenuUi, Palette } from '@material-ui/icons'
import ChangeThemeSizefrom from './changeThemeSize'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  })
)

export default function layoutHeader() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          {/* 菜单 */}
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <MenuUi />
          </IconButton>

          <Typography className={classes.title} variant='h6' color='inherit'>
            ownhome
          </Typography>

          {/* 配色 */}
          <IconButton
            edge='start'
            color='inherit'
            className={classes.menuButton}
            aria-label='palette'
          >
            <Palette />
          </IconButton>

          {/* ui 大小 */}
          <ChangeThemeSizefrom></ChangeThemeSizefrom>
        </Toolbar>
      </AppBar>
    </div>
  )
}
