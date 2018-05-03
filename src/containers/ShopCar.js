import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {Button,List,InputItem} from 'antd-mobile';

import {getShopCarCommodityList} from '../actions/user';
import {setLocalOrderInfo} from '../actions/order';

class ShopCar extends React.Component{

  constructor(props){
    super(props);
    this.state = {
        userId:"",
        tempList:[]
    }
  }

  componentDidMount(){
    let userId = sessionStorage.getItem('userId');
    const {shopCarCommodityList} = this.props;
    let newState = {};
    if(userId){
      newState['userId'] = userId;
      this.setState(newState)
      if(!shopCarCommodityList || shopCarCommodityList.length ==0){
        this.props.getShopCarCommodityList(userId);
      }
      
    }
  }

  selectItem = (index,commodityPrice,buySum)=>{
    const {tempList} = this.state;
    if(!tempList[index]){
      tempList[index] = {
        checked:false
      }
    }
    tempList[index]= {
      checked:!tempList[index]['checked'],
      payMoney:commodityPrice * buySum,
      buySum
    }
    this.setState({
      tempList
    })
  }

  getSelectedSum = ()=>{
    const {tempList} = this.state;
    let selectedSum = 0;
    tempList.forEach((item) => {
      if(item.checked){
        selectedSum += item.buySum;
      }
    })
    return selectedSum;

  }

  getAllPayMoney(){
    const {tempList} = this.state;
    let allPayMoney = 0;
    tempList.forEach((item) => {
      if(item.checked){
        allPayMoney += item.payMoney;
      }
    })
    return allPayMoney;
  }


  createOrder= ()=>{
    const {tempList} = this.state;
    const {history,shopCarCommodityList} = this.props;
    let localOrderInfo = [];
    let toRemovedShopCarItemIdList = [];
    let shopInfo,commodityInfo;

    shopCarCommodityList && shopCarCommodityList.forEach((item,index) => {
      if(tempList[index] && tempList[index]['checked']){
        shopInfo = item.shopId || {};
        commodityInfo = item.commodityId || {};
        localOrderInfo.push({
          shopId:shopInfo._id,
          shopName:shopInfo.shopName,
          commodityId:commodityInfo._id,
          commodityInfo:{
            name:commodityInfo.name,
            detail:commodityInfo.detail,
            models:commodityInfo.models,
            carryCateId:commodityInfo.carryCateId
          },
          modelId:item.modelId,
          buySum:item.buySum
        })
        toRemovedShopCarItemIdList.push(item._id);
      }
    })
    if(!localOrderInfo || !localOrderInfo.length){
      alert('没有选择商品');
      return;
    }
    this.props.setLocalOrderInfo(localOrderInfo,true,toRemovedShopCarItemIdList)
    history.push('/web-orderCreate')
  }

  render(){
    const {tempList} = this.state;
    const {shopCarCommodityList} = this.props;

    return(
        <div style={styles.container}>
          <List style={{backgroundColor:'#fff'}} renderHeader={() => '> 购物车'}>
          <div style={{backgroundColor:'#ccc',paddingTop:20,paddingLeft:20,
            display:shopCarCommodityList&&shopCarCommodityList.length?'none':'block'}}>
              <span>暂无商品，请先去添加商品到购物车再来结算</span>
            </div>
          {
              shopCarCommodityList && shopCarCommodityList.map((shopCarItem,index)=>{
                const {modelId,buySum} = shopCarItem;
                const shopInfo = shopCarItem.shopId || {};
                const commodityInfo = shopCarItem.commodityId || {};
                const carryCateInfo = commodityInfo.carryCateId || {};

                let curModel = {};
                commodityInfo.models && commodityInfo.models.forEach((model) => {
                  if(model._id.toString() === modelId){
                    curModel = model;
                  }
                })
                
                return(
                  <div key={index} style={styles.commodityItem} onClick={()=>{this.selectItem(index,curModel['modelPrice'],buySum)}}>
                    <div style={{height:50,display:'flex',flexDirection:'row',alignItems:'center'}}>
                      <i className={tempList[index]&&tempList[index]['checked']?"fa fa-check-circle fa-lg":"fa fa-circle-o fa-lg"} 
                        style={{marginLeft:10,color:tempList[index]&&tempList[index]['checked']?'red':"#ccc"}}></i>
                      <i className="fa fa-home fa-lg" style={{marginLeft:10}}></i>
                      <span style={{marginLeft:10,fontSize:16}}>{shopInfo.shopName}</span>
                    </div>

                     <div style={{flex:1,height:100,display:'flex',flexDirection:'row',width:'100%'}}>
                        <div style={{width:100,paddingLeft:10}}>
                          <img style={{width:90,height:90}} src={curModel['modelImg']} alt=""/>
                        </div>

                        <div style={{flex:3,display:'flex',flexDirection:'row'}}>
                          <div style={{flex:1,display:'flex',flexDirection:'column',paddingLeft:10}}>
                              <div style={{height:30,display:'flex',fontSize:18}}>{commodityInfo['name']}</div>
                              <div style={{flex:1,display:'flex'}}>{curModel['modelType']}</div>
                              <div style={{flex:2,fontSize:14,color:'#aaa'}}>
                                  <span style={{display:(carryCateInfo && carryCateInfo.name)?'inline-block':'none'}}>
                                    {carryCateInfo.name}
                                  </span>
                                  <span style={{display:(carryCateInfo && carryCateInfo.exceptAreas)?'inline-block':'none'}}>
                                    { 
                                      carryCateInfo.exceptAreas && carryCateInfo.exceptAreas.map((item,index) => {
                                        if(index <= 2){
                                           return (
                                            <span key={index}>{item}</span>
                                            )
                                        }
                                      })
                                    }
                                    等地区不包邮
                                  </span>
                              </div>
                          </div>
                          <div style={{width:80,display:'flex',flexDirection:'column'}}>
                              <div style={{height:30,display:'flex',fontSize:18}}>￥{curModel['modelPrice']}</div>
                              <div style={{flex:1,display:'flex'}}>X{buySum}</div>
                              <div style={{flex:2,display:carryCateInfo?'block':'none',fontSize:14}}>
                                <span style={{display:(carryCateInfo && carryCateInfo.normalPrice)?'block':'none'}}>
                                  邮费&nbsp;￥{carryCateInfo.normalPrice}
                                </span>
                                <span style={{display:(carryCateInfo && carryCateInfo.freeNum)?'block':'none'}}>
                                  {carryCateInfo.freeNum}件起免邮费
                                </span>
                              </div>
                          </div>
                        </div>

                    </div>

                  </div>
                )  
              })
            }
          </List>

            <div style={{height:70}}></div>
            <div style={styles.orderFooter}>
                <div style={styles.footerRightLabel}>
                  <div style={{display:'flex',flexDirection:'row'}}>
                    <div>共{this.getSelectedSum()}件商品&nbsp;</div>
                    <div>总计￥{this.getAllPayMoney()}</div>
                  </div>
                  <div style={{display:'flex',flexDirection:'row'}}>（不包括邮费）</div>
                </div>
                <div style={styles.footerRightBtn} onClick={this.createOrder}>
                  去结算
                </div>
            </div>
                
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
     backgroundColor:'#ccc'
   },
   commodityItem:{
    backgroundColor:'#fff',
    marginBottom:10
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
    zIndex:1000
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
    justifyContent:'center',
  }


}

const mapStateToProps = (state) => {
  const shopCarCommodityList = state.user.shopCarCommodityList || [];
  return {
    shopCarCommodityList
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({getShopCarCommodityList,setLocalOrderInfo}, dispatch);
  return {
    ...actions,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopCar);
