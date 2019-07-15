import React, { Component } from 'react'
import Header from '../../components/header'
import {Icon} from 'antd-mobile';
import './index.scss'
export default class Cinema extends Component {
     
  render() {
      console.log(this.props)
    return (
        <div className='pages'>
            <Header title='影院'/>
            <div className='seo'>
                <span className='pos'>定位
                 <i className='icon'></i></span>
                <div className='seoCinema'>
                     <Icon type='check'></Icon>
                    <span className='spnSeo'>搜影院</span>
                </div>
            </div>
            <div className='content '>
                
            </div>
        </div>
    )
  }
  componentDidMount(){
      this.props.requestData()
  }
  
}
