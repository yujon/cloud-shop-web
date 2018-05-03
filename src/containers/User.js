import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {List,Grid} from 'antd-mobile';
import AddressList from './AddressList';

import {getUser} from '../actions/user';

class User extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      userId:'',
      addressModal:false,
    }
  }

  componentDidMount() {
    let userId = sessionStorage.getItem('userId');
    const {userInfo,history} = this.props;
    if(!userId){
      history.push('/web-loginIn/null')
      return;
    }
    this.setState({
      userId
    })
    this.props.getUser(userId);
  }

  changeAddressModal = ()=>{
    this.setState({
      addressModal:!this.state.addressModal
    })
  }

  goto = (path)=>{
    const {history} = this.props;
    history.push(path);
  }

  clickGrid = (e,index)=>{
    const {userId} = this.state;
    switch(e.name){
      case "shopCollection":
        this.goto(`/web-collection/${userId}/shop`);
        break;
      case "commodityCollection":
        this.goto( `/web-collection/${userId}/commodity`)
        break;
      case "shopCar":
        this.goto(`/web-shopCar/${userId}`);
        break;
      case "lookRecord":
        alert('暂时没有该功能')
        break;
      case "address":
        this.changeAddressModal();
        break;
    }
  }

  gotoOrder = (status) =>{
    const {userId} = this.state;
    this.goto(`/web-order/${userId}/${status}`);
  }


  render(){
    const {userInfo} = this.props;
    const {addressModal} = this.state;
    const data = [
      {
        icon:<i style={{color:'red'}} className="fa fa-star-o fa-lg"></i>,
        text:'收藏店铺',
        name:'shopCollection'
      },
      {
        icon:<i style={{color:'red'}} className="fa fa-certificate fa-lg"></i>,
        text:'收藏商品',
        name:'commodityCollection'
      },
      {
        icon:<i style={{color:'red'}} className="fa fa-shopping-cart fa-lg"></i>,
        text:'购物车',
        name:'shopCar'
      },
      {
        icon:<i style={{color:'red'}} className="fa fa-search fa-lg"></i>,
        text:'浏览记录',
        name:'lookRecord'
      },
      {
        icon:<i style={{color:'red'}} className="fa fa-map-marker fa-lg"></i>,
        text:'收货地址',
        name:'address'
      }
    ]
    return(
      <div style={styles.container}>
          <List renderHeader={() => '个人中心'} style={{backgroundColor:'#fff'}} >
            <div style={styles.userInfo}>
               <div><img style={{height:40,widht:40,borderRadius:20}} src={userInfo['img']} alt=""/></div>
               <div>{userInfo['name']}</div>
            </div>
          </List>

          <List renderHeader={() => '我的订单'} style={{backgroundColor:'#fff',marginTop:20}} >
            <div style={styles.myOrder}>
              <div style={styles.myOrderItem} onClick={()=>this.gotoOrder(0)}>
                <i className="fa fa-calendar-o fa-lg" style={{marginBottom:5}}></i>待付款
              </div>
              <div style={styles.myOrderItem} onClick={()=>this.gotoOrder(1)}>
                <i className="fa fa-send fa-lg" style={{marginBottom:5}}></i>待发货
              </div>
              <div style={styles.myOrderItem} onClick={()=>this.gotoOrder(2)}>
                <i className="fa fa-ambulance fa-lg" style={{marginBottom:5}}></i>待收货
              </div>
              <div style={styles.myOrderItem} onClick={()=>this.gotoOrder(3)}>
                <i className="fa fa-barcode fa-lg" style={{marginBottom:5}}></i>待评价
              </div>
              <div style={styles.myOrderItem} onClick={()=>this.gotoOrder(4)}>
                <i className="fa fa-barcode fa-lg" style={{marginBottom:5}}></i>已完成
              </div>
            </div>
          </List>

          <div style={{marginTop:10}}>
            <Grid data={data} activeStyle={true}  onClick={(e,index)=>{this.clickGrid(e,index)}}/>
          </div>
          <AddressList addressModal={addressModal} realAddressIndex={-1} changeAddressModal={this.changeAddressModal.bind(this)} 
              onSelectAddress={()=>{}} ></AddressList>
      </div>   
     )
  }

}


const styles = {
   container:{
     display:'flex',
     flexDirection:'column',
     height:document.documentElement.clientHeight,
     width:document.documentElement.clientWidth,
     backgroundColor:'#eee'
    },
    userInfo:{
      height:120,
      widht:'100%',
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center'
    },
    myOrder:{
      height:70,
      widht:'100%',
      display:'flex',
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center'
    },
    myOrderItem:{
      flex:1,
      height:80,
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center'
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
  const userInfo = state.user.userInfo || {};
  return {
    userInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({getUser}, dispatch);
  return {
    ...actions
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);