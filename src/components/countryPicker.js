import React from 'react';
import {SERVER} from '../constants/common';

const CountryPicker = ({
    commodityInfo,onSelectCommodity
}) =>{
    return (
        
       <div style={{flex:1,display:'flex',flexDirection:'row',width:'100%',padding:10}} onClick={onSelectCommodity}>
           <div style={{flex:1}}>
			    <img style={{width:120,height:120}} src={`${SERVER}${commodityInfo['showImgs'][0]}`} alt=""/>
           </div>
           <div style={{flex:3,display:'flex',flexDirection:'column',marginLeft:10,paddingTop:10,paddingBottom:10}}>
				<div style={{flex:3,display:'flex',flex:1}}>{commodityInfo['name']}</div>
				<div style={{flex:3,display:'flex',flex:2,fontSize:20,color:'red'}}>￥{commodityInfo['normalPrice']}</div>
				<div style={{flex:3,display:'flex',flexDirection:'row',flex:1}}>
					<span  className="commodity-saleQuantity">销量：{commodityInfo['saleQuantity']}</span>
					<span className="commodity-allRest" >库存：{commodityInfo['allRest']}</span>
				</div>
           </div>
       </div>
    )
}

export default CountryPicker;