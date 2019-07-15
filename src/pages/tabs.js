import React, { Component } from 'react'
import {NavLink } from 'react-router-dom'
import './tabs.scss'
export default class tabs extends Component {
  render() {
    return (
      <nav className='tabs border-top'>
          <NavLink className='item' to="/films">
              <i></i>
              <span>电影</span>
          </NavLink >
          <NavLink className='item' to="/cinema">
            <i></i>
                <span>影院</span>
           </NavLink >
          <NavLink className='item' to="/mine">
                <i></i>
                <span>我的</span>
           </NavLink >
      </nav>
    )
  }
}
