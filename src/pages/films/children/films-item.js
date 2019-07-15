import React, { Component } from 'react'

export default class filmsItem extends Component {
    render() {
        let {info} = this.props
        return (
            <li className='itemList' key={info.id} onClick={this.routeAction}>
                        <img className='imgItem' src={info.img.replace('w.h','128.180')} alt=""/>
                        <div className='infoCenter'>
                          <span className='filmName'>{info.nm}</span>
                          <span className='custem'>
                              {info.globalReleased?<em>观众评:<b className='protorice'>{info.sc}</b></em>:<em><b className='protorice'>{info.wish}</b>人想看</em>}
                          </span>
                          <p className='actor'>主演:{info.star}</p>
                          <p className='showInfo'>{info.showInfo}</p>
                        </div>
                        {info.globalReleased?<div className='btn-normal'>购票</div>:<div className='btn-normal' style={{background:"blue"}}>预售</div>}
                        
            </li>
        )
    }
    routeAction=()=>{
        this.props.routerView()
    }
}
