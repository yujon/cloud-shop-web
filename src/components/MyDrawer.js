import React from 'react';
import {Drawer} from 'antd-mobile'
const MyDrawer = ({
    drawerStatus,changeDrawerStatus,sidebar
}) =>{
    return (
        <Drawer
        sidebarStyle={{ height: document.documentElement.clientHeight,width:(document.documentElement.clientWidth-100),backgroundColor:'#fff'}}
        contentStyle={{ }}
        enableDragHandle
        contentStyle={{ color: '#A6A6A6', textAlign: 'center', marginLeft:-10 }}
        sidebar={sidebar}
        open={drawerStatus}
        onOpenChange={this.changeDrawerStatus}
      >     
      </Drawer>

    )
}

export default MyDrawer;