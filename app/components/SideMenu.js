import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
	Text,
	Image,
	View,
	TextInput,
	Modal,
	Dimensions,
	TouchableOpacity,
	Platform,
	Navigator
} from 'react-native';

import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import Style from '../styles/style';

export default class SideMenu extends Component{
	constructor(props) {
	  super(props);
	  this.state = {};
	}
	render() {
		return (
			<View style={Style.drawer}>
        <View style={Style.drawer_container}>
          <View style={Style.drawer_avatar}>
            <Image style={Style.drawer_avatar_image} source={require('../images/avatar.jpeg')}/>
            <View>
              <Text style={Style.drawer_avatar_text}>春药之灵</Text>
              <Text style={Style.drawer_avatar_text}>
                Uid 5201314
              </Text>
            </View>
          </View>
          <View style={Style.drawer_menu}>
            <Button style={Style.drawer_menu_item} onPress={Actions.signin}>
              <Icon name='linux' size={16} color='#ddd'/>登录
            </Button>
            <Button style={Style.drawer_menu_item} onPress={Actions.signup}>
              <Icon name='linux' size={16} color='#ddd'/>注册
            </Button>
            <Button style={Style.drawer_menu_item} onPress={Actions.account}>
              <Icon name='steam' size={16} color='#ddd'/>绑定 Steam
            </Button>
            <Button style={Style.drawer_menu_item}>
              <Icon name='power-off' size={16} color='#ddd'/>退出
            </Button>
          </View>
        </View>
      </View>
		);
	}
}