import React, { Component } from 'react'
import {connect} from 'react-redux'
import PubSub from 'pubsub-js'
import {reqCityData} from '../../../store/city/index'

import './city.scss'

import {WingBlank,List,Button,WhiteSpace} from 'antd-mobile';
const ListItem=List.Item
 class city extends Component {
  componentDidMount(){
      this.props.reqCityList()
  }

  cityDataAction=(ev)=>{
      console.log(ev.target.innerHTML)
      const value = ev.target.innerHTML
      PubSub.publish('send-value',value)
      this.props.history.goBack()
  }




  render() {
    let {cityList} = this.props
    let arr = []
    cityList.map(item => {
        return arr.push(item.nm)
    })
    // console.log(arr)
    function sortChinese(arr){ // 参数： 排序的数组
      arr.sort(function (item1, item2) {
          return item1.localeCompare(item2, 'zh-CN');
      })
   }
    sortChinese(arr)  

    let hotCity=['上海','北京','广州','深圳','武汉','天津','西安','南京','杭州','成都','重庆']


    return (
      <div className='pages subBottom clc'>
          
          <WingBlank>
              <p className='pop'>定位城市</p>
              <WhiteSpace/>
              <ListItem style={{background:'#f5f5f5'}}>
                  <Button size='small' style={{width:'50%'}}>请求失败请点击重试</Button>
              </ListItem>

              <p className='pop'>最近访问城市</p>
              <WhiteSpace/>
              <ListItem style={{background:'#f5f5f5'}}>
                <div style={{display:'flex' , justifyContent:'space-around' }}>
                  <Button size='small' style={{width:'30%'}}>深圳</Button>
                  <Button size='small' style={{width:'30%'}}>安阳</Button>
                  <Button size='small' style={{width:'30%'}}>西安</Button>
                </div>
              </ListItem>

              <p className='pop'>热门城市</p>
              <WhiteSpace/>
              <ListItem style={{background:'#f5f5f5'}}>
                <div style={{display:'flex' , justifyContent:'flex-start',flexWrap:'wrap' }}>
                  {
                    hotCity.map(item=>{
                      return <Button size='small' style={{width:'30%',margin:'0 10px 10px 0'}}>{item}</Button>
                    })
                  }
                </div>
              </ListItem>

              <p className='pop'>A</p>
              <ListItem style={{background:'#f5f5f5'}}>
                {
                  arr.map(item=>{
                    return (
                      <div>
                          <List style={{background:'#f5f5f5'}} key={item} onClick={this.cityDataAction}>{item}</List>
                          <WhiteSpace/>
                      </div>
                    )
                  })
                }

              </ListItem>
          </WingBlank>

      </div>
    )
  }
}


const mapStateToProps=(state,props)=>{
      return{
          cityList:state.cityData.city
      }
}

const mapActionToProps=(dispatch)=>{
    return{
        reqCityList(){
          dispatch(reqCityData())
        }
    }
}



export default connect(mapStateToProps,mapActionToProps)(city)