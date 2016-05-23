import React, {
  Component,
  Platform,
  Alert,
  Linking,
 } from 'react-native';
import { connect } from 'react-redux';
import RNRF, {
  Scene,
  Reducer,
  Router,
} from 'react-native-router-flux';
// const Router = connect()(RNRF.Router);

// View
import WebViewPage from './containers/WebViewPage';
import TabIcon from './components/TabIcon';
import BackBtn from './components/BackBtn';
import NavigationDrawer from './components/NavigationDrawer';
import Nearby from './containers/NearbyPostList'
import NewsDetail from './containers/NewsDetail';
import PostDetail from './containers/PostDetail';
import Dashboard from './containers/Dashboard';
import SimpleDashboard from './containers/SimpleDashboard';
import Category from './containers/Category';
import PostList from './containers/PostList';
import MyFavorites from './containers/MyFavorites';
import Icon from 'react-native-vector-icons/FontAwesome';
import ReactNativeAutoUpdater from 'react-native-auto-updater';
const StyleSheet = require('./utils/F8StyleSheet');
const styles = StyleSheet.create({
  leftButtonContainer: {
    paddingLeft: 15,
    paddingRight: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    paddingRight: 6,
    marginTop: 2,
  },
  navBackTitle: {
    marginTop: 2,
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  titleStyle: {
    color: 'white',
    android: {
      top: 10,
    },
  },
  navigationBarStyle: {
    backgroundColor: '#709D2A',
  },
});

export default class AppRoutes extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    let url;
    if (Platform.OS === 'ios') {
      url = 'https://s3-ap-northeast-1.amazonaws.com/s3.trunksys.com/hiking/qa/packager/metadata.json';
    } else {
      url = 'https://s3-ap-northeast-1.amazonaws.com/s3.trunksys.com/hiking/qa/packager/metadata.android.json';
    }
    fetch(url)
    .then((response) => response.text())
    .then((responseText) => {
      const onlineMetadata = JSON.parse(responseText);
      const onlineVersion = onlineMetadata.version.split('.');
      const nowVersion = ReactNativeAutoUpdater.jsCodeVersion().split('.');
      if (onlineVersion[0] !== nowVersion[0]) {
        Alert.alert('版本過舊', '請至 App Store 更新', [
          { text: '立即更新', onPress: () => {
            let downloadUrl;
            if (Platform.OS === 'ios') {
              downloadUrl = 'https://itunes.apple.com/us/app/tai-wan-bu-dao1zhi-tong/id1113267807?l=zh&ls=1&mt=8';
            } else {
              downloadUrl = 'https://play.google.com/store/apps/details?id=com.trunksys.gohiking';
            }
            Linking.canOpenURL(downloadUrl).then(supported => {
              if (supported) {
                Linking.openURL(downloadUrl);
              }
            });
          } },
          { text: '稍後', onPress: () => {} },
        ]);
      } else if (onlineVersion[1] !== nowVersion[1] || onlineVersion[2] !== nowVersion[2]) {
        if (Platform.OS === 'ios') {
          Alert.alert('有新版本喔', '重新開啟 App 更新');
        }
      }
    })
    .catch((error) => {
      console.warn(error);
    });
  }

  getSceneStyle = (props) => {
    return {
      flex: 1,
      marginTop: props.hideNavBar ? 0 : 64,
      marginBottom: props.hideTabBar ? 0 : 49.5,
      backgroundColor: '#fff',
      shadowColor: null,
      shadowOffset: null,
      shadowOpacity: null,
      shadowRadius: null,
    };
  }

  reducerCreate = (params) => {
    const defaultReducer = Reducer(params);
    return (state, action) => defaultReducer(state, action);
  }



  render() {

    const tabStyle = {
      icon: TabIcon,
      navigationBarStyle: styles.navigationBarStyle,
      titleStyle: styles.titleStyle,
    };

    let autoDashboard = Dashboard;
    if (Platform.OS === 'android') {
      if (Platform.Version < 21) {
        autoDashboard = SimpleDashboard;
      }
    }

    return (
      <Router key="root" createReducer={this.reducerCreate} getSceneStyle={this.getSceneStyle}>
        <Scene key="tabbar" component={NavigationDrawer}>
          <Scene hideNavBar key="main" tabs >
            <Scene key="tabDashboard" title="首頁" iconName="home" {...tabStyle}>
                <Scene key="dashboard" hideNavBar component={autoDashboard} title="首頁" initial />
                <Scene key="newsDetail" hideNavBar={0} component={NewsDetail} title="活動資訊" />
            </Scene>
            <Scene key="tabList" title="步道導覽" iconName="map-signs" {...tabStyle}>
                <Scene key="postList" component={PostList} title="步道導覽" />
                <Scene key="postDetail"
                  component={PostDetail}
                  renderBackButton={() => <BackBtn /> }
                />
                <Scene key="category" component={Category} title="月份導覽" />
            </Scene>
            <Scene key="tabNearby" title="附近步道" iconName="tree" {...tabStyle}>
                <Scene key="nearby" component={Nearby} title="附近步道" />
                <Scene key="nearPostDetail"
                  component={PostDetail}
                  renderBackButton={() => <BackBtn /> }
                />
            </Scene>
            <Scene key="tabNews" title="我的收藏" iconName="heart" {...tabStyle}>
                <Scene key="myFavorites" component={MyFavorites} title="我的收藏" />
                <Scene key="favPostDetail"
                  component={PostDetail}
                  renderBackButton={() => <BackBtn /> }
                />
            </Scene>
          </Scene>
        </Scene>
        <Scene key="webViewPage" hideTabBar component={WebViewPage}
          navigationBarStyle={styles.navigationBarStyle}
          titleStyle={styles.titleStyle}
          renderBackButton={() => <BackBtn /> }
        />
      </Router>
    );
  }
}
