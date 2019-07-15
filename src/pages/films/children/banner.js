import React, { Component } from 'react'
import FilmsItem from './films-item'
import Iscroll from '../../../components/Scroll'
import './banner.scss'
import '../index.scss'
export default class banner extends Component {
    state={
        isLoadFinish: false ,
  }
    render() {
        // console.log(this.props.value)
        let valueDom = this.props.value.bannerList.map((item)=>{
            
            return(
                    <li className='itemBan' key={item.id}>
                         <p className='bannerLiImg'>
                            <img className='imgBanner' src={item.img} alt = ''/>
                            <span className='titleBan'><b className='wish'>{item.wish}</b>人想看</span>
                        </p>
                        <h5 className='textBanner'>{item.nm}</h5>
                        <p className='dataBanner'>{item.comingTitle}</p> 
                    </li>
                )
            })
            let {loading} = this.props.value
            let force=''
            const setRepeat=(param)=>{
                if(force===param){
                    return false
                }else{
                    force=param;
                    return true
                }
            }   
        return (
        <div>
            <div className='banner-wrap'>
                <p className='banner-description'>近期最受期待</p>
                <div className = 'banner'>
                    <Iscroll ref='content' pop={this.props.value.bannerList} 
                     canLoad={!loading} onLoadMore={this.handleLoadMore}>
                        <ul className='ulBan'>
                            {valueDom}  
                            {this.state.isLoadFinish && <p className='finished'>我是有底线的</p>}
                        </ul>
                     </Iscroll>
                </div>
            </div>
            <div className='filmsListBanner'>
                <div>
                    { 
                     this.props.value.comingResList.map(item=>{
                        
                        return (
                            <div key={item.id}>
                            <p className='textBannerList'>{setRepeat(item.comingTitle) && item.comingTitle}</p>
                                <FilmsItem info={item}  routerView={()=>this.itmAction(item)}/>
                            </div>
                        )
                     })
                    }
                </div>
                     {this.props.finished && <p className='finished'>我是有底线的</p>}
            </div>
        </div>
        )
    };
    componentDidMount(){
        if(this.props.value.bannerList.length<=0){

            this.props.value.requestBanner()
        }
        
    }
    componentDidUpdate(oldProps) {
        if(oldProps.value.bannerList !== this.props.value.bannerList){
          // 更新滚动视图
          this.refs.content.refresh();
          //正在热映的电影数据更新
          this.props.value.setLoad(false);
        }
        if(oldProps.value.comingResList !== this.props.value.comingResList){
            // 更新滚动视图
            this.refs.content.refresh();
            //正在热映的电影数据更新
            this.props.value.setLoad(false);
          }
      }
    //请求更多数据
    handleLoadMore=()=>{
        this.props.value.setLoad(true)
        let length=this.props.value.bannerList.length
        var sum=0
            sum =this.props.value.paging.offset+10
        if(length ===40){
        this.setState({ isLoadFinish: true });
        }else{
            if( this.props.value.comingResList.length<=0){

                this.props.value.reqBanMoreList(sum)
            }
        }
    } 
    //进入电影详情页
    itmAction=(item)=>{
        let {nm,id} = item
        this.props.value.history.push({
            pathname:'/films/filmsDetail',
            state:{
                nm,
                id
            }
        })
    }     
}
