import React, { Component } from 'react'
import'./timeList.scss'
export default class timeList extends Component {
    state={
        selectIndex:0 ,
        flag:false  
    }
    render() {
        let {flag} = this.state
        let dataArr=['今天05月27日','明天05月28日','后天05月29日','周四05月30日','周五05月31日','周六06月01日']
        return (
            
        <div className='showDates borderBottom' style={flag?{top:0}:{top:'188px'}}>
            <ul id="timeline" className="mb-line-b">
                {
                    dataArr.map((item,index)=>{
                        return(
                            <li key={item} className={this.state.selectIndex===index ?'showDay chosen' : "showDay"} onClick={()=>this.handelIndexAction(index)}>
                                {item}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
        )
    }
     //点击切换li
     handelIndexAction=(index)=>{
        this.setState({selectIndex:index})
    }
    componentDidMount(){
        this.setState({flag:this.props.status})
    }
    
}

 