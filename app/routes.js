import React, {
  Navigator,
  TouchableOpacity,
  Text,
  StyleSheet,
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
});

export default function AppRoutes() {
  return (
    <Router name="root">
      <Schema name="default"
        sceneConfig={Navigator.SceneConfigs.FloatFromRight}
      />
      <Schema name="back"
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
            <Text style={styles.navBackTitle}> Back </Text>
            </TouchableOpacity>
        );}}
        renderTitle={(childState, index) => {
          console.log("!!!!!!!!!!!!", childState, index, Actions);
          return (
            <TouchableOpacity
              style={styles.leftButtonContainer}
              onPress={Actions.pop}
            >
            <Text style={styles.navBackTitle}> {childState.props.title} </Text>
            </TouchableOpacity>
          );
        }}
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
          titleStyle={{
            color: 'white',
          }}
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
          <Route name="tabNews" schema="tab" title="我的收藏" iconName="heart-o" >
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
