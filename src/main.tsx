import React from 'react'
import ReactDOM from 'react-dom'

import './styles/index.scss'

import LayoutHeader from './pages/home/layout/header'
import Layout from './pages/home/layout/index'
import Home from './pages/home'

ReactDOM.render(
  <React.StrictMode>
    <Layout>
      <LayoutHeader />
      <Home />
    </Layout>
  </React.StrictMode>,
  document.getElementById('root')
)
