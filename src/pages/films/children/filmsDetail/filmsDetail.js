import React, { Component } from 'react'
import {connect} from 'react-redux'
import PubSub from 'pubsub-js'
import Header from '../../../../components/header'
import {reqDetail ,reqAddressData,reqUpdateListData,setFlagData} from '../../../../store/films/filmsDetailData'
import Cinema from "../../../../components/cinemaComponent"
import SeletList from '../../../../components/selectList'
import TimeList from '../../../../components/timeList'
import './filmsDetail.scss'

 class FilmsDetail extends Component {
    state={
        selectIndex:0,
        flag:false
    }
    render() {
        let DOM = this.props.detail?this.listDOM():''
        let CinemaDom = this.props.cinemas?this.cinemaDom():''
        let {nm} = this.props.location.state;
        return (
            <div className='pages subBottom'>
                <Header title={nm} back {...this.props} />
                <div className='content'>
                    <div className='cima_films'>
                        {CinemaDom}
                    </div>
                   {DOM}
                </div>
                {/* 全球影院组件 */}
                <Cinema handle={this.propAction} statusState={this.state}  {...this.props}/> 
            </div>
        )
    }
    
    cinemaDom=()=>{
        let arr = this.props.cinemas
       return arr.map(item=>{
            return (
            <div key={item.id} className="p_cinema">
                <p>
                    {item.nm}
                    <span className='sellPrice'>{item.sellPrice}<em className='sellEm'>元起</em></span>
                </p>
                <p className='addr'>{item.addr}</p>
                <p className='tags'>
                    <span className='tag_m'>改签</span>
                    <span className='tag_m _c'>小吃</span>
                    <span className='tag_m _k'>折扣卡</span>
                </p>
                <p className='moto'>{item.promotion.cardPromotionTag}</p>
                <div className='distance'>{item.distance}</div>
            </div>
            )
        })
    }

    listDOM=()=>{
        let {id,nm,enm,sc,cat,src,pubDesc,snum}=this.props.detail;
        let bgc = this.props.detail.img.replace(/w.h/,"71.100")
        let sum = parseFloat(snum/10000)
        return (
            <div className='container'>
                <div className='detailWrap'>
                    <div className='filmsCover'></div>
                    <div className='movieDetail'style={{backgroundImage: 'url('+bgc+')'}}>{id}</div>
                    <div className="box-flex">
                        <div className='poster'>
                            <img src={bgc} alt=""/>>
                        </div>
                        <div className='flex'>
                            <p className='title-nm'>{nm}</p>
                            <span className='title-en'>{enm}</span>
                            <p className='score'>{sc}
                            <span className="snum type">({sum}万人评)</span>
                        
                            </p>
                            <p className='type'>{cat}</p>
                            <p className='address type'>{src}</p>
                            <p className='time type'>{pubDesc}</p>
                        </div>
                    </div>
                    <div className='arrow-g'>
                        >
                    </div>
                </div>
                 <TimeList style={{top:'128px'}}/>  
                 <SeletList select={this.selectAction} {...this.props}/> 
            </div>
            
        )
    }

    selectAction=(value,B)=>{
        this.setState({flag:B,selectIndex:value})
         PubSub.publish('my-event', {value,B});
    }

    componentDidMount(){
        let {id} = this.props.location.state
        this.props.reqDetailData(id) //请求详情
        this.props.reqAddress()//请求地址
        this.props.reqUpdateList() //请求电影院数据
    }
   

    propAction=(value)=>{
        this.setState({flag:value})
    }
}






const mapStateToProps=(state,props)=>{
    return{
        detail:state.filmsDetailData.detail,
        addressData:state.filmsDetailData.addressData,
        flag:state.filmsDetailData.flag,
        cinemas:state.filmsDetailData.cinemas
    }
}
const mapActionToProps=(dispatch)=>{
    return{
         //请求详情页
         reqDetailData(id){
            dispatch(reqDetail(id))
          },
        //请求地址
        reqAddress(){
            dispatch(reqAddressData())
        },
        //请求市区影院
        reqUpdateList(){
            let time = new Date().getTime()
            dispatch(reqUpdateListData(time))
        },
        setFlag(flag){
            dispatch(setFlagData(flag))
        }
    }
}





export default connect(mapStateToProps,mapActionToProps)(FilmsDetail)