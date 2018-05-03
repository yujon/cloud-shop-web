import React from 'react';
// import {SERVER} from '../constants/common';

const ShopItem = ({
    shopInfo,onSelectShop
}) =>{
    return (
        
       <div style={{flex:1,display:'flex',flexDirection:'row',width:'100%',padding:10}} onClick={onSelectShop}>
           <div style={{flex:1}}>
			    <img style={{width:120,height:120}} src={shopInfo['shopImg']} alt=""/>
           </div>
           <div style={{flex:3,display:'flex',flexDirection:'column',marginLeft:10,paddingTop:10,paddingBottom:10}}>
				<div style={{flex:3,display:'flex',flex:2,fontSize:20,color:'red'}}>{shopInfo['shopName']}</div>
				<div style={{flex:3,display:'flex',flex:1}}>简介：{shopInfo['shopDesc']?shopInfo['shopDesc']:'暂时没有简介'}</div>
				<div style={{flex:3,display:'flex',flexDirection:'row',flex:1}}>
					<span  className="commodity-saleQuantity">地址：{shopInfo['shopAddress']}</span>
					<span className="commodity-allRest" style={{marginLeft:5}} >客服电话：{shopInfo['shopPhoneNumber']}</span>
				</div>
           </div>
       </div>
    )
}

export default ShopItem;