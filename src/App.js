import React, { Component } from 'react'
import {BrowserRouter , Route,Redirect,Switch} from 'react-router-dom'

import Films from './pages/films/index'
// const Films = lazy(()=>import('./pages/films/index'));
import City from './pages/films/children/city'
import Seo from './pages/films/children/seo'
import FilmsDetail from './pages/films/children/filmsDetail/filmsDetail'

import Cinema from './pages/cinema/index'
import Mine from './pages/mine/index'
import Tabs from './pages/tabs'
import './app.scss'
export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <div id="app">
            {/* 根组件 */}
            
            <Switch>
              <Route exact path='/' render={()=><Redirect to="/films"/>}/>
              <Route path="/films" component={Films}/>
              <Route path="/cinema" component={Cinema}/>
              <Route path="/mine" component={Mine}/>
            </Switch>
            {/* films */}
              <Route path='/**/city' component={City}/>
              <Route path='/**/seo' component={Seo}/>
              <Route path='/**/filmsDetail' component={FilmsDetail}/>
            


             {/* 底部tab切换 */}
             <Tabs/>
          </div>
      </BrowserRouter>
    )
  }
}
