import React, { Component } from 'react'
import './header.scss'
import {Icon} from 'antd-mobile';

export default class header extends Component {
  render() {
    return (
      <div className='header border-bottom'>
          {this.props.back && <span className='back' onClick={this.backAction}><Icon type='left'></Icon></span>}
          <h1 className='text'>{this.props.title}</h1>
      </div>
    )
  }
  backAction=()=>{
    let {history} = this.props

     history.goBack()

  }
}
