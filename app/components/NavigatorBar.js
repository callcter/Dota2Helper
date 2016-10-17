import React, { Component } from 'react';
import {
  StyleSheet,
  Platform,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native';

var screenWidth = Dimensions.get('window').width;

export default class NavigatorBar extends Component{

  constructor(props) {
    super(props);
    this.state = {};
  }

	render() {
		return (
			<View style={styles.container}>
        <TouchableOpacity style={styles.bar__left} onPress={this.props.leftClick}>
          {this.props.left}
        </TouchableOpacity>
        <View style={styles.bar__title}>
          {this.props.title}
        </View>
        <TouchableOpacity style={styles.bar__right} onPress={this.props.rightClick}>
          {this.props.right}
        </TouchableOpacity>
			</View>
		);
	}
}

const styles = (Platform.OS==='ios')?StyleSheet.create({
	container: {
    flexDirection: 'row',
    paddingTop: 5,
    width: screenWidth,
    height: 40,
    justifyContent: 'space-between',
    backgroundColor: '#444',
  },
  bar__left: {
    paddingLeft: 10,
    paddingTop: 7
  },
  bar__title: {
    paddingTop: 7
  },
  bar__right: {
    paddingRight: 10
  }
})
:StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 5,
    width: screenWidth,
    height: 40,
    justifyContent: 'space-between',
    backgroundColor: '#444',
  },
  bar__left: {
    paddingLeft: 10,
    paddingTop: 7
  },
  bar__title: {
    paddingTop: 3
  },
  bar__right: {
    paddingRight: 10
  }
});