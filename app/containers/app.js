import React, { Component } from 'react';
import {
	Navigator,
	BackAndroid,
	ToastAndroid,
	Platform
} from 'react-native';

import Index from '../containers/index';

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
		const nav = this.navigator;
		const routers = nav.getCurrentRoutes();
		if(routers.length>1){
			const top = routers[routers.length-1];
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
