import React, {
  Component,
  Dimensions,
  View,
  Text,
  Image,
} from 'react-native';
import NewsBoard from '../components/NewsBoard';
import activityData from '../src/activity.json';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { requestNews, requestFilterArea, requestFilterType } from '../actions/SearchActions';
import { requestToday } from '../actions/DateActions';
import { requestWeather } from '../actions/WeatherActions';
import ParallaxView from 'react-native-parallax-view';
import ReactNativeAutoUpdater from 'react-native-auto-updater';
import { requestSetLocation } from '../actions/GeoActions';
import DashboardFilter from './DashboardFilter';

// const coverImg = require('../images/dashboard.png');
const coverImg = { uri: 'https://s3-ap-northeast-1.amazonaws.com/s3.trunksys.com/hiking/prod/images/dashboard.jpg' };
const StyleSheet = require('../utils/F8StyleSheet');
const windowSize = Dimensions.get('window');
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginBottom: 50,
    ios: {
      // marginTop: 21,
    },
  },
  searchIcon: {
    color: '#fff',
    paddingRight: 10,
    fontSize: 16,
  },
  icon: {
    lineHeight: 15,
    fontSize: 20,
  },
  searchContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  searchBtn: {
    margin: 10,
    padding: 10,
    borderRadius: 3,
    backgroundColor: 'rgb(79, 164, 89)',
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  searchText: {
    color: '#fff',
    fontSize: 16,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    paddingTop: 180,
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    ios: {
      shadowOffset: {
        width: 3,
        height: 3,
      },
      shadowColor: 'black',
      shadowOpacity: 1.0,
    },
  },
  mainContent: {
    ios: {
      backgroundColor: '#FFFFFF',
      marginBottom: 50,
      position: 'relative',
      top: -25,
    },
    android: {
      backgroundColor: '#FFFFFF',
    },
  },
  coverBottom: {
    ios: {
      height: 60,
      position: 'relative',
      top: -30,
    },
    android: {
      marginBottom: 55,
      /*
      width: windowSize.width,
      height: 5,
      backgroundColor: 'rgb(79, 164, 89)',
      marginBottom: 10,
      */
    },
  },
  coverBottomWrapper: {
    ios: {

    },
    android: {
      width: windowSize.width,
      height: 5,
      backgroundColor: 'rgb(79, 164, 89)',
      marginBottom: 10,
    },
  },
  versionBlock: {
    position: 'absolute',
    bottom: 15,
    right: 5,
    padding: 2,
  },
  imgSrcText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#555',
    fontStyle: 'italic',
    ios: {
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowColor: 'black',
      shadowOpacity: 1.0,
    },
  },
});

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      areaId: 0,
      typeId: 0,
    };
  }
  componentWillMount() {
    // this.props.requestNews();
    // this.props.requestToday();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.props.requestSetLocation(position);
          this.setState({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          // navigator.geolocation.stopObserving();
        },
        (error) => {
          navigator.geolocation.stopObserving();
          // Alert.alert(error.toString());
        },
        { enableHighAccuracy: false, timeout: 20000, maximumAge: 60000 },
      );
    }
  }
  componentWillReceiveProps(nextProps) {
    const { countryName, locationName } = nextProps;
    if (locationName !== undefined && locationName !== this.props.locationName) {
      this.props.requestWeather({ name: locationName, country: countryName });
    }
  }
  areaOnChange = (id) => {
    // this.props.requestFilterArea(id);
    this.setState({
      areaId: id,
    });
  };
  typeOnChange = (id) => {
    // this.props.requestFilterType(id);
    this.setState({
      typeId: id,
    });
  };
  onSearchHandle = () => {
    this.props.requestFilterArea(this.state.areaId);
    this.props.requestFilterType(this.state.typeId);
    Actions.tabList();
  };
  render() {
    function onListItemPress(detail) {
      let url = activityData.list[detail.index].url;

      url = url.replace(/ct.asp/, 'fp.asp');
      let title = activityData.list[detail.index].title;
      if (title.length > 10) {
        title = title.slice(0, 9) + '...';
      }
      Actions.webViewPage({
        url,
        title,
      });
    }
    const { listData, month, date, weekday, temp, desc, iconId } = this.props;
    let activityListData = [];
    for (const item of activityData.list) {
      activityListData.push({
        title: item.title,
        content: item.description,
      });
    }
    return (
      <ParallaxView
        backgroundSource={coverImg}
        windowHeight={300}
        header={(
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
                台灣步道一指通
            </Text>
            <View style={styles.versionBlock}>
              <Text style={styles.imgSrcText}>
                v {ReactNativeAutoUpdater.jsCodeVersion()}
              </Text>
            </View>
          </View>
        )}
      >
        <View style={styles.coverBottomWrapper} />
        <Image
          source={{ uri: 'https://s3-ap-northeast-1.amazonaws.com/s3.trunksys.com/hiking/prod/images/cover-bottom.png' }}
          resizeMode="contain"
          style={ styles.coverBottom }
        />
        <View style={styles.dashboardItem}>
          <DashboardFilter />
          <NewsBoard
            boardTitle={'近期活動'}
            listData={activityListData}
            itemCount={30}
            onItemPress={onListItemPress}
          />
        </View>
      </ParallaxView>
    );
  }
}

Dashboard.propTypes = {
  onListItemPress: React.PropTypes.func,
  requestNews: React.PropTypes.func,
  requestSearchPost: React.PropTypes.func,
  requestToday: React.PropTypes.func,
  requestSetLocation: React.PropTypes.func,
  requestWeather: React.PropTypes.func,
  uri: React.PropTypes.string,
  month: React.PropTypes.number,
  date: React.PropTypes.number,
  weekday: React.PropTypes.string,
  desc: React.PropTypes.string,
  iconId: React.PropTypes.string,
  listData: React.PropTypes.array,
  temp: React.PropTypes.number,
  countryName: React.PropTypes.string,
  locationName: React.PropTypes.string,
  requestFilterType: React.PropTypes.func,
  requestFilterArea: React.PropTypes.func,
  typeIndex: React.PropTypes.number,
  areaIndex: React.PropTypes.number,
};

Dashboard.defaultProps = {
  onListItemPress: null,
  requestNews: null,
  requestSearchPost: null,
  requestToday: null,
  requestSetLocation: null,
  requestWeather: null,
  month: 1,
  date: 1,
  requestFilterType: null,
  requestFilterArea: null,
};

function _injectPropsFromStore(state) {
  return {
    listData: state.search.newsList,
    month: state.getToday.month,
    date: state.getToday.date,
    weekday: state.getToday.weekday,
    desc: state.weather.desc,
    iconId: state.weather.iconId,
    countryName: state.geo.countryName,
    locationName: state.geo.locationName,
    temp: state.weather.temp,
    typeIndex: state.search.typeIndex,
    areaIndex: state.search.areaIndex,
  };
}

const _injectPropsFormActions = {
  requestNews,
  requestToday,
  requestSetLocation,
  requestWeather,
  requestFilterArea,
  requestFilterType,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(Dashboard);
