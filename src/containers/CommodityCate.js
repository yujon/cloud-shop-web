import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import CommodityItem from '../components/CommodityItem'


class CommodityCate extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      shopId:''
    }
  }

  componentDidMount(){
    const {shopId} = this.props.match.params;
    if(!shopId){
      alert('找不到shopId')
      return;
    }
    this.setState({
      shopId
    })
  }




  gotoCommodity = (commodityId) =>{
    const {history} = this.props;
    const {shopId} = this.state;
    history.push(`/web-commodity/${shopId}/${commodityId}`)
  }

 	render(){
    const {commodityListByCommodityCate} = this.props;
    console.log(commodityListByCommodityCate)
    return(
     		<div >
           <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',backgroundColor:'#fff'}}>
               {
                commodityListByCommodityCate.map((commodity,index)=>{
                  return( 
                    <CommodityItem  key={index}
                      commodityInfo={commodity} 
                      onSelectCommodity={()=>{this.gotoCommodity(commodity._id)}}>
                    </CommodityItem>
                  )
                })
               }
            </div>
            <div style={{display:commodityListByCommodityCate.length?'none':'block',position:'absolute',top:0,bottom:0,left:0,right:0,backgroundColor:'#fff'}}>
                <span  style={{display:'block',textAlign:'center'}}>该类别下暂时没有商品</span>
            </div>
        </div>
     )
 	}
}

const mapStateToProps = (state) => {
  const commodityListByCommodityCate = state.commodity.commodityListByCommodityCate || [];
  return {
    commodityListByCommodityCate
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({}, dispatch);
  return {
    ...actions,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommodityCate);