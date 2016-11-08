import React, { Component } from 'react';
import { AsyncStorage,Platform,BackAndroid,ToastAndroid } from 'react-native';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import Storage from 'react-native-storage';
import Navi from './navi';

var storage = new Storage({
	size: 1000,
	storageBackend: AsyncStorage,
	defaultExpires: null,  //永不过期
	enableCache: true
});

global.storage = storage;
const store = configureStore();


export default class Root extends Component {
	componentWillMount() {
		// this.clearAccount();
		if(Platform.OS === 'android'){
			BackAndroid.addEventListener('hardwareBackPress',this.onBackAndroid);
		}
	}
	componentWillUnmount() {
		if(Platform.OS === 'android'){
			BackAndroid.addEventListener('hardwareBackPress',this.onBackAndroid);
		}
	}
	clearAccount() {
		storage.remove({
			key: 'account'
		});
	}
	onBackAndroid = () => {
		// const nav = this.navigator;
		// const routers = nav.getCurrentRoutes();
		// if(routers.length>1){
		// 	const top = routers[routers.length-1];
		// 	if(top.component.prototype.ignoreBack){
		// 		return true;
		// 	}
		// 	const handleBack = top.component.prototype.handleBack;
		// 	if(handleBack){
		// 		return handleBack();
		// 	}
		// 	nav.pop();
		// 	return true;
		// }
		if(this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()){
			return false;
		}
		this.lastBackPressed = Date.now();
		ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
		return true;
	}
	render (){
		return (
			<Provider store={store}>
				<Navi />
			</Provider>
		);
	}
}