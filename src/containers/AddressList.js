import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {List,Switch,InputItem,Button,Picker,Modal} from 'antd-mobile';
import districtData from '../constants/district';

import {getAddressList,addAddress,removeAddress,updateAddress} from '../actions/user';

class AddressList extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      userId:'',
      editDialog:false,
      curEditIndex:0,
      receiver:'',
      phone:'',
      province:'',
      city:'',
      distinct:'',
      addressDetail:'',
      isDefault:false
    }
  }

  componentDidMount(){
    let userId = localStorage.getItem('userId');
    let newState = {};
    if(userId){
      newState['userId'] = userId;
      this.setState(newState)
      this.props.getAddressList(userId);
    }
  }
  
  changeShowEditDialog = ()=>{
    this.setState({
      editDialog:!this.state.editDialog
    })
  }

  setDistrict = (arr)=>{
    this.setState({
      province:arr[0],
      city:arr[1],
      distinct:arr[2]
    })
  }


  addAddress =()=>{
    this.setState({
      curOp:'add',
      receiver:'',
      phone:'',
      province:'',
      city:'',
      distinct:'',
      addressDetail:'',
      isDefault:false
    })
    this.changeShowEditDialog();
  }

  updateAddress = (addressItem,index)=>{
    this.setState({
      curOp:'update',
      curEditIndex:index,
      ...addressItem
    })
    this.changeShowEditDialog();
  }
  
  removeAddress = (addressId)=>{
    const {userId} = this.state;
    Modal.alert('提醒', '确定删除吗？', [
      { 
        text: '取消', 
        onPress: () => console.log('cancel') 
      },
      { 
        text: '确定', 
        onPress: () => {
          this.props.removeAddress(userId,addressId);
        }
      }
    ])
  }

  submitAddressOp = ()=>{
    const {userId,curEditIndex,receiver,phone,province,city,distinct,addressDetail,isDefault,curOp} = this.state;
    const {addressList} = this.props;
    const addressInfo = {
      receiver,
      phone,
      province,
      city,
      distinct,
      addressDetail,
      isDefault
    }
    this.changeShowEditDialog();
    if(curOp == 'add'){
      this.props.addAddress(userId,addressInfo);
    }else if(curOp == 'update'){
      const addressId = addressList[curEditIndex]._id;
      this.props.updateAddress(userId,addressId,addressInfo);
    }
  }

 	render(){
    const {addressModal,realAddressIndex,changeAddressModal,onSelectAddress,addressList} = this.props;
    const {editDialog,receiver,phone,province,city,distinct,addressDetail,isDefault,curOp} = this.state;
    console.log(addressList)
    return(
      <div>
        <div style={{backgroundColor:'rgba(0, 0, 0, 0.4)',position:'absolute',top:0,left:0,zIndex:100,right:0,bottom:0,
                transition:'opacity 0.5s ease-out',display:addressModal?'block':'none'}}>
          <List style={styles.addressModalMain} 
              renderHeader={() =>
                 <List.Item style={{height:60}} extra={<i className="fa fa-close fa-lg" onClick={changeAddressModal}></i>} >
                    选择收获地址
                </List.Item>
              }>
            {
              addressList && addressList.map((addressItem,index)=>{
                return(

                  <List.Item key={index} thumb={<i className="fa fa-map-marker fa-lg" style={{color:realAddressIndex===index?'red':'#ccc'}}></i>} 
                    onClick={() =>{onSelectAddress(addressItem._id)}}>
                      <div style={styles.address}>
                          <div style={styles.addressMain}>
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
                          <div style={styles.addressFooter}>
                            <div style={styles.addressFooterItem} 
                              onClick={(e)=>{
                                e.stopPropagation();
                                e.nativeEvent.stopImmediatePropagation();
                                this.updateAddress(addressItem,index)
                              }}>编辑</div>
                            <div style={styles.addressFooterItem} onClick={(e)=>{
                                e.stopPropagation();
                                e.nativeEvent.stopImmediatePropagation();
                                this.removeAddress(addressItem._id)
                              }}>删除</div>
                          </div>
                      </div>
                  </List.Item>
                )
              })
            }
          </List>
          <div style={styles.addressModalFooter}>
              <Button type="warning" style={styles.addBtn} onClick={this.addAddress}>添加新地址</Button>
          </div>
        </div>

        <div style={{backgroundColor:'rgba(0, 0, 0, 0.4)',position:'absolute',top:0,left:0,zIndex:1000,right:0,bottom:0,
                  transition:'opacity 0.5s ease-out',display:editDialog?'block':'none'}}>
            <List style={{position:'absolute',bottom:0,left:0,height:350,width:'100%',backgroundColor:'#fff'}} 
              renderHeader={() =>
                <List.Item style={{height:60}} extra={<i className="fa fa-close" onClick={this.changeShowEditDialog}></i>} >
                  {curOp=='add'?'添加收货地址':'修改收货地址'}
                </List.Item>
              }>
              <InputItem
                  style={{fontSize:15}}
                  type="text"
                  placeholder="收货人姓名"
                  clear
                  value={receiver}
                  onChange = {(val)=>this.setState({receiver:val})}
                >
                收货人
              </InputItem>
              <InputItem
                  style={{fontSize:15}}
                  type="text"
                  placeholder="收货人手机号"
                  clear
                  value={phone}
                  onChange = {(val)=>this.setState({phone:val})}
                >
                手机号码
              </InputItem>
          
              <Picker extra="请选择" data={districtData} title="Areas" cols={3} onOk={e =>this.setDistrict(e)}>
                <List.Item arrow="horizontal">所在区域&nbsp;&nbsp;{province}{city}{distinct}</List.Item>
              </Picker>

              <InputItem
                  style={{fontSize:15}}
                  type="text"
                  placeholder="输入详细信息"
                  clear
                  value={addressDetail}
                  onChange = {(val)=>this.setState({addressDetail:val})}
                >
                详细地址
              </InputItem>
              <List.Item extra={<Switch checked={isDefault} onClick={(checked) =>this.setState({isDefault:checked})}/>}>设为默认地址</List.Item>

              <div style={{marginTop:10,'flexDirection':'row',alignItems:'center',justifyContent:'center', display:'flex'}}>
                <Button type="primary" style={{flex:1,width:'100%'}} onClick={this.submitAddressOp}>确定</Button>
              </div>
            </List>
          </div>
      </div>
    )
 	}
}

const styles = {
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
    display: "-webkit-flex", /* Safari */
    display: "flex",
    justifyContent:'center',
    alignItems:'center'
  },
  addBtn:{
    flex:1,
    display: "-webkit-flex", /* Safari */
    display: "flex",
    alignItems:'center',
    justifyContent:'center',
  },
  address:{
    display: "-webkit-flex", /* Safari */
    display: "flex",
    flexDirection:'row'
  },
  addressMain:{
    width:0,
    flex:1,
    overflow:'hidden',
    textOverflow:'ellipsis',
    whiteSpace:'nowrap',
    display: "-webkit-flex", /* Safari */
    display: "flex",
    flexDirection:'column',
   },
   addressMainItem:{
    height:30,
    display: "-webkit-flex", /* Safari */
    display: "flex",
    flexDirection:'row',
    alignItems:'center',
   },
   addressFooter:{
    height:'100%',
    width:60,
    display: "-webkit-flex", /* Safari */
    display: "flex",
    flexDirection:'column',
    alignItems:'center'
   },
   addressFooterItem:{
    flex:1,
    height:30
   }
}


const mapStateToProps = (state) => {
  const {addressList} = state.user;
  return {
    addressList
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({getAddressList,addAddress,removeAddress,updateAddress}, dispatch);
  return {
    ...actions,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressList);
