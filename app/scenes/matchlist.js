import React, { Component,PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
	StyleSheet,
	Text,
	Image,
	View,
	ListView,
	TouchableOpacity,
	Platform,
	Navigator,
	RefreshControl,
	Animated,
	Easing
} from 'react-native';

import * as MatchListActions from '../actions/matchlist';

import Icon from 'react-native-vector-icons/FontAwesome';
import Style from '../styles/style.js';
import NavigatorBar from '../components/NavigatorBar';
import MatchDetail from '../scenes/matchdetail';

var heroBaseUrl = 'http://oalqimdk5.bkt.clouddn.com/dota/heroes/';

class MatchList extends Component{
	constructor(props) {
	  super(props);
	  this.state = {
	  	match_id: 0,
	  	dataSource: new ListView.DataSource({rowHasChanged: (r1,r2)=>r1!==r2}),
	  	rotation: new Animated.Value(0)
	  };
	  this.renderFooter = this.renderFooter.bind(this);
	}
	componentDidMount() {
		this.props.getMatches();
		this.startAnimation();
	}
	startAnimation() {
    this.state.rotation.setValue(0);
    Animated.timing(this.state.rotation,{
      toValue: 1,
      duration: 1000,
      easing: Easing.linear
    }).start(()=>this.startAnimation());
  }
	renderFooter() {
    return (
      <View style={Style.scroll_footer}>
        <Animated.View style={[Style.scroll_footer_icon,{
            transform: [{
              rotateZ: this.state.rotation.interpolate({
                inputRange: [0,1],
                outputRange: ['0deg','360deg']
              })
            }]
          }]}>
          <Icon name='spinner' size={14} color='#666' />
        </Animated.View>
        <Text style={Style.scroll_footer_text}>
          加载中
        </Text>
      </View>
    );
  }
	_renderRow(data:Object) {
		return (
			<TouchableOpacity
				style={{marginTop:5}}
				onPress={()=>{
					this.props.setMatchid(data.match_id);
					Actions.matchdetail();
				}}>
				<View style={Style.box_row}>
					<Image
						style={{width:40,height:40,borderRadius:20,marginLeft:10,marginRight:10}}
						source={{uri: heroBaseUrl+data.hero.image_url1}}/>
					<View>
						<Text style={{lineHeight:20}}>比赛编号：{data.match_id}</Text>
						<Text>开始时间：{timestamp(data.start_time)}</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	}
	render() {
		var { getMatches,refreshMatches,moreMatches,matches } = this.props;
		return(
			<View style={Style.container}>
				<NavigatorBar
					left={<Icon name='angle-left' size={32} style={{marginTop:-8}} color='#fc3' />}
					leftClick={()=>{Actions.pop()}}
					title={<Text style={Style.navTitle_text}>近期比赛</Text>}/>
				<ListView
					dataSource={this.state.dataSource.cloneWithRows(matches)}
					renderRow={this._renderRow.bind(this)}
					renderFooter={this.renderFooter}
        	onEndReached={()=>moreMatches()}
					onEndReachedThreshold={0}
        	enableEmptySections={true}
					refreshControl={<RefreshControl
          	onRefresh={()=>refreshMatches()}
          	refreshing={false} />} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
});

function timestamp(stamp){
	var unixTimestamp = new Date(stamp * 1000);
	return unixTimestamp.toLocaleString();
}

function mapStateToProps(state){
	return {
		...state.matchlist
	}
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(MatchListActions,dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(MatchList);
