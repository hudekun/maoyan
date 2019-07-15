import React, { Component } from 'react'

export default class Scroll extends Component {
    render() {
        // console.log(this.props)
        let { className, children,pop } = this.props;
        // console.log(bannerList)
        let width=95*(pop.length)+'px'
        return (
            <div className={`scroll-wrap ${className}`} ref="scroll"
                style={{overflow: 'hidden'}}>
                <div className="scroll" style={{width}}>
                    {children}
                </div>
            </div>
        )
    }
    componentDidMount(){
        // 创建滚动视图
        let scroll = this.scroll= new window.IScroll(
            this.refs.scroll,
            {
            scrollX: true,
            scrollY:false,
               probeType:3
            }
        );
        //开始滚动前
        scroll.on('beforeScrollStart', ()=>{
            scroll.refresh();
        })
         //滚动zhong
         scroll.on('scroll', ()=>{
            //  console.log('start')
            //  console.log(scroll.x)
            //  console.log(scroll.maxScrollX)
             if(scroll.x<scroll.maxScrollX && this.props.canLoad){
                 this.props.onLoadMore()
             }
        })
    }
    refresh(){
        this.scroll.refresh();
    }

}
