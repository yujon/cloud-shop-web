import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Button,List,InputItem} from 'antd-mobile'

import {getOrderListByUserIdAndStatus,setLocalOrderPayList,haveReceiveCommodity,addComment} from '../actions/order'

import {SERVER} from '../constants/common';

class Order extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      userId:'',
      status:'',
      commentModal:false,
      commentOrderId:'',
      commentContent:'',
      commentGrade:5
    }
  }

  componentDidMount(){
    const {userId,status} = this.props.match.params;
    this.setState({
      userId,
      status
    })
    this.props.getOrderListByUserIdAndStatus(userId,status);
  }

  changeCommentModal = ()=>{
    this.setState({
      commentModal:!this.state.commentModal
    })
  }

  gotoPay = (orderItem)=>{
    const {history} = this.props;
    let toPaidOrderList = [];
    toPaidOrderList.push({
      orderId:orderItem._id,
      shopId:orderItem.shopId,
      commodityId:orderItem.commodityId,
      modelId:orderItem.modelId,
      buySum:orderItem.buySum,
      payMoney:orderItem.payMoney
    })
    this.props.setLocalOrderPayList(toPaidOrderList);
    history.push('/web-pay');
  }

  gotoReturnSale = ()=>{
    alert('暂时不支持退货哦')
  }
  
  showLogiticsInformation = ()=>{
    alert('暂时不能查看物流信息哦');
  }

  ensureReceiveCommodity = (orderId)=>{
    this.props.haveReceiveCommodity(orderId);
  } 

  gotoComment = (orderId)=>{
    this.setState({
      commentModal:true,
      commentOrderId:orderId,
      commentContent:'',
      commentGrade:5,
    })
  }

  addComment = ()=>{
    const {commentOrderId,commentContent,commentGrade} = this.state;
    this.changeCommentModal();
    this.props.addComment(commentOrderId,commentContent,commentGrade);
  }

 	render(){
      const {orderList} = this.props;
      const {status,commentModal,commentContent,commentGrade} = this.state;
      let priceList = [];
      let title = "订单列表";
      switch(parseInt(status)){
        case 0:
          title = "代付款的订单";
          break;
        case 1:
          title = "待发货的订单";
          break;
        case 2:
          title = "待收货的订单";
          break;
        case 3:
          title = "待评价的订单";
          break;
        case 4:
          title = "已完成的订单";
          break;
      }
      return(
     		<div style={styles.container}>
          <List style={{flex:1,backgroundColor:'#FFE4B5'}}
                renderHeader={() => <span style={{fontSize:18,color:'#000'}}>{`${title}`}</span>}>
          {
              orderList.map((orderItem,index)=>{
                const {shopId,commodityId,modelId,buySum,payMoney,words,addressInfo} = orderItem;
                const {allCommodityPrice,carryPrice} = payMoney;
                let model = null;
                commodityId.models.forEach((item) => {
                  if(item._id == modelId){
                    model = item;
                  }
                })
                return(
                  <div key={index} style={{backgroundColor:'#fff',marginBottom:10}}>
                    <div style={{height:50,display:'flex',flexDirection:'row',alignItems:'center',backgroundColor:'#aaa',borderBottomWidth:1,}}>
                      <i className="fa fa-home fa-lg" style={{marginLeft:10}}></i>
                      <span style={{marginLeft:10,fontSize:16}}>{shopId.shopName}</span>
                    </div>
                     <div style={{flex:1,height:80,marginTop:10,display:'flex',flexDirection:'row',width:'100%'}}>
                       <div style={{width:80,paddingLeft:10}}>
                          <img style={{width:80,height:80}} src={`${SERVER}${model['modelImg']}`} alt=""/>
                       </div>
                       <div style={{flex:1,display:'flex',flexDirection:'column',paddingLeft:10}}>
                          <div style={{display:'flex',flex:1,fontSize:18}}>{commodityId['name']}</div>
                          <div style={{display:'flex',flex:2}}>{model['modelType']}</div>
                       </div>
                       <div style={{width:80,display:'flex',flexDirection:'column'}}>
                         <div style={{display:'flex',flex:1,fontSize:18}}>￥{model['modelPrice']}</div>
                         <div style={{display:'flex',flex:2,}}>X{buySum}</div>
                       </div>
                    </div>
                   
                    <div style={{height:30,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                      <span  style={{paddingLeft:20,fontSize:16}}>运费</span>
                      <span  style={{paddingRight:20}}>
                          {carryPrice}
                      </span>
                    </div>
                    <div style={{height:30,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                      <span  style={{paddingLeft:20,fontSize:16}}>留言</span>
                      <span  style={{paddingRight:20}}>
                          {words}
                      </span>
                    </div>
                    <div style={{height:50,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingLeft:20,paddingRight:10}}>
                      <span style={{fontSize:16}}>合计：<span style={{color:'red'}}>￥{allCommodityPrice+carryPrice}</span></span>
                      <div style={{display:'flex',flexDirection:'row'}}>
                        <Button type="primary" onClick={()=>this.gotoPay(orderItem)}
                          style={{display:status==0?'flex':'none',width:70,height:40,alignItems:'center',justifyContent:'center'}}>
                          去付款
                        </Button>
                        <Button type="primary"  onClick={()=>this.gotoReturnSale(orderItem._id)}
                          style={{display:status==1?'flex':'none',width:70,height:40,alignItems:'center',justifyContent:'center'}}>
                          去退货
                        </Button>
                        <Button type="primary" onClick={()=>this.showLogiticsInformation(orderItem._id)}
                          style={{display:status==2?'flex':'none',width:80,height:40,alignItems:'center',justifyContent:'center'}}>
                          查看物流
                        </Button>
                        <Button type="primary" onClick={()=>this.ensureReceiveCommodity(orderItem._id)}
                          style={{display:status==2?'flex':'none',width:80,height:40,alignItems:'center',justifyContent:'center'}}>
                          确认收货
                        </Button>
                        <Button type="primary" onClick={()=>this.gotoComment(orderItem._id)}
                          style={{display:status==3?'flex':'none',width:70,height:40,alignItems:'center',justifyContent:'center'}}>
                          去评价
                        </Button>
                      </div>
                    </div>
                  </div>
                )  
              })
          }
              <div style={{display:orderList.length?'none':'block',position:'absolute',top:0,bottom:0,left:0,right:0,backgroundColor:'#fff'}}>
                  <span  style={{display:'block',textAlign:'center'}}>暂时没有订单哦</span>
              </div>
          </List>

          <div style={{backgroundColor:'rgba(0, 0, 0, 0.4)',position:'absolute',top:0,left:0,zIndex:1000,right:0,bottom:0,
                  transition:'opacity 0.5s ease-out',display:commentModal?'block':'none'}}>
            <List style={{position:'absolute',bottom:0,left:0,height:250,width:'100%',backgroundColor:'#fff'}} 
              renderHeader={() =>
                <List.Item style={{height:60}} extra={<i className="fa fa-close" onClick={this.changeCommentModal}></i>} >
                  添加评论
                </List.Item>
              }>
              <div style={{marginTop:10,height:50,width:'100%'}}>
                <span style={{display:'inline-block',height:50,width:80,fontSize:17,marginTop:10,paddingLeft:15}}>评分：</span>
                <select style={{display:'inline-block',height:30,width:150}} onChange={()=>this.setState({})}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </div>
              

              <InputItem
                  style={{fontSize:15}}
                  type="text"
                  placeholder="输入详细信息"
                  clear
                  value={commentContent}
                  onChange = {(val)=>this.setState({commentContent:val})}
                >
                评论：
              </InputItem>
              <div style={{marginTop:10,'flexDirection':'row',alignItems:'center',justifyContent:'center', display:'flex'}}>
                <Button type="primary" style={{flex:1,width:'100%'}} onClick={this.addComment}>提交</Button>
              </div>
            </List>
          </div>

        </div>
      )
 	}
}

const styles = {
  container:{
    flex:1,
    backgroundColor:'#ccc'
  }
}

const mapStateToProps = (state) => {
  const orderList = state.order.orderList || [];
  return {
    orderList
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({getOrderListByUserIdAndStatus,setLocalOrderPayList,haveReceiveCommodity,addComment}, dispatch);
  return {
    ...actions
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);