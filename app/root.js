import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import App from './containers/app';
import configureStore from './store/configureStore';
import Storage from 'react-native-storage';

var storage = new Storage({
	size: 1000,
	storageBackend: AsyncStorage,
	defaultExpires: null,  //永不过期
	enableCache: true
});

global.storage = storage;
const store = configureStore();

export default class Root extends Component {
	render (){
		return (
			<Provider store={store}>
				<App />
			</Provider>
		);
	}
}