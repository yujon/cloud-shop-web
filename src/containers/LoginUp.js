import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {List,InputItem,Picker,Modal} from 'antd-mobile';
import { createForm } from 'rc-form';
import countrySession from '../constants/countrySession';
import {changePhoneNumber} from '../actions/user'
class LoginUp extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      phoneCode:86,
      phoneNumber:'',
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
         break;
      }
    };
    return countryName;
  }

  confirm = ()=>{
    const {phoneNumber} = this.state;
    Modal.alert('提示', '将发消息到'+phoneNumber, [
          {
            text:'Cancel',
            onPress:()=>{} 
          },
          {
            text: 'Ok',
            onPress: () =>{
              this.gotoPasswordInput();
            }
          }
        ])
  }

  gotoPasswordInput = ()=>{
    const {phoneCode,phoneNumber} = this.state;
    const {history} = this.props;
    this.props.changePhoneNumber(phoneNumber);
    history.push('/web-passwordInput');
  }

 	render(){
    const { getFieldProps } = this.props.form;
    const {phoneCode,phoneNumber} = this.state;
    const countryName = this.getCountryName(phoneCode);
    return(
         <List renderHeader={() => '> 注册微店'} style={styles.container}>
            <List.Item activeStyle={styles.line}>
               <Picker data={countrySession} cols={1} cascade={true} onOk={(val)=>this.setState({phoneCode:val})}>
                  <List.Item onClick={this.goCountryPicker} >
                    <span  style= {styles.lineLeft}>+{phoneCode}</span>
                    <span  style= {styles.lineRight}>{countryName}</span>
                  </List.Item>
              </Picker>
            </List.Item>

            <List.Item activeStyle={styles.line}>
                <InputItem
                      type="phone"
                      placeholder="输入手机号"
                      ref={el => this.autoFocusInst = el}
                      clear
                      onChange = {(val)=>this.setState({phoneNumber:val})}
                    >
                  手机号 
                </InputItem>
            </List.Item>

            <List.Item >
              <div style={{ width:'100%',color:'#108ee9',textAlign:'center',pointerEvents: phoneNumber?'auto':'none'}}
              onClick={()=>this.confirm()} >
                下一步
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
  const actions = bindActionCreators({changePhoneNumber}, dispatch);
  return {
    ...actions
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(createForm()(LoginUp));