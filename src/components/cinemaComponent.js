import React, { Component } from 'react'
import TimeList from './timeList'
import SeletList from './selectList'
import PubSub from 'pubsub-js'
import SelectContent from './selectListContent'
import  './cinema.scss'
export default class cinemaComponent extends Component {
    state={
        flag:false,
        selectIndex:0
    }
    render() {

        let cityDom = this.state.flag?this.cityAction():''
        return (
            <div className='content_cine'>
                <div className='cinemaWrap'>
                    {cityDom}
                </div>
            </div>
            
        )
    }

    //返回
    goBackAction=(value)=>{
        console.log(123)
    }
    //遮罩层结构
    cityAction=()=>{
    //    console.log(this.state.flag)
        return(
            <div className='cinemaWrap'>
                <div className='coverWrap' onClick={this.coverAction}></div>
                    <div className='cinemaContent'>
                        <TimeList status={this.state.flag}/>
                        <SeletList popBlean={this.state.flag} popIndex={this.state.selectIndex} select={this.selectAction}{...this.props}/>
                        <SelectContent indexC={this.state.selectIndex} {...this.props} propSelect={this.propSelectAction}/>
                    </div>
            </div>
        )
    }
    selectAction=(value,B)=>{
        this.setState({flag:B,selectIndex:value})
         PubSub.publish('my-event', {value,B});
    }
    //从selectContent传过来的status
    propSelectAction=(val)=>{
        this.setState({flag:val})
    }
    //点击回去
    coverAction=()=>{
        this.setState({flag:false})
    }
    componentDidMount(){
        this.token = PubSub.subscribe('my-event', (eventName, params)=>{
            this.setState({selectIndex: params.value,flag:params.B})
        })
      }
        componentWillUnmount() {
            PubSub.unsubscribe(this.token);
          }
}