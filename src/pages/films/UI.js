import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PubSub from 'pubsub-js'
import Header from '../../components/header'
import LoadMore from '../../components/LoadMore'
import FilmsItem from './children/films-item'
import Banner from './children/banner'
import './index.scss'


export default class Films extends Component {
  constructor(props){
    super(props)
    this.state={
          selectIndex:0,
          isLoadFinish: false ,
          cityName:'定位'
    }
    
    
  }
  
  render() {
    // console.log(this.props)
    let {list} = this.props
     let {selectIndex} = this.state
     let listNav =this.getNavDom()
     let contentDom = selectIndex ===0?this.getPlaying(list):this.getSoonPlaying()
     let {loading} = this.props
    return (
      <div className='pages'>
          <Header title='猫眼电影'/>
          <div className='tab-wrap border-bottom'>
                  <div className='pos'>
                      <Link to='/films/city' className='pos-text'>{this.state.cityName}</Link>
                      <i className='icon'></i>
                  </div>
                      {listNav}
                  <Link to='/films/seo' className='seo'></Link>
              </div>
           <LoadMore className='content subContent' ref='content'
            canLoad={!loading} onLoadMore={this.handleLoadMore}>
               {contentDom}
           </LoadMore>
      </div>
    )
  }
  //获得头部切换的Dom
  getNavDom=()=>{
    return(
      <nav className="list-nav">
        {["正在热映", "即将上映"].map((item, index) => {
          let className =
            "item" +
            (index === this.state.selectIndex ? " active" : "");
          return (
            <li
              key={index}
              className={className}
              onClick={() => this.selectNavTabAction(index)}
            >
              {item}
            </li>
          );
        })}
      </nav>
    )
  }
  //点击li切换
  selectNavTabAction=(index)=>{
          this.setState({
             selectIndex:index
          })
  }
  //正在热映电影
  getPlaying=(list)=>{
    // this.refs.content.refresh();
      return(
         <ul className='flims-wrap'>
            {
              list.map(item=>{
                  return(
                    <FilmsItem routerView={()=>this.itmAction(item)} key={item.id} info={item}/>
                  )
              })
            }
             {this.state.isLoadFinish && <p className='finished'>我是有底线的</p>}
         </ul>
      )
  }
  //待热映
  getSoonPlaying=()=>{
    this.refs.content.refresh();
    return(
       <div className='getSoonFlims'>
             <Banner value = {this.props}  finished={this.state.isLoadFinish}/>
       </div>
    )
  }
  //生命周期请求数据
  componentDidMount(){
    if(this.props.list.length<=0){
      this.props.requestData()
    }
    if(this.props.bannerList.length<=0){
      this.props.comingList()
    }
    
    //接收数据
    this.city=PubSub.subscribe('send-value',(eventName,param)=>{
      this.setState({cityName: param})
    })
  }
  componentWillUnmount() {
    PubSub.unsubscribe(this.city);
  }
  componentDidUpdate(oldProps) {
    if(oldProps.list !== this.props.list){
      // 更新滚动视图
      this.refs.content.refresh();
      //正在热映的电影数据更新
      this.props.setLoad(false);
    }
  }
  
  handleLoadMore=()=>{
    if(this.state.selectIndex===0){
      this.props.setLoad(true)
      let ids = [...this.props.ids]
      let length = this.props.list.length
      let newIDs = ids.splice(length,10).join(',')
      if(length ===this.props.ids.length){
        this.setState({ isLoadFinish: true });
      }else{
          this.props.requestMoreData(newIDs)
        }
    }else{ 
          this.props.setLoad(true)
            let movieId =[...this.props.movieIds]
          let leng = this.props.comingResList.length
          let id = movieId.splice(leng,10).join(',')
          if(leng ===this.props.movieIds.length){
            this.setState({ isLoadFinish: true });
          }else{
            if(this.props.comingResList.length<=0){
              this.props.moreComingList(id)
              }
            }
    } 
  }
    //进入电影详情页
    itmAction=(item)=>{
      let {nm,id} = item
      this.props.history.push({
          pathname:'/films/filmsDetail',
          state:{
              nm,
              id
          }
      })
    }  
  
  
}
