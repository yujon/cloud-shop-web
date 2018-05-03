import React from 'react';
import {Link} from 'react-router-dom'
// import {SERVER} from '../constants/common';
import {Badge} from 'antd-mobile';
class Header extends React.Component {

  constructor(props){
    super(props);
  }

 	render(){
    const {userImg,logo,userId,shopId,shopCarCommoditySum,gotoUser,gotoShopCar,gotoLoginUp,gotoLoginIn,gotoMarket} = this.props;
    return(
      <div style={{background:'#eee',height:'50px',display:'flex',flexDirection:'row',width:'100%',justifyContent:'space-between',zIndex:1000}}>
          <div style={{flex:1,display:'flex',alignItems:'center',paddingLeft:10}} >
            <img src={logo} style={{height:30,width:30,borderRadius:2,opacity:0.7}} onClick={gotoMarket}/>
          </div>
          <div style={{width:150,height:50,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
            <div style={{display:userImg?'flex':'none'}} >
               <img src={userImg}  style={{height:30,width:30,borderRadius:20}} onClick={gotoUser}/>
            </div>
            <div  style={{flex:1,display:'flex',justifyContent:'center'}} onClick={gotoShopCar}>
                  <Badge text={shopCarCommoditySum} overflowCount={10} style={{backgroundColor:'red'}}><i className="fa fa-cart-plus fa-lg"></i></Badge>
            </div>
            <div  style={{flex:1}}>
              <span onClick={gotoLoginIn}>登录</span>
            </div>
            <div  style={{flex:1}}>
              <span onClick={gotoLoginUp}>注册</span>
            </div> 
          </div>
      </div>
    )
 	}
}


export default Header