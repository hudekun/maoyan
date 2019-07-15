import React, { Component } from 'react'
import './selectContent.scss'
export default class selectListContent extends Component {
    state={
        liIndex:0,
        item:0,
        em:0,
        spn:0
    }
    render() {
        // console.log(this.props)
        let {indexC} = this.props
        let allDom = indexC===0?this.tabOne():(indexC===1?this.tabTwo():(indexC===2?this.tabThree():''))
        return  (
            <div>
                {allDom}
            </div>
             )
    }

    tabOne=()=>{
        let arrMethod=['商户','地铁']
        let merantDom = this.merant()
        return(
            <div className='tb-one'>
                <ul className='tab'>
                    {
                        arrMethod.map((item,index)=>{
                            return(
                            <li key={item} className={this.state.liIndex===index?'tabItems active':'tabItems'} onClick={()=>this.clickAction(index)}>
                                {item}
                            </li>
                            ) 
                        })
                    }
                </ul>
                {merantDom}
            </div>
        )
    }

    tabTwo=()=>{
        let{brand}=this.props.addressData
        return(
            <div className='tab-two'>
                <ul className='tab_ul'>
                    {
                        brand.subItems.map(item=>{
                            return(
                                <li key={item.id} className='item_two' onClick={this.TlistAction}>
                                    <span className='tab_s'>{item.name}</span>
                                    <em className='tab_e'>{item.count}</em>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
    tabThree=()=>{
        let{service,hallType}=this.props.addressData
        return(
            <div className='tab_three'>
                <h5 className='title'>{service.name}</h5>
                <div className='serve_wrap'>
                    {
                       service.subItems.map((item,index)=>{
                           return <em className={this.state.em===index?'spn btnActive':'spn' }key={item.id} onClick={()=>this.emAction(index)}>{item.name}</em>
                       }) 
                    }
                </div>
                <h5 className='title'>{hallType.name}</h5>
                <div className='films_h'>
                    {
                      hallType.subItems.map((item,index)=>{
                          return <span className={this.state.spn===index?'spn btnActive':'spn'} key={item.id} onClick={()=>this.spnAction(index)}>{item.name}</span>
                      })
                    }
                </div>
            </div>
        )
    }
    emAction=(index)=>{
        this.setState({em:index})
    }
    spnAction=(index)=>{
        this.setState({spn:index})
    }
    TlistAction=()=>{
        
    }




    //商户结构
    merant=()=>{
        let{district,subway}=this.props.addressData
        let widthAds=district.subItems.length*44+'px'
        let data= this.state.liIndex===0?district.subItems:subway.subItems
        return(
            
            <div className='addressWrap'  style={{height:widthAds}}>
                 <ul className="ul_address">
                {
                    data.map((item,index)=>{
                        let Dom = item.subItems&&this.state.item===index?this.itemDom({item,widthAds}):''
                        return(
                            <li className={this.state.item===index?'li_address current':'li_address'} key={item.id} onClick={()=>this.adsAction(index)}>{item.name}({item.count})
                                 {Dom}
                            </li>
                        )
                    })
                }
                </ul>
            </div>
            
        )
    }
   
    //点击改变state
    clickAction=(value)=>{
        this.setState({liIndex:value})
    }

    //商户列表点击
    adsAction=(index)=>{
        this.setState({item:index})
    }
    //列表二级导航
    itemDom=(params)=>{
        let {item,widthAds} = params
        return(
            <div className='list_item' style={{height:widthAds}}>
                {
                    item.subItems.map(info=>{
                        return (
                        <div className='infoList' key={info.id}
                        onClick={this.forceUpdateList}>
                         <span className='nameList'>{info.name}</span>
                         <span className='spanList'>{info.count}</span>
                        </div>
                        )
                    })
                }
            </div>
        )
    }
    //二级导航点击发起数据
    forceUpdateList=()=>{
       this.props.propSelect(false)
       this.props.reqUpdateList()
    }
}
