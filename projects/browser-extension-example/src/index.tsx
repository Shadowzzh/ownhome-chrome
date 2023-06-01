import { HashRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'

const Page = () => {
    return <>12</>
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <HashRouter>
        <Page />
    </HashRouter>
)
