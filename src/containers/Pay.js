import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {List,InputItem,Toast} from 'antd-mobile';

import {pay} from '../actions/order'

class Pay extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      userId:'',
      password:''
    }
  }

  componentDidMount() {
    this.customFocusInst.focus();
    let userId = sessionStorage.getItem('userId');
    const {payList,history} = this.props;
    if(!payList || payList.length == 0){
      Toast.info('订单已经失效，即将跳转到待支付订单管理页',3);
      setTimeout(() => {
        history.push(`/web-order/${userId}/0`);
      }, 3000)
      return;
    }
    this.setState({
      userId
    })
  }
  
  pay = ()=>{
    const {userId} = this.state;
    const {payList,history} = this.props;
    this.props.pay(payList,()=>{
      history.push(`/web-order/${userId}/1`)
    });
  }

  render(){
    const {password} = this.state;
    const {payList} = this.props;
    let allPay = 0;
    payList && payList.forEach((item) => {
      let {allCommodityPrice,carryPrice} = item.payMoney || {};
      allPay = allPay + allCommodityPrice + carryPrice;
    })
    return(
         <List renderHeader={() => '> 支付'} style={styles.container}>
             <List.Item style={styles.line} >
                <span style={{fontSize:16,marginLeft:16}}>支付金额</span>
                <span style={{fontSize:16,marginLeft:25}}>￥{allPay}</span>
            </List.Item>
            <List.Item style={styles.line}>
                <InputItem style={styles.line}
                      type="password"
                      placeholder="输入支付密码"
                      ref={el => this.customFocusInst = el}
                      clear
                      maxLength={6}
                      onChange = {(val)=>this.setState({password:val.replace(/\s/g,"")})}
                    >
                  支付密码 
                </InputItem>
            </List.Item>

            <List.Item>
              <div style={{ width:'100%',color:'#108ee9',textAlign:'center',pointerEvents: password?'auto':'none'}}
              onClick={()=>this.pay()} >
                支付
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
  const {payList} = state.order;
  // let payList = [
  //   {
  //     orderId:"5ad8c3458efe361c705c65b9",
  //     payMoney:3612
  //   }
  // ]
  return {
    payList
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({pay}, dispatch);
  return {
    ...actions
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pay);