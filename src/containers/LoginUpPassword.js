import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {List,InputItem,Modal} from 'antd-mobile';
import { createForm } from 'rc-form';
import countrySession from '../constants/countrySession';
import {changePhoneNumber} from '../actions/user'
class LoginUpPassword extends React.Component{

  constructor(props){
    super(props);
    const {phoneNumber,phoneCode} = props.match.params;
    this.state = {
      phoneNumber,
      phoneCode,
      verifyCode:'',
      password:'',
      secondPassword:'',
      timerText:'重新获取',
      timer:null,
      verifyCodeDisable:false,
    }
  }

  componentDidMount() {
    this.autoFocusInst.focus();
  }

  getCountryName = (phoneCode)=>{
    let countryName = '中国';
    for(var i = 0; i< countrySession.length;i++){
      if(countrySession[i].value == phoneCode){
         countryName =  countrySession[i].label;
      }
    };
    return countryName;
  }

  reGetVerifyCode = ()=>{
      //重新发送信息
      const {phoneCode,phoneNumber} = this.state;
      this.startNumberDown(60);// //倒计时
      // SMSEnterActivity.sendCode(phoneCode.toString(),phoneNumber.toString())
      //     .then(()=>{
      //        this.startNumberDown(60);// //倒计时
      //     })
      //     .catch(()=>{
      //       Info.showShort('发送失败，请稍后重试',false);
      //     })
  }

  startNumberDown = (timeCount) =>{
    if(timeCount == 0){
      this.state.timer && clearTimeout(this.state.timer);
      this.setState({
        verifyCodeDisable:false,
        timerText :'重新获取'
      })
      return;
    }else{
      this.setState({
        verifyCodeDisable:true,
        timerText : `重新获取(${timeCount}s)`
      })
      timeCount--;
      this.state.timer && clearTimeout(this.state.timer);
      this.state.timer = setTimeout(() => {
        this.startNumberDown(timeCount);
      }, 1000)
    }
  }

  submit = () =>{
    const {phoneCode,phoneNumber,password,secondPassword,verifyCode} = this.state;
    const {loginUp} = this.props;
    //校验密码
    if(password !== secondPassword){
      Modal.info('提示','俩次密码不一致');
      return;
    }

    console.log(phoneNumber,phoneCode,verifyCode,password,secondPassword)
    //校验验证码
    // SMSEnterActivity.submitCode(phoneCode.toString(),phoneNumber.toString(),verifyCode.toString())
    //     .then(()=>{
    //       //注册
    //       loginUp(phoneCode,phoneNumber,password);
    //     })
    //     .catch(()=>{
    //        Info.showShort('验证码有误',false);
    //     })
  }

  componentWillUnmount() {
    this.state.timer && clearTimeout(this.state.timer);
  }

 	render(){
    const { getFieldProps } = this.props.form;
    const {inputType,verifyCode,password,secondPassword,timerText,verifyCodeDisable} = this.state;
    return(
         <List renderHeader={() => '> 输入密码'} style={styles.container}>
            <List.Item activeStyle={styles.line}>
               <span  style= {styles.lineLeft}>验证码</span>
               <div style={styles.lineRight}>
                  <input 
                     type="number"
                    style={styles.verifyCode}
                    placeholder="输入验证码"
                    onInput={({value})=>{this.setState({verifyCode:value})}}>
                  </input>
                  <div style={verifyCodeDisable?styles.darkVerifyCode:styles.highLightVerifyCode} 
                      onClick={this.reGetVerifyCode}
                     disabled={verifyCodeDisable} >
                    {timerText} 
                  </div>
               </div>
            </List.Item>
            <List.Item activeStyle={styles.line}>
                 <InputItem
                        type="password"
                        placeholder="输入密码"
                        ref={el => this.autoFocusInst = el}
                        clear
                        moneyKeyboardAlign="left"
                        onChange = {(val)=>this.setState({password:val})}
                      >
                    密码
                  </InputItem>
            </List.Item>
             <List.Item activeStyle={styles.line}>
                 <InputItem
                        type="password"
                        placeholder="再次输入密码"
                        ref={el => this.autoFocusInst = el}
                        clear
                        moneyKeyboardAlign="left"
                        onChange = {(val)=>this.setState({secondPassword:val})}
                      >
                    密码确认
                  </InputItem>
            </List.Item>
            <List.Item>
              <div style={{ width:'100%',color:'#108ee9',textAlign:'center',pointerEvents: (verifyCode&&password&&secondPassword)?'auto':'none'}}
              onClick={()=>this.submit()} >
                注册
              </div>
            </List.Item>

        </List>
     )
 	}
}


const styles = {
   container:{
     display:'flex',
     flexDirection:'column',
     height:document.documentElement.clientHeight,
     width:document.documentElement.clientWidth,
     backgroundColor:'#fff'
   },
    line:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      height:50,
   },
   lineLeft:{
     flex:1,
     marginTop:10,
     marginBottom:10,
     fontSize:17,
     borderRightWidth:0.5,
     borderRightColor:'#ddd',
     color:'#000',
     textAlign:'center',
     paddingLeft:10
   },
   lineRight:{
     marginLeft:10,
     display:'inline-block'
  },
  verifyCode:{
    display:'inline-block',
    width:100,
    height:40,
    marginTop:5,
    backgroundColor:'transparent',
    outline:'none',
    border:'none',
    marginLeft:30 ,
    fontSize:17,
    textAlign:'center'
  },
  highLightVerifyCode:{
    display:'inline-block',
    height:40,
    borderRadius:5,
    position:'absolute',
    top:15,
    right:10,
    fontSize:14,
    textAlign:'center',
    color:'blue'
  },
  darkVerifyCode:{
    display:'inline-block',
    height:40,
    borderRadius:5,
    position:'absolute',
    top:15,
    right:10,
    fontSize:14,
    textAlign:'center',
    color:'#ccc',
  }
   
}

const mapStateToProps = (state) => {
  const {} = state;
  return {
    
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({changePhoneNumber}, dispatch);
  return {
    ...actions
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(createForm()(LoginUpPassword));