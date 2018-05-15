import React from 'react';
import {getPriceRangeAndAllRest} from '../utils/Format';
import {SERVER} from '../constants/common';

const CommodityItem = ({
    commodityInfo,onSelectCommodity
}) =>{
    const {priceRange,allRest} = getPriceRangeAndAllRest(commodityInfo.models);
    return (
        <div style={{flex:1,display:'flex',flexDirection:'row',width:'100%',padding:10}} onClick={onSelectCommodity}>
          <div style={{flex:1}}>
			      <img style={{width:120,height:120}} src={`${SERVER}${commodityInfo['showImgs'][0]}`} alt=""/>
          </div>
          <div style={{flex:3,display:'flex',flexDirection:'column',marginLeft:10,paddingTop:10,paddingBottom:10}}>
    				<div style={{flex:3,display:'flex',flex:1}}>{commodityInfo['name']}</div>
    				<div style={{flex:3,display:'flex',flex:2,fontSize:20,color:'red'}}>￥{priceRange}</div>
    				<div style={{flex:3,display:'flex',flexDirection:'row',flex:1}}>
    					<span  className="commodity-saleQuantity">销量：{commodityInfo['saleQuantity']}</span>
    					<span className="commodity-allRest" style={{marginLeft:5}} >库存：{priceRange}</span>
    				</div>
          </div>
       </div>
    )
}

export default CommodityItem;