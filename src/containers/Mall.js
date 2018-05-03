import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {} from 'antd-mobile';



class Mall extends React.Component{

  constructor(props){
    super(props)
    this.state = {
     
    }
  }

  componentDidMount() {
    
  }


  render(){

    return(
         <div style={styles.container}>
           云店主页
         </div>
     )
  }

}


const styles = {
   container:{
     display:'flex',
     flexDirection:'column',
     height:document.documentElement.clientHeight,
     width:document.documentElement.clientWidth,
     backgroundColor:'#fff'
   },
    line:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      border:'none'
   },
   lineLeft:{
     flex:1,
     marginTop:10,
     marginBottom:10,
     fontSize:15,
     borderRightWidth:0.5,
     borderRightColor:'#ddd',
     color:'#000'
   },
   lineRight:{
     marginLeft:70
   },
   
}

const mapStateToProps = (state) => {
  const {} = state;
  return {
    
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({}, dispatch);
  return {
    ...actions
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Mall);