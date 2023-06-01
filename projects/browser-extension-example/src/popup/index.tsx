import { HashRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'

const Page = () => {
    return <div style={{ width: 300, height: 300 }}>12</div>
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <HashRouter>
        <Page />
    </HashRouter>
)
