import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {List,InputItem,Picker,Modal} from 'antd-mobile';
import { createForm } from 'rc-form';
import countrySession from '../constants/countrySession';
import {changePhoneNumber,loginIn} from '../actions/user';


class LoginIn extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      phoneCode:86,
      phoneNumber:'',
      password:'',
      fromUrl:""
    }
  }

  componentWillMount(){
    let userId = sessionStorage.getItem('userId');
    const {history,match} = this.props;
    const {fromUrl} = match.params;
    if(userId){
      let url = fromUrl.replace(/\./g,'/');
      history.push(url);
      return;
    }
  }

  componentDidMount() {
    const {fromUrl} = this.props.match.params;
    this.setState({
      fromUrl
    })
    this.autoFocusInst.focus();
  }

  getCountryName = (phoneCode)=>{
    let countryName = '中国';
    for(var i = 0; i< countrySession.length;i++){
      if(countrySession[i].value == phoneCode){
         countryName =  countrySession[i].label;
         break;
      }
    };
    return countryName;
  }

  
  submit = ()=>{
    const {phoneCode,phoneNumber,password,fromUrl} = this.state;
    const {loginIn,history} = this.props;
    //登录
    loginIn(phoneCode,phoneNumber,password,(userInfo)=>{
      if(fromUrl!=='null'){
        let url = fromUrl.replace(/\./g,'/');
        history.push(url);
      }else{
        history.push('/web-user/'+userInfo._id);
      }
    });
  }

  render(){
    const { getFieldProps } = this.props.form;
    const {phoneCode,phoneNumber,password} = this.state;
    const countryName = this.getCountryName(phoneCode);
    return(
         <List renderHeader={() => '> 登录微店'} style={styles.container}>
            <List.Item activeStyle={styles.line}>
               <Picker data={countrySession} cols={1} cascade={true} onOk={(val)=>this.setState({phoneCode:val})}>
                  <List.Item >
                    <span  style= {styles.lineLeft}>+{phoneCode}</span>
                    <span  style= {styles.lineRight}>{countryName}</span>
                  </List.Item>
              </Picker>
            </List.Item>

            <List.Item style={styles.line}>
                <InputItem activeStyle={styles.line}
                      type="phone"
                      placeholder="输入手机号"
                      ref={el => this.autoFocusInst = el}
                      clear
                      onChange = {(val)=>this.setState({phoneNumber:val.replace(/\s/g,"")})}
                    >
                  手机号 
                </InputItem>
            </List.Item>


            <List.Item style={styles.line}>
                <InputItem activeStyle={styles.line}
                      type="password"
                      placeholder="输入密码"
                      ref={el => this.customFocusInst = el}
                      clear
                      onChange = {(val)=>this.setState({password:val.replace(/\s/g,"")})}
                    >
                  手机号 
                </InputItem>
            </List.Item>

            <List.Item>
              <div style={{ width:'100%',color:'#108ee9',textAlign:'center',pointerEvents: phoneCode&&phoneNumber&&password?'auto':'none'}}
              onClick={()=>this.submit()} >
                登录
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
      border:'none'
   },
   lineLeft:{
     flex:1,
     marginTop:10,
     marginBottom:10,
     fontSize:15,
     borderRightWidth:0.5,
     borderRightColor:'#ddd',
     color:'#000'
   },
   lineRight:{
     marginLeft:70
   },
   
}

const mapStateToProps = (state) => {
  const {} = state;
  return {
    
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({changePhoneNumber,loginIn}, dispatch);
  return {
    ...actions
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(createForm()(LoginIn));