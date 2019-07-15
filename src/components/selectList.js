import React, { Component } from 'react'
import './seletList.scss'
export default class selectList extends Component {
    state={
        index:''
    }
    render() {
        let arrList=['全诚','品牌','特色']
       let {popBlean} = this.props
       let {popIndex} = this.props
      
        return (
            
                <div className='type-y border-bottom' style={popBlean?{top:'44px'}:null}>
                    {
                        arrList.map((item,index)=>{
                            return (
                            <li key={item} className='type' style={popIndex===index||this.state.index===index?{color:'red'}:null}
                                onClick={()=>this.posAction(index)}>
                               {item}
                                <span className='icon-type'style={popIndex===index?{top:'13px',borderBottomColor:'red', borderTopColor:'transparent' }:null}></span>
                             </li>
                             )
                        })
                    }
                </div>
            
        )
    }
    //点击发送index
    posAction=(index)=>{
        this.setState({index:index})
        this.props.select(index,true)
    }
}
