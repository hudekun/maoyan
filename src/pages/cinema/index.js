// import React, { Component } from 'react'
// import Header from '../../components/header'
import {connect} from 'react-redux'
import indexUI from './indexUI'
import {requestDataList} from './requestDataList'

const mapStateToProps=(state,props)=>{
    // console.log(props)
      return{
          a:1,
          name:state.films.name,
          list:state.list
      }
}
const mapActionToProps=(dispatch,props)=>{
    console.log(dispatch)
      return{
            change(){
              dispatch({
                  type:'change',
                  value:'你好'
              })
            },
            //请求数据
            requestData (){
                 dispatch(requestDataList())
            }
      }
}
 const func = connect(mapStateToProps,mapActionToProps)
 let newIndex =func(indexUI)
 export default newIndex
