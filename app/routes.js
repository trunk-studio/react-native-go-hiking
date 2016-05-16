import React, { Navigator } from 'react-native';
import { connect } from 'react-redux';
import RNRF, {
  Route,
  Schema,
  TabBar,
} from 'react-native-router-flux';
const Router = connect()(RNRF.Router);

// View
import TabIcon from './components/TabIcon';
import About from './containers/About';
import Nearby from './containers/NearbyPostList'
import News from './containers/News';
import NewsDetail from './containers/NewsDetail';
import PostDetail from './containers/PostDetail';
import Dashboard from './containers/Dashboard';
import Category from './containers/Category';
import PostList from './containers/PostList';
import MyFavorites from './containers/MyFavorites';

export default function AppRoutes() {
  return (
    <Router name="root" leftTitle="Back">
      <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight} />
      <Schema name="tab" type="switch" icon={TabIcon} />
      <Route hideNavBar={1} name="tabbar">
        <Router
          footer={TabBar}
          tabBarStyle={{
            borderTopColor: 'rgba(83, 83, 82, 0.25)',
            borderTopWidth: 1,
            backgroundColor: 'white',
          }}
          navigationBarStyle={{
            borderColor: '#DDD',
          }}
        >
          <Route name="tabDashboard" schema="tab" title="首頁" iconName="home">
            <Router>
              <Route name="dashboard" hideNavBar component={Dashboard} title="首頁" initial />
              <Route name="newsDetail" hideNavBar={0} component={NewsDetail} title="活動資訊" />
            </Router>
          </Route>
          <Route name="tabMonth" schema="tab" title="步道導覽" iconName="map-signs">
            <Router>
              <Route name="postList" component={PostList} />
              <Route name="postDetail" component={PostDetail} />
              <Route name="category" component={Category} title="月份導覽" />
            </Router>
          </Route>
          <Route name="tabNearby" schema="tab" title="附近步道" iconName="tree">
            <Router>
              <Route name="nearby" component={Nearby} title="附近步道" />
            </Router>
          </Route>
          <Route name="tabNews" schema="tab" title="我的收藏" iconName="heart-o" >
            <Router>
              <Route name="myFavorites" component={MyFavorites} title="我的收藏" />
              <Route name="postDetail" component={PostDetail} />
            </Router>
          </Route>
        </Router>
      </Route>
    </Router>
  );
}
