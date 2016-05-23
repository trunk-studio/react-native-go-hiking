import React, {
  Navigator,
  TouchableOpacity,
  Text,
  Component,
  Dimensions,
  Platform,
  Alert,
  Linking,
 } from 'react-native';
import { connect } from 'react-redux';
import RNRF, {
  Route,
  Schema,
  TabBar,
  Actions,
} from 'react-native-router-flux';
const Router = connect()(RNRF.Router);

// View
import TabIcon from './components/TabIcon';
import Nearby from './containers/NearbyPostList'
import NewsDetail from './containers/NewsDetail';
import PostDetail from './containers/PostDetail';
import Dashboard from './containers/Dashboard';
import Category from './containers/Category';
import PostList from './containers/PostList';
import MyFavorites from './containers/MyFavorites';
import Icon from 'react-native-vector-icons/FontAwesome';
import ReactNativeAutoUpdater from 'react-native-auto-updater';

const windowSize = Dimensions.get('window');
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
      flex: 1,
      textAlign: 'center',
      textAlignVertical: 'center',
      paddingTop: 10,
      marginLeft: ~~(windowSize.width / 5),
    },
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

  render() {
    return (
      <Router name="root">
        <Schema name="default"
          sceneConfig={Navigator.SceneConfigs.FloatFromRight}
        />
        <Schema name="back"
          sceneConfig={Navigator.SceneConfigs.FloatFromRight}
          renderLeftButton={() => {
            return (
              <TouchableOpacity
                style={styles.leftButtonContainer}
                onPress={Actions.pop}
              >
                <Icon
                  name="angle-left"
                  size={24}
                  color={'#FFF'}
                  style={styles.menuIcon}
                />
                <Text style={styles.navBackTitle}></Text>
              </TouchableOpacity>
            );}}
        />
        <Schema name="tab" type="switch" icon={TabIcon} />
        <Route hideNavBar name="tabbar">
          <Router
            footer={TabBar}
            tabBarStyle={{
              borderTopColor: 'rgba(83, 83, 82, 0.25)',
              borderTopWidth: 1,
              backgroundColor: 'white',
            }}
            navigationBarStyle={{
              backgroundColor: '#709D2A',
              borderColor: '#DDD',
              marginTop: 0,
              paddingTop: 0,
            }}
            titleStyle={styles.titleStyle}
          >
            <Route name="tabDashboard" schema="tab" title="首頁" iconName="home">
              <Router>
                <Route name="dashboard" hideNavBar component={Dashboard} title="首頁" initial />
                <Route name="newsDetail" hideNavBar={0} component={NewsDetail} title="活動資訊" />
              </Router>
            </Route>
            <Route name="tabList" schema="tab" title="步道導覽" iconName="map-signs">
              <Router>
                <Route name="postList" component={PostList} />
                <Route name="postDetail" schema="back" component={PostDetail} />
                <Route name="category" component={Category} title="月份導覽" />
              </Router>
            </Route>
            <Route name="tabNearby" schema="tab" title="附近步道" iconName="tree">
              <Router>
                <Route name="nearby" component={Nearby} title="附近步道" />
                <Route name="postDetail" schema="back" component={PostDetail} />
              </Router>
            </Route>
            <Route name="tabNews" schema="tab" title="我的收藏" iconName="heart" >
              <Router>
                <Route name="myFavorites" component={MyFavorites} title="我的收藏" />
                <Route name="postDetail" schema="back" component={PostDetail} />
              </Router>
            </Route>
          </Router>
        </Route>
      </Router>
    );
  }
}
