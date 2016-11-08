import React,{ Component } from 'react';
import {
	View,
	Text
} from 'react-native';
import { Router,Scene,TabBar,ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux';

import Drawer from './components/Drawer';
import MatchList from './scenes/matchlist';
import MatchDetail from './scenes/matchdetail';
import Douyu from './components/Douyu';
import Zhanqi from './components/Zhanqi';
import Huomao from './components/Huomao';
import Panda from './components/Panda';
import LivePlayer from './scenes/liveplayer';
import VideoPlayer from './scenes/videoplayer';
import Account from './modals/Account';
import Search from './modals/Search';
import Error from './containers/error';
import SignIn from './modals/SignIn';
import SignUp from './modals/SignUp';

import TabIconUser from './components/TabIconUser';
import TabIconLive from './components/TabIconLive';
import TabIconData from './components/TabIconData';
import TabIconDidi from './components/TabIconDidi';
import User from './containers/user';
import Live from './containers/live';
import Data from './containers/data';
import Didi from './containers/didi';

import Style from './styles/style';

const RouterWithRedux = connect()(Router);

class Navi extends Component{
	render() {
		return(
			<RouterWithRedux>
				<Scene key="root" hideNavBar={true}>
					<Scene key='drawer' component={Drawer} open={false}>
						<Scene key='main'>
							<Scene key='tabbar' tabs={true} tabBarStyle={Style.tabBarStyle}>
								<Scene key='user' title='user' component={User} icon={TabIconUser} hideNavBar={true} />
								<Scene key='live' title='live' component={Live} icon={TabIconLive} hideNavBar={true} />
								<Scene key='data' title='data' component={Data} icon={TabIconData} hideNavBar={true} />
								<Scene key='didi' title='didi' component={Didi} icon={TabIconDidi} hideNavBar={true} />
							</Scene>
							<Scene key='matchlist' component={MatchList} title='Match List' hideNavBar={true} />
							<Scene key='matchdetail' component={MatchDetail} title='Match Detail' hideNavBar={true} />
							<Scene key='douyu' component={Douyu} title='Douyu' hideNavBar={true} />
							<Scene key='zhanqi' component={Zhanqi} title='Zhanqi' hideNavBar={true} />
							<Scene key='huomao' component={Huomao} title='Huomao' hideNavBar={true} />
							<Scene key='panda' component={Panda} title='Panda' hideNavBar={true} />
							<Scene key='liveplayer' component={LivePlayer} title='Live Player' hideNavBar={true} />
							<Scene key='videoplayer' component={VideoPlayer} title='Video Player' hideNavBar={true} />
						</Scene>
					</Scene>
					<Scene key='signin' component={SignIn} direction='vertical' />
					<Scene key='signup' component={SignUp} direction='vertical' />
					<Scene key='search' component={Search} direction='vertical' />
					<Scene key='account' component={Account} direction='vertical' />
					<scene key='error' component={Error} />
				</Scene>
			</RouterWithRedux>
		)
	}
}

export default connect()(Navi)