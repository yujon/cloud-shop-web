import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Icon,Button,Card,List,Carousel,Stepper,Tabs} from 'antd-mobile';
import Header from '../components/Header'

import {getPriceRangeAndAllRest} from '../utils/Format';

import {SERVER} from '../constants/common';

import {getUser,addCommodityToShopCar,addCollection,removeCollection} from '../actions/user';
import {getShop} from '../actions/shop';
import {getSetting} from '../actions/setting';
import {getCommodity} from '../actions/commodity';
import {setLocalOrderInfo,getCommentList} from '../actions/order';

class Commodity extends React.Component{

  constructor(props){
    super(props);
    this.state = {
        userId:'',
        shopId:"",
        commodity:'',
        modelModal:false,
        modelIndex:0,
        buySum:1,
        curOpType:'',
        isCollected:undefined
    }
  }

  componentDidMount(){
    const {shopId,commodityId} = this.props.match.params;
    if(!shopId){
      alert('找不到shopId')
      return;
    }
    if(!commodityId){
      alert('找不到commodityId');
      return;
    }
    let userId = localStorage.getItem('userId');
    let newState = {}
    this.props.getSetting();
    this.props.getShop(shopId)
    this.props.getCommodity(shopId,commodityId);
    this.props.getCommentList(commodityId);  //获取商品的所有评论，不止是当前店铺出售的订单的评论
    if(userId){
      newState['userId'] = userId;
      this.props.getUser(userId);
    }
    newState['shopId'] = shopId;
    newState['commodityId'] = commodityId;
    this.setState(newState)
  }

  getSwiper = (showImgs) =>{
    var resImg = [];
    showImgs.forEach((img) =>{
      resImg.push({
        image:img,
        link:'',
        title:''
      })
    })
    return resImg;
  }


  checkCollect = ()=>{
    const {userInfo} = this.props;
    const {commodityId} = this.state;
    let defaultCollect = false;
    if(!userInfo || !userInfo.commodityCollections){
      defaultCollect = false;
    }else{
      userInfo.commodityCollections.forEach((item) => {
        if(item.commodityId == commodityId){
          defaultCollect = true;
        }
      })
    }
    return defaultCollect;
  }

  clickCollection = (isCollected) =>{
    const {commodityId,userId,shopId} = this.state;
    if(!userId){
      alert('请先登录')
      return;
    }
    if(isCollected){
      this.props.removeCollection(userId,'commodity',shopId,commodityId,()=>{
        this.setState({
          isCollected:!isCollected
        })
      });
    }else{
      this.props.addCollection(userId,'commodity',shopId,commodityId,()=>{
        this.setState({
          isCollected:!isCollected
        })
      })
    }
  }

  gotoShop = () =>{
    const {history} = this.props;
    const {shopId} = this.state;
    history.push('/web-shop/'+shopId)
  }

  gotoChat = () =>{
    const {history} = this.props;
    const {shopId,userId} = this.state;
    if(!userId){
      alert('请先登录');
      return;
    }
    history.push(`/web-chat/${shopId}/${userId}`)
  }
  
  gotoUser = () =>{
    const {history} = this.props;
    const {userId} = this.state;
    if(!userId){
      alert('请先登录');
      return;
    }
    history.push(`/web-user/${userId}`)
  }

  gotoLoginUp = () =>{
    const {history} = this.props;
    history.push('/web-loginUp')
  }

  gotoLoginIn = () =>{
    const {history} = this.props;
    const {shopId,commodityId} = this.state;
    const fromUrl = `.web-commodity.${shopId}.${commodityId}`
    history.push('/web-loginIn/'+fromUrl)
  }

  gotoShopCar = () =>{
    const {history} = this.props;
    const {userId} = this.state;
    if(!userId){
      alert('请先登录');
      return;
    }
    history.push(`/web-shopCar/${userId}`)
  }

  changeModelModal = ()=>{
    this.setState({
      modelModal:!this.state.modelModal
    })
  }

  gotoSelectModel = (type) =>{
    const {commodityInfo} = this.props;
    if(!commodityInfo || !commodityInfo.models || !commodityInfo.models.length === 0){
      alert('暂时没有商品种类可选')
      return;
    }
    this.setState({
      curOpType:type
    })
    this.changeModelModal();
  }

  submit = (type =null) =>{
    const {curOpType} = this.state;
    const realOpType = type || curOpType;
    if(realOpType == 'shopCar'){
      this.addToShopCar()
    }else{
      this.createOrder();
    }
  }

  addToShopCar = () =>{
    const {history} = this.props;
    const {userId,shopId,commodityId,buySum,modelIndex} = this.state;
    const {commodityInfo} = this.props;
    const modelId = commodityInfo.models[modelIndex]._id;
    this.changeModelModal();
    if(!userId){
      alert('请先登录');
      return;
    }
    this.props.addCommodityToShopCar(userId,shopId,commodityId,modelId,buySum,()=>{
      //do something
    })
  }
  
  createOrder= ()=>{
    const {history,shopInfo} = this.props;
    const {userId,shopId,commodityId,buySum,modelIndex} = this.state;
    const {shopName} = shopInfo;
    const {commodityInfo} = this.props;
    this.changeModelModal();
    if(!userId){
      this.changeModelModal();
      alert('请先登录');
      return;
    }
    this.props.setLocalOrderInfo([
      { 
        shopId,
        shopName,
        commodityId,
        commodityInfo:{
          name:commodityInfo.name,
          detail:commodityInfo.detail,
          models:commodityInfo.models,
          carryCateId:commodityInfo.carryCateId,
        },
        modelId:commodityInfo.models[modelIndex]._id,
        buySum,
      } 
    ])
    history.push('/web-orderCreate')
  }

  render(){
    const {userId,shopId,curOpType,modelModal,modelIndex,buySum,isCollected} = this.state;
    const {userInfo,settingInfo,shopInfo,commodityInfo,commentList,shopCarCommoditySum} = this.props;
    const {logo} = settingInfo;
    const userImg = userInfo.img;  //img html标记名称
    const {startTime,shopImg,shopName,information,shopPhoneNumber,shopDesc,collectionSum} = shopInfo;
    const {name,showImgs,detail,saleQuantity,saleAmount,models} = commodityInfo;
    const carryCateInfo = commodityInfo.carryCateId || {};
    const {priceRange} = getPriceRangeAndAllRest(models);
    
    const defaultCollect = this.checkCollect();
    const realCollect = isCollected === undefined?defaultCollect:isCollected;

    const items = this.getSwiper(showImgs || []);
    const swiperOptions = {
      preloadImages: true,
      autoplay: 4000,
      autoplayDisableOnInteraction: false
    };

    const tabs = [
      {
        title:'商品详情',
      },
      {
        title:'评论',
      }
    ]

    return(
        <div style={styles.container}>
            <Header logo={logo} userImg={userImg} userId={userId} shopId={shopId} shopCarCommoditySum={shopCarCommoditySum}
              gotoUser={this.gotoUser} gotoShopCar={this.gotoShopCar} gotoLoginUp={this.gotoLoginUp} gotoLoginIn={this.gotoLoginIn}
            ></Header>

           <Carousel autoplay={false}  infinite>
            {items.map((item,index) => (
                <img
                  key={index}
                  src={`${SERVER}${item.image}`}
                  alt={item.title}
                  style={{ display: 'inline-block', width: '100%', height:'200px' }}
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                  }}
                />
            ))}
          </Carousel>
            
            <div style={{fontSize:17,color:'#000',widht:'100%',height:40,display:'flex',alignItems:'center',paddingLeft:15,backgroundColor:'#fff'}}>{name}</div>

            <List.Item >
              <div style={{fontSize:20,color:'red',widht:'100%',height:40,display:'flex',alignItems:'center'}}>
                 ￥{priceRange}
              </div>
            </List.Item>

            <div style={{paddingTop:20,paddingBottom:10,paddingLeft:15,fontSize:14,color:'#aaa',backgroundColor:'#fff'}}>
              <div>
               <span style={{display:(carryCateInfo && carryCateInfo.name)?'inline-block':'none'}}>
                {carryCateInfo.name}
               </span>
               <span style={{display:(carryCateInfo && carryCateInfo.exceptAreas && carryCateInfo.exceptAreas.length)?'inline-block':'none'}}>
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
             <div style={{display:carryCateInfo?'block':'none'}}>
                <span style={{display:(carryCateInfo && carryCateInfo.normalPrice)?'block':'none'}}>
                  邮费&nbsp;&nbsp;￥{carryCateInfo.normalPrice}
                </span>
                <span style={{display:(carryCateInfo && carryCateInfo.freeNum)?'block':'none'}}>
                  {carryCateInfo.freeNum}件起免邮费
                </span>
              </div>
            </div>


            <div style={{display:(models && models.length>0)?'block':'none'}}>
              <List.Item arrow="horizontal" onClick={()=>this.gotoSelectModel('models')}>选择商品型号</List.Item>
            </div>

            <Card style={{marginTop:'10px', marginBottom:'10px'}}>
              <Card.Header
                  title={shopName || "未命名"}
                  thumb={`${SERVER}${shopImg}`}
                  extra={<div><i className="fa fa-heart" style={{marginRight:3}}></i>{collectionSum}收藏</div>}
                />
              <Card.Body>
                <div>{shopDesc?shopDesc:'该店家很懒，暂时没有描述哦'}</div>
              </Card.Body>
              <Card.Footer content="客服电话" extra={<div>{shopPhoneNumber}</div>} />
            </Card>


            <Tabs tabs={tabs} initialPage={0}
              onChange={(tab, index) => { console.log('onChange', index, tab); }}
              onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
            >
              <div style={{ display: 'flex', justifyContent: 'center',  backgroundColor: '#fff' }}>
                <div style={styles.detail}>
                  <div style={styles.detailHead}>商品详情</div>
                  <div style={styles.detailContent}>{detail}</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#fff' }}>
                {
                  commentList.map((comment,index)=>{
                    return (
                      <div style={{flex:1,height:100,marginTop:10,display:'flex',flexDirection:'row',width:'100%'}} key={index}> 
                       <div style={{width:100,paddingLeft:10}}>
                          <img style={{width:80,height:65}} src={`${SERVER}${comment['modelImg']}`} alt=""/>
                          <div style={{display:'flex'}}>型号：{comment['modelType']}</div>
                       </div>
                       <div style={{flex:1,display:'flex',flexDirection:'column',paddingLeft:10}}>
                          <div style={{display:'flex',flex:1}}>{comment['userName']}</div>
                          <div style={{display:'flex',flex:1}}>时间：{comment['payTime']}</div>
                          <div style={{display:'flex',flex:1}}>评分：{comment['commentGrade']}</div>
                          <div style={{display:'flex',flex:2}}>评论：{comment['commentContent']}</div>
                       </div>
                    </div>
                    )
                  })
                }
              </div>
            </Tabs>

            <div style={{height:100}}></div>
            <div style={styles.footer}>
                <div style={styles.footerLeftItem} onClick={this.gotoShop}>
                  <i className="fa fa-home"></i>
                  <span>进店</span>
                </div>
                <div style={styles.footerLeftItem}>
                  <i className="fa fa-comments"></i>
                  <span>客服</span>
                </div>
                <div style={realCollect?styles.activeFooterLeftItem:styles.footerLeftItem} onClick={()=>this.clickCollection(realCollect)}>
                  <i className="fa fa-heart"></i>
                  <span>收藏</span>
                </div>
                <div style={styles.footerRightItem}>
                  <Button type="primary" inline size="small" onClick={()=>this.gotoSelectModel('shopCar')}>进入购物车</Button>
                </div>
                <div style={styles.footerRightItem}>
                  <Button type="warning" inline size="small"  onClick={()=>this.gotoSelectModel('buy')}>立即购买</Button>
                </div>
            </div>

            <div style={{backgroundColor:'rgba(0, 0, 0, 0.4)',position:'fixed',top:0,left:0,right:0,bottom:0,zIndex:20000,
                    transition:'opacity 0.5s ease-out',display:modelModal?'block':'none'}}>
              <img style={styles.modelModalImg} src={models && models[modelIndex]?`${SERVER}${models[modelIndex].modelImg}`:''}></img>
              <div style={styles.modelModalMain}>
                <div style={styles.modelModalHeader}>
                  <div style={styles.modelModalHeaderContent}>
                    <span style={styles.modelModalHeaderPrice}>￥{models && models[modelIndex]?models[modelIndex].modelPrice:''}</span>
                    <i className="fa fa-times" style={styles.modelModalHeaderClose} onClick={this.changeModelModal}></i>
                  </div>
                </div>
                <div style={styles.modelModalBody}>
                  <div style={styles.modelModalBodyItemLabel}>尺寸型号</div>
                  <div style={styles.modelModalBodyItemContent}>
                  {
                    models && models.map((model,index) => (
                      <Button key={index} type="ghost" inline size="small" onClick={()=>{this.setState({modelIndex:index})}} 
                      style={{marginRight:10,color:index==modelIndex?'red':'#ccc',}}>{model.modelType}</Button>
                    ))
                  }
                  </div>
                  <div style={styles.modelModalBodyItemLabel}>数量</div>
                  <div style={styles.modelModalBodyItemContent}>
                    <Stepper
                      style={{width:150}}
                      showNumber
                      max={models && models[modelIndex]?models[modelIndex].modelRest:0}
                      min={1}
                      step={1}
                      value={this.state.buySum}
                      onChange={(val)=>{this.setState({buySum:val})}}
                    />
                    <span style={{marginLeft:10}}>库存{(models && models[modelIndex])?models[modelIndex].modelRest:0}件</span>
                  </div>
                </div>
                <div style={styles.modelModalFooter}>
                    <div style={{marginTop:10,height:40,backgroundColor:'red',
                      display:curOpType!="models"?'flex':'none',justifyContent:'center',alignItems:'center'}}
                      onClick={()=>this.submit()}>
                      确定
                    </div>
                    <div style={{marginTop:10,'flexDirection':'row',alignItems:'center',justifyContent:'flex-end',
                      display:curOpType=="models"?'flex':'none'}}>
                      <Button type="primary" inline size="small" style={{marginRight:10}} onClick={()=>this.submit('shopCar')}>加入购物车</Button>
                      <Button type="warning" inline size="small" style={{marginRight:10}} onClick={()=>this.submit('buy')}>立即购买</Button>
                    </div>
                </div>
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
   swiper:{
    height:200,
    width:'100%'
   },
   footer:{
    backgroundColor:'#fff',
    height:60,
    width:'100%',
    position:"fixed",
    bottom:0,
    display:'flex',
    flexDirection:'row',
    zIndex:10000,
    borderTopColor:'#aaa',
    borderTopWidth:1,
   },
   detail:{

   },
   detailHead:{
     height:50,
     width:'100%',
     textAlign:'center'
   },
   activeFooterLeftItem:{
    flex:2,
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    color:'red'
   },
   footerLeftItem:{
    flex:2,
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
   },
   footerRightItem:{
    flex:3,
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  modelModalImg:{
    position:'absolute',
    bottom:230,
    left:20,
    height:80,
    width:80,
    borderRadius:5,
    borderWidth:1,
    borderColor:'#fff',
    zIndex:10
  },
  modelModalMain:{
    position:'absolute',
    bottom:0,
    left:0,
    height:300,
    width:'100%',
    backgroundColor:'#fff'
  },
  modelModalHeader:{
    height:80,
    width:'100%',
    borderWidth:1,
    borderColor:'#ccc',
    borderStyle:'solid'
  },
  modelModalHeaderContent:{
    marginTop:10,
    marginLeft:120,
  },
  modelModalHeaderPrice:{
    color:'red',
    fontSize:16
  },
   modelModalHeaderClose:{
    float:'right',
    marginRight:15,
  },
  modelModalBody:{
    height:160,
    width:'100%'
  },
  modelModalBodyItemLabel:{
    height:15,
    marginTop:10,
    marginBottom:5,
    marginLeft:10,
  },
  modelModalBodyItemContent:{
    height:40,
    marginTop:5,
    marginBottom:15,
    marginLeft:10,
  },
  modelModalFooter:{
    height:60,
    width:'100%',
    borderTopColor:'#ccc',
    borderTopWidth:1,
    borderTopStyle:'solid',
  }


}

const mapStateToProps = (state) => {
  const shopInfo = state.shop.shopInfo || {};
  const userInfo = state.user.userInfo || {};
  const settingInfo = state.setting.settingInfo || {};
  const commodityInfo = state.commodity.commodityInfo || {};
  const commentList = state.order.commentList || [];
  const shopCarCommodityList = state.user.shopCarCommodityList || [];  //添加到购物车时此值会更细
  const defaultShopCarList = userInfo.shopCar || [];
  return {
    shopInfo,
    userInfo,
    settingInfo,
    commodityInfo,
    commentList,
    shopCarCommoditySum: shopCarCommodityList.length || defaultShopCarList.length
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({setLocalOrderInfo,getCommodity,getUser,getShop,getSetting,addCommodityToShopCar,addCollection,removeCollection,getCommentList}, dispatch);
  return {
    ...actions,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Commodity);

