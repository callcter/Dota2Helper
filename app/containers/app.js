import React, { Component } from 'react';
import {
	Navigator,
	AsyncStorage,
	BackAndroid,
	ToastAndroid,
	Platform
} from 'react-native';

import Index from '../containers/index';
import Storage from 'react-native-storage';

var storage = new Storage({
	size: 1000,
	storageBackend: AsyncStorage,
	defaultExpires: null,  //永不过期
	enableCache: true
});

var count = 1;

global.storage = storage;

export default class App extends Component{
	componentWillMount() {
		if(Platform.OS === 'android'){
			BackAndroid.addEventListener('hardwareBackPress',this.onBackAndroid);
		}
	}
	componentWillUnmount() {
		if(Platform.OS === 'android'){
			BackAndroid.addEventListener('hardwareBackPress',this.onBackAndroid);
		}
	}
	onBackAndroid = () => {
		// console.log(this);
		const nav = this.navigator;
		const routers = nav.getCurrentRoutes();
		if(routers.length>1){
			const top = routers[routers.length-1];
			// console.log(top);
			if(top.component.prototype.ignoreBack){
				return true;
			}
			const handleBack = top.component.prototype.handleBack;
			if(handleBack){
				return handleBack();
			}
			nav.pop();
			return true;
		}
		if(this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()){
			return false;
		}
		this.lastBackPressed = Date.now();
		ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
		return true;
	}
	render() {
		let defaultName = 'index';
		let defaultComponent = Index;
		return(
			<Navigator
				ref={nav => {
					this.navigator = nav;
				}}
				initialRoute={{
					name: defaultName,
					component: defaultComponent
				}}
				configureScene={(route)=>({
					...Navigator.SceneConfigs.HorizontalSwipeJump,
					gestures: { pop: false } //禁用手势
				})}
				renderScene={(route,navigator)=>{
					let Component = route.component;
					return <Component {...route.params} navigator={navigator} />
				}} />
		);
	}
}
