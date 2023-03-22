import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'

const Popup = () => {
    return <>Popup1</>
}

ReactDOM.render(
    <HashRouter>
        <Popup />
    </HashRouter>,
    document.querySelector('#root')
)
