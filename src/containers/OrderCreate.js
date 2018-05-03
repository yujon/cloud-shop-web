import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {Button,List,InputItem} from 'antd-mobile';
import AddressList from './AddressList';

import {getUser,removeCommodityListFromShopCar} from '../actions/user';
import {addOrderList,setLocalOrderPayList} from '../actions/order';

class OrderCreate extends React.Component{

  constructor(props){
    super(props);
    this.state = {
        userId:"",
        addressModal:false,
        choseAddressId:'',
        orderList:[]
    }
  }

  componentDidMount(){
    let userId = sessionStorage.getItem('userId');
    const {userInfo,localOrderInfo} = this.props;
    let newState = {};
    if(userId){
      newState['userId'] = userId;
      this.setState(newState)
      this.props.getUser(userId);
    }

    let orderList = [];
    localOrderInfo.forEach((item) => {
      let commodityInfo = item.commodityInfo || {};
      orderList.push({
        userId,
        shopId:item.shopId,
        commodityId:item.commodityId,
        modelId:item.modelId,
        carryCateId:commodityInfo.carryCateId,
        addressInfo:{},
        buySum:item.buySum,
        words:""
      })
    })
    this.setState({
      orderList
    })
  }

  changeAddressModal = ()=>{
    this.setState({
      addressModal:!this.state.addressModal
    })
  }

  onSelectAddress = (choseAddressId)=>{
    this.setState({
      choseAddressId
    })
    this.changeAddressModal();
  }


  getRealAddressIndex = (addressList,choseAddressId)=>{
    let realAddressIndex = 0;
    if(!addressList || addressList.length == 0){
      return realAddressIndex;
    }
    for(var i=0,len=addressList.length;i<len;i++){
      if(choseAddressId){
        if(addressList[i]._id == choseAddressId){
          realAddressIndex = i;
          break;
        }
      }else{
        if(addressList[i].isDefault){
          realAddressIndex = i;
          break;
        }
      }
    }
    return realAddressIndex;
  }

  getRealCarryPrice = (carryCateInfo,addressItem,buySum) => {
    if(!Object.values(addressItem) || Object.values(addressItem).length == 0){
      return 0;
    }
    const {name,normalPrice,freeSum,exceptAreas} = carryCateInfo;
    const {province} = addressItem;
    if(exceptAreas && exceptAreas.indexOf(province) !== -1){
      return -1;  //货到付款
    }
    let readCarryPrice = normalPrice;
    if(buySum >= freeSum){
      readCarryPrice = 0;
    }
    return readCarryPrice;
  }

  setWords = (index,val)=>{
    const {orderList} = this.state;
    if(orderList.length ==0){
      return;
    }
    orderList[index]['words']= val;
    this.setState({orderList})
  }

  submitOrder = (addressItem,priceList) =>{
    if(!addressItem || Object.values(addressItem).length == 0){
      alert("请先选择地址");
      return;
    }
    const {orderList,userId} = this.state;
    const {history,isFromShopCar,toRemovedShopCarItemIdList} = this.props;
    if(orderList.length == 0){
      alert('本订单没有商品');
      return;
    }
    orderList.map((item,index)=>{
      item['addressInfo'] = addressItem;
      item['payMoney'] = priceList[index];
    })
    this.props.addOrderList(orderList,(toPaidOrderList)=>{
      //将购物车中相关的商品移除
      this.props.removeCommodityListFromShopCar(userId,toRemovedShopCarItemIdList);
      this.props.setLocalOrderPayList(toPaidOrderList);
      history.push('/web-pay');
    });
  }

  render(){
    const {addressModal,choseAddressId,orderList} = this.state;
    const {userInfo,localOrderInfo} = this.props;
    const userImg = userInfo.img;  //img html标记名称
    const {address,name} = userInfo;
    const realAddressIndex = this.getRealAddressIndex(address,choseAddressId);
    const addressItem = address&&address.length?address[realAddressIndex] :{};
    let allPayMoney = 0;
    let allBuySum = 0;
    let priceList = [];

    return(
        <div style={styles.container}>
            <div style={{width:'100%',height:60,backgroundColor:'#fff',display:address&&address.length?'flex':'none',flexDirection:'row'}}
                onClick={()=>this.setState({addressModal:true})}>
              <div style={styles.addressIcon}><i className="fa fa-map-marker"></i></div>
              <div style={{flex:1,widht:0,borderBottomColor:'#ccc',borderBottomStyle:'dotted',borderBottomWidth:1,flexDirection:'column',display:address&&address.length?'flex':'none'}}>
                <div style={styles.addressMainItem}>
                  <span>{addressItem.receiver ||''}</span>
                   &nbsp;&nbsp;&nbsp;
                  <span>{addressItem.phone || ''}</span>
                </div>
                <div style={styles.addressMainItem}>
                  <span style={{color:'red',display:addressItem.isDefault?'inline':'none'}}>[默认]</span>
                  <span>
                    {addressItem?
                      `${addressItem.province} ${addressItem.city} ${addressItem.distinct} ${addressItem.addressDetail}`:''}
                  </span>
                </div>
              </div>
              <div style={styles.addressIcon}><i className="fa fa-chevron-right"></i></div>
            </div>

            <div style={{width:'100%',height:50,borderBottomColor:'#ccc',borderBottomStyle:'dotted',borderBottomWidth:1,
                backgroundColor:'#fff',display:address&&address.length?'none':'flex',flexDirection:'row'}}
                onClick={()=>this.setState({addressModal:true})}>
              <div style={styles.addressIcon}><i className="fa fa-map-marker"></i></div>
              <div style={{flex:1,flexDirection:'column',display:address&&address.length?'none':'flex',justifyContent:'center'}}>
                  暂时还没地址，去添加吧
              </div>
              <div style={styles.addressIcon}><i className="fa fa-chevron-right"></i></div>
            </div>

            {
              localOrderInfo && localOrderInfo.map((orderItem,index)=>{
                const {shopId,shopName,commodityInfo,modelId,buySum} = orderItem;
                const carryCateInfo = commodityInfo.carryCateId || {};
                const realCarryPrice = this.getRealCarryPrice(carryCateInfo,addressItem,buySum);
                let model = null;
                commodityInfo.models.forEach((item) => {
                  if(item._id == modelId){
                    model = item;
                  }
                })
                let allCommodityPrice = model['modelPrice'] * buySum;
                let carryPrice = realCarryPrice==-1?0:realCarryPrice;
                let curCommodityPrice = allCommodityPrice  + carryPrice; 
                allPayMoney = allPayMoney + curCommodityPrice;
                allBuySum = allBuySum + buySum;
                priceList.push({
                  allCommodityPrice,
                  carryPrice,
                });
                return(
                  <div key={index} style={styles.commodityItem}>
                    <div style={{height:50,display:'flex',flexDirection:'row',alignItems:'center'}}>
                      <i className="fa fa-home fa-lg" style={{marginLeft:10}}></i>
                      <span style={{marginLeft:10,fontSize:16}}>{orderItem.shopName}</span>
                    </div>

                     <div style={{flex:1,height:125,display:'flex',flexDirection:'row',width:'100%'}}>
                       <div style={{width:100,paddingLeft:10}}>
                          <img style={{width:90,height:90}} src={model['modelImg']} alt=""/>
                       </div>
                       <div style={{flex:1,display:'flex',flexDirection:'column',paddingLeft:10}}>
                          <div style={{display:'flex',flex:1,fontSize:18}}>{commodityInfo['name']}</div>
                          <div style={{display:'flex',flex:2}}>{model['modelType']}</div>
                       </div>
                       <div style={{width:80,display:'flex',flexDirection:'column'}}>
                         <div style={{display:'flex',flex:1,fontSize:18}}>￥{model['modelPrice']}</div>
                         <div style={{display:'flex',flex:2,}}>X{buySum}</div>
                       </div>
                    </div>
                   
                    <div style={{height:50,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                      <span  style={{paddingLeft:15,fontSize:16}}>运费</span>
                      <span  style={{paddingRight:20}}>
                          {realCarryPrice===-1?'货到付款':`￥${realCarryPrice}`}
                      </span>
                    </div>
                    <div style={{height:50,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                      <InputItem
                          style={{fontSize:15}}
                          type="text"
                          placeholder="给卖家留言"
                          ref={el => this.autoFocusInst = el}
                          clear
                          onChange = {(val)=>this.setWords(index,val)}
                        >
                        留言
                      </InputItem>
                    </div>
                    <div style={{height:50,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                      <span style={{marginRight:20,fontSize:16}}>合计：<span style={{color:'red'}}>￥{curCommodityPrice}</span></span>
                    </div>
                  </div>
                )  
              })
            }


            <div style={{height:70}}></div>
            <div style={styles.orderFooter}>
                <div style={styles.footerRightLabel}>
                  <div style={{display:'flex',flexDirection:'row'}}>
                    <div>共{allBuySum}件商品&nbsp;</div>
                    <div>总计￥{allPayMoney}</div>
                  </div>
                  <div style={{display:'flex',flexDirection:'row'}}>（已包括邮费）</div>

                </div>
                <div style={styles.footerRightBtn} onClick={()=>{this.submitOrder(addressItem,priceList)}}>
                  提交订单
                </div>
            </div>

            <AddressList addressModal={addressModal} realAddressIndex={realAddressIndex} changeAddressModal={this.changeAddressModal.bind(this)} 
              onSelectAddress={this.onSelectAddress.bind(this)} ></AddressList>
                
        </div>
     )
  }
}

const styles = {
   container:{
     display:'flex',
     flexDirection:'column',
     minHeight:document.documentElement.clientHeight,
     width:document.documentElement.clientWidth,
     backgroundColor:'#fff'
   },
   addressIcon:{
    width:30,
    height:'100%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
   },
   addressMain:{
    flex:1,
    display:'flex',
    flexDirection:'column',
   },
   addressMainItem:{
    height:30,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
   },
   commodityItem:{
    backgroundColor:'#fff',
   },
   orderFooter:{
    position:'fixed',
    bottom:0,
    backgroundColor:'#fff',
    height:50,
    width:'100%',
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-end',
    zIndex:100
   },
   footerRightLabel:{
    width:150,
    height:'100%',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
   },
   footerRightBtn:{
    width:100,
    height:'100%',
    backgroundColor:'red',
    fontSize:16,
    color:'#fff',
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  addressModalMain:{
    height:"100%",
    width:'100%',
    backgroundColor:'#fff'
  },
  addressModalFooter:{
    position:'fixed',
    bottom:0,
    height:60,
    width:'100%',
  },


}

const mapStateToProps = (state) => {
  const localOrderInfo = state.order.localOrderInfo || [];
  const isFromShopCar = state.order.isFromShopCar || [];
  const toRemovedShopCarItemIdList = state.order.toRemovedShopCarItemIdList || [];
  const userInfo = state.user.userInfo || {};
  return {
    localOrderInfo,
    isFromShopCar,
    toRemovedShopCarItemIdList,
    userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({getUser,removeCommodityListFromShopCar,addOrderList,setLocalOrderPayList}, dispatch);
  return {
    ...actions,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderCreate);
