import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import {getCollectionList,removeCollection} from '../actions/user'; 
import CommodityItem from '../components/CommodityItem'
import ShopItem from '../components/ShopItem'

class Collection extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      userId:'',
      type:''
    }
  }

  componentDidMount(){
    const {userId,type} = this.props.match.params;
    this.setState({
      userId,
      type
    })
    this.props.getCollectionList(userId,type);
  }


  gotoCommodity = (shopId,commodityId) =>{
    const {history} = this.props;
    history.push(`/web-commodity/${shopId}/${commodityId}`)
  }

  gotoShop= (shopId) =>{
    const {history} = this.props;
    history.push(`/web-shop/${shopId}`)
  }

 	render(){
    const {collectionList} = this.props;
    const {type} = this.state;
    return(
     	<div >
          <div style={{display:type=="commodity"?'flex':'none',position:'ansolute',top:0,bottom:0,left:0,right:0}}>
              <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',backgroundColor:'#fff'}}>
                 {
                  (type=="commodity") && collectionList.map((collectionItem,index)=>{
                    const commodity = collectionItem.commodityId;
                    const shop = collectionItem.shopId;
                    return( 
                      <CommodityItem  key={index}
                        commodityInfo={commodity} 
                        onSelectCommodity={()=>{this.gotoCommodity(shop._id,commodity._id)}}>
                      </CommodityItem>
                    )
                  })
                 }
              </div>
              <div style={{display:collectionList.length?'none':'block',position:'absolute',top:0,bottom:0,left:0,right:0,backgroundColor:'#fff'}}>
                  <span  style={{display:'block',textAlign:'center'}}>你还没有收藏商品哦</span>
              </div>
          </div>
          <div style={{display:type=="shop"?'flex':'none'}}>
              <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',backgroundColor:'#fff'}}>
                {
                  (type=="shop") && collectionList.map((collectionItem,index)=>{
                    const shop = collectionItem.shopId;
                    return( 
                      <ShopItem  key={index}
                        shopInfo={shop} 
                        onSelectShop={()=>{this.gotoShop(shop._id)}}>
                      </ShopItem>
                    )
                  })
                 }
              </div>
              <div style={{display:collectionList.length?'none':'block',position:'absolute',top:0,bottom:0,left:0,right:0,backgroundColor:'#fff'}}>
                  <span  style={{display:'block',textAlign:'center'}}>你还没有收藏店铺哦</span>
              </div>
          </div>
      </div>
     )
 	}
}

const mapStateToProps = (state) => {
  const collectionList = state.user.collectionList || [];
  return {
    collectionList
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({getCollectionList,removeCollection}, dispatch);
  return {
    ...actions,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Collection);