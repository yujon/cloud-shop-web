import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { TabBar ,Tabs, List , NoticeBar,Card} from 'antd-mobile';
import Header from '../components/Header'
import MyDrawer from '../components/MyDrawer'
import CommodityItem from '../components/CommodityItem';

import {SERVER} from '../constants/common';

import {getUser,addCollection,removeCollection} from '../actions/user';
import {getShop} from '../actions/shop';
import {getSetting} from '../actions/setting';
import {getCommodityCateList} from '../actions/shop';
import {getCommodityList,setCommodityListByCommodityCate} from '../actions/commodity';

const tabs = [
  { title: <div><span>店铺首页</span></div> },
  { title: <div><span>全部商品</span></div> },
  { title: <div><span>店家推荐</span></div> },
];

class Shop extends React.Component{

  constructor(props){
    super(props);
    this.state = {
        userId:'',
        shopId:"",
        drawerStatus:false,
        isCollected:undefined
    }
  }

  componentDidMount(){
    const {shopId} = this.props.match.params;
    if(!shopId){
      alert('找不到shopId')
      return;
    }
    let userId = localStorage.getItem('userId');
    let newState = {}
    this.props.getSetting();
    this.props.getShop(shopId)
    this.props.getCommodityCateList(shopId)
    this.props.getCommodityList(shopId);
    if(userId){
      newState['userId'] = userId;
      this.props.getUser(userId);
    }
    newState['shopId'] = shopId;
    this.setState(newState)
  }

  seperateCommodityList(commodityList){
    let hotCommodityList = [];
    let commodityListWithRecommend = []
    hotCommodityList = commodityList.slice(0,5);
    commodityList.forEach((commodity) => {
      if(commodity.shopOwnerRecommodate){
        commodityListWithRecommend.push(commodity)
      }
    })
    return [hotCommodityList,commodityListWithRecommend]
  }

  renderSideBar = ()=>{
    const {commodityCateList} = this.props;
    return (<List>
      {
        commodityCateList.map((commodityCate, index) => {
          return (
            <List.Item key={index}  align="middle" onClick={(item)=>this.onSelectCommodityCate(commodityCate._id)}>
              {commodityCate['name']}
            </List.Item>);
      })
    }
    </List>);
  }

  onSelectCommodityCate(commodityCateId){
    const {history,commodityList} = this.props;
    const {shopId} = this.state;
    let tempArr = [];
    commodityList.forEach((commodity) => {
      if(commodity.commodityCateId === commodityCateId){
        tempArr.push(commodity)
      }
    })
    this.props.setCommodityListByCommodityCate(tempArr);
    history.push('/web-commodityCate/'+shopId)
  }

  changeDrawerStatus = ()=>{
    this.setState({
      drawerStatus:!this.state.drawerStatus
    })
  }

  checkCollect = ()=>{
    const {userInfo} = this.props;
    const {shopId} = this.state;
    let defaultCollect = false;
    if(!userInfo || !userInfo.shopCollections){
      defaultCollect = false;
    }else{
      userInfo.shopCollections.forEach((item) => {
        if(item.shopId == shopId){
          defaultCollect = true;
        }
      })
    }
    return defaultCollect;
  }

  clickCollection = (isCollected) =>{
    const {shopId,userId} = this.state;
    if(!userId){
      alert('请先登录')
      return;
    }
    if(isCollected){
      this.props.removeCollection(userId,'shop',shopId,null,()=>{
        this.setState({
          isCollected:!isCollected
        })
      });
    }else{
      this.props.addCollection(userId,'shop',shopId,null,()=>{
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
    const {shopId} = this.state;
    const fromUrl = `.web-shop.${shopId}`
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

  gotoCommodity = (commodityId) =>{
    const {history} = this.props;
    const {shopId} = this.state;
    history.push(`/web-commodity/${shopId}/${commodityId}`)
  }

 	render(){
    const {userId,shopId,drawerStatus,isCollected} = this.state;
    const {history,userInfo,settingInfo,shopInfo,commodityCateList,commodityList} = this.props;
    const {pathname} = history.location; 
    const {startTime,shopImg,shopName,shopInformation,shopPhoneNumber,shopDesc} = shopInfo; 
    const [hotCommodityList,commodityListWithRecommend] = this.seperateCommodityList(commodityList);
    const {logo} = settingInfo;
    const userImg = userInfo.img;
    const defaultCollect = this.checkCollect();
    const realCollect = isCollected === undefined?defaultCollect:isCollected;
    return(
     		<div className="shop">
            <Header logo={logo} userImg={userImg} userId={userId} shopId={shopId}
              gotoUser={this.gotoUser} gotoShopCar={this.gotoShopCar} gotoLoginUp={this.gotoLoginUp} gotoLoginIn={this.gotoLoginIn}
            ></Header>

            <Card style={{marginTop:'10px', marginBottom:'10px'}}>
              <Card.Header
                  title={shopName || "未命名"}
                  thumb={`${SERVER}${shopImg}`}
                  // extra={<span>{shopPhoneNumber}</span>}s
                />
              <Card.Body>
                <div>{shopDesc?shopDesc:'该店家很懒，暂时没有描述哦'}</div>
              </Card.Body>
              <Card.Footer content="客服电话" extra={<div>{shopPhoneNumber}</div>} />
            </Card>
            
            <NoticeBar marqueeProps={{loop:true,style:{padding:'0 7.5px'}}}>{shopInformation}</NoticeBar>


            <Tabs tabs={tabs} initialPage={0}  onChange={(tab, index) => { console.log('onChange', index, tab); }}
              onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',backgroundColor:'#fff'}}>
                   {
                    hotCommodityList.map((commodity,index)=>{
                      return( 
                        <CommodityItem  key={index}
                          commodityInfo={commodity} 
                          onSelectCommodity={()=>{this.gotoCommodity(commodity._id)}}>
                        </CommodityItem>
                      )
                    })
                   }
                </div>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',backgroundColor:'#fff'}}>
                    {
                    commodityList.map((commodity,index)=>{
                      return(
                        <CommodityItem  key={index}
                          commodityInfo={commodity} 
                           onSelectCommodity={()=>{this.gotoCommodity(commodity._id)}}>
                        </CommodityItem>
                      )
                    })
                   }
                </div>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',backgroundColor:'#fff'}}>
                  {
                    commodityListWithRecommend.map((commodity,index)=>{
                      return(
                        <CommodityItem   key={index}
                          commodityInfo={commodity}  
                          onSelectCommodity={()=>{this.gotoCommodity(commodity._id)}}>
                        </CommodityItem>
                      )
                    })
                   }
                </div>
            </Tabs>
           
            <div style={{position:"fixed",bottom:0,left:0,width:"100%"}}>
              <TabBar unselectedTintColor='#949494' tintColor='red' barTintColor='white'>
                <TabBar.Item  title='主页' key='home' icon={<i className="fa fa-home fa-lg"></i>}
                  selected={/\/shop/.test(pathname)} selectedIcon={<i className="fa fa-home fa-lg" style={{color:'red'}}></i>} 
                  onPress={this.gotoShop}>
                </TabBar.Item>

                <TabBar.Item  title='分类' key='category' icon={<i className="fa fa-list-ul fa-lg"></i>}
                  selectedIcon={<i className="fa fa-list-ul fa-lg" style={{color:'red'}}></i>} 
                  onPress={this.changeDrawerStatus}>
                </TabBar.Item>

                <TabBar.Item  title='收藏' key='collection' icon={<i className="fa fa-heart fa-lg"></i>}
                  selected={realCollect} selectedIcon={<i className="fa fa-heart fa-lg" style={{color:'red'}}></i>} 
                  onPress={()=>this.clickCollection(realCollect)}>
                </TabBar.Item>
                
                <TabBar.Item  title='联系卖家' key='chat' icon={<i className="fa fa-commenting-o fa-lg"></i>}
                  selected={/\/chat/.test(pathname)} selectedIcon={<i className="fa fa-commenting-o fa-lg" style={{color:'red'}}></i>} 
                  onPress={this.gotoChat}>
                </TabBar.Item>
              </TabBar>
            </div>
            
            <div style={{display:drawerStatus?'block':'none'}}>
              <MyDrawer 
                  drawerStatus={drawerStatus}
                  sidebar={this.renderSideBar()}
                >
              </MyDrawer>
            </div>
           
        </div>
     )
 	}
}

const mapStateToProps = (state) => {
  const shopInfo = state.shop.shopInfo || {};
  const userInfo = state.user.userInfo || {};
  const settingInfo = state.setting.settingInfo || {};
  const commodityCateList = state.shop.commodityCateList || [];
  const commodityList = state.commodity.commodityList || [];
  return {
    shopInfo,
    userInfo,
    settingInfo,
    commodityCateList,
    commodityList
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({getSetting,addCollection,removeCollection,getUser,getShop,
    getCommodityList,getCommodityCateList,setCommodityListByCommodityCate}, dispatch);
  return {
    ...actions,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Shop);