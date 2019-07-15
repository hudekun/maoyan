import UI from './UI'
import React from 'react'
import {connect} from 'react-redux'
import{requestGetPlaying,requestMorePlaying,requestBannerData,
       setloading,reqComingList,reqMoreComingList,reqBanMoreListOffset} from '../../store/films/index'
// 容器组件
const Container = (props)=>{
  // console.log(props)
  return (
      <UI {...props}/>
  )
}
const mapStateToProps=(state)=>{
      return{
           list:state.films.list,
           ids:state.films.ids,
           loading:state.films.loading,
           bannerList:state.films.bannerList,
           comingResList:state.films.comingList,
           movieIds:state.films.movieIds,
           moreComingResList:state.films.moreComingResList,
           paging:state.films.paging,
          
      }
}
const mapActionToProps=(dispatch)=>{
      return{
            requestData(){
                 dispatch(requestGetPlaying())
            },
            requestMoreData(newIDs){
              dispatch(requestMorePlaying(newIDs))
            },
            requestBanner(){
               dispatch(requestBannerData())
            },
            setLoad(params){
                dispatch(setloading(params))
            },
            comingList(){
                dispatch(reqComingList())
            },
            moreComingList(id){
              dispatch(reqMoreComingList(id))
            },
            reqBanMoreList(sum){
              dispatch(reqBanMoreListOffset(sum))
            },
           
          }
}

const func = connect(mapStateToProps,mapActionToProps)

const newIndex = func(Container)

export default newIndex