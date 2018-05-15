import React from 'react';
import {Router,Switch, Route, Redirect } from 'react-router-dom';
import Shop from './containers/Shop';
import CommodityCate from './containers/CommodityCate';
import User from './containers/User';
import Collection from './containers/Collection';
import ShopCar from './containers/ShopCar';
import Order from './containers/Order';
import OrderCreate from './containers/OrderCreate';
import Pay from './containers/Pay';
import Commodity from './containers/Commodity';
import LoginIn from './containers/LoginIn';
import LoginUpPassword from './containers/LoginUpPassword';
import LoginUp from './containers/LoginUp';
import Mall from './containers/Mall';

import {history} from './history';

const supportsHistory = 'pushState' in window.history;

const Routes = () => {
	return (
		<Router history={history}>
            <div>
                <Route exact path="/" component={Mall}></Route>
                <Route exact path="/web-shop/:shopId" component={Shop}></Route>
                <Route exact path="/web-commodityCate/:shopId" component={CommodityCate}></Route>
                <Route exact path='/web-commodity/:shopId/:commodityId' component={Commodity}></Route>
                <Route exact path='/web-chat/:shopId/:userId' component={ShopCar}></Route>
                <Route exact path='/web-user/:userId' component={User}></Route>    
                <Route exact path='/web-collection/:userId/:type' component={Collection}></Route>
                <Route exact path='/web-order/:userId/:status' component={Order}></Route>
                <Route exact path='/web-orderCreate' component={OrderCreate}></Route>
                <Route exact path='/web-Pay' component={Pay}></Route>
                <Route exact path='/web-shopCar/:userId' component={ShopCar}></Route>
                <Route exact path='/web-loginUp' component={LoginUp}></Route>
                <Route exact path='/web-loginUpPassword' component={LoginUpPassword}></Route>
                <Route exact path='/web-loginIn/:fromUrl' component={LoginIn}></Route>  
            </div>
		</Router>
	)
}
 
export default Routes;


