import React, { Component } from 'react'
import Header from '../../components/header'
import './index.scss'

import { List, Toast,Tabs, WhiteSpace,WingBlank,InputItem ,Button,} from 'antd-mobile';
const Item=List.Item
export default class Mine extends Component {
  state = {
    hasError: false,
    value: '',
    passWord:'',
    flag:false,
  }
  onErrorClick = () => {
    if (this.state.hasError) {
      Toast.info('Please enter 11 digits');
    }
  }
  onChange = (value) => {
    if (value.replace(/\s/g, '').length < 11) {
      this.setState({
        hasError: true,
        flag:false
      });
    } else {
      this.setState({
        hasError: false,
        flag:true
      });
    }
    this.setState({
      value,
    });
  }
  callBack=()=>{
    alert('已发送')
  }
  login=()=>{
     alert('登录')
  }
  handleChange=(name,value)=>{
      this.setState({
        [name]:value
      })
  }
  render() {
    let Dom = this.TabExample()
    return (
        <div className='pages subBottom'>
            <Header title='猫眼电影' back {...this.props}/>
            <div className='content'>
                <WingBlank>{Dom}</WingBlank>
            </div>
        </div>
    )
  }
  tabs2 = [
    { title: '美团账号登录', sub: '1' },
    { title: '手机验证登录', sub: '2' },
  ];
  TabExample = () => (
    
    <div>
      <Tabs tabBarActiveTextColor='red' tabBarUnderlineStyle={{borderColor:'red'}} tabs={this.tabs2}
        initialPage={1} 
      >
        <div style={{ display: 'flex',  minHeight: '150px',overflow:'hidden', backgroundColor: '#fff' }}>
           
           <div className='listWrap'>
                <InputItem  type="phone" placeholder="账户名/手机号/Email" moneyKeyboardAlign='left'
                onChange={(val)=>this.handleChange('userName',val)}>
                </InputItem>
                <WhiteSpace />
                <InputItem type="password" placeholder="请输入您的密码" 
                 onChange={(val)=>this.handleChange('passWord',val)}></InputItem>
                <WhiteSpace />
                <Button type='warning' onClick={this.login}>登录</Button>
                <WhiteSpace />
                <div className='container'>
                    <span href="#">立即注册</span>
                    <span href="#">找回密码</span>
                </div>
                <WhiteSpace/>
                <Item>&copy;猫眼电影&nbsp;&nbsp;客服电话:400-670-5335</Item>
           </div>
           
           
        </div>
        <div style={{ display: 'flex',  minHeight: '150px',overflow:'hidden', backgroundColor: '#fff' }}>
          <div className='listWrap'>
                  <div className="tag-nm">
                  <InputItem  type="phone" placeholder="账户名/手机号/Email" moneyKeyboardAlign='left'
                  onChange={(val)=>this.handleChange('userName',val)}
                  // value={this.state.value}
                  error={this.state.hasError}
            onErrorClick={this.onErrorClick}></InputItem>
                  <span className={this.state.flag?'spn active':'spn'}  
                  onClick={this.state.flag?this.callBack:null}
                  >获取验证码
                  </span>
                  </div>
                  <WhiteSpace />
                  <InputItem type="text" placeholder="请输入短信验证码" ></InputItem>
                  <WhiteSpace />
                  <p className={this.state.flag?'login active':'login'}
                  onClick={this.state.flag?this.login:null}>
                    登录
                  </p>
                  <WhiteSpace />
                  <div className='container'>
                      <span href='#'>立即注册</span>
                      <span href='#'>找回密码</span>
                  </div>
                  <WhiteSpace />
                  <Item>&copy;猫眼电影&nbsp;&nbsp;客服电话:400-670-5335</Item>
            </div>
          </div>
      </Tabs>
      <WhiteSpace />
    </div>
  );
  
}




