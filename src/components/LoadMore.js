import React, { Component } from 'react'

export default class LoadMore extends Component {
    render() {
        let { className, children } = this.props;
        return (
            <div className={`scroll-wrap ${className}`} ref="scroll"
                style={{overflow: 'hidden'}}>
                <div className="scroll">
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
            //  console.log(scroll.y)
            //  console.log(scroll.maxScrollY)
             if(scroll.y<scroll.maxScrollY && this.props.canLoad){
                 console.log('加载更多')
                 this.props.onLoadMore()
             }
        })
    }

    refresh(){
        this.scroll.refresh();
    }
}
