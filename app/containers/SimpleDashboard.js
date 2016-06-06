import React, {
  Component,
  Dimensions,
  View,
  Linking,
  Text,
  Image,
} from 'react-native';
import activityData from '../src/activity.json';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { requestNews, requestFilterArea, requestFilterType } from '../actions/SearchActions';
import { requestToday } from '../actions/DateActions';
import { requestWeather } from '../actions/WeatherActions';
import ReactNativeAutoUpdater from 'react-native-auto-updater';
import { requestSetLocation } from '../actions/GeoActions';
import DashboardFilter from './DashboardFilter';
import NewsBoard from '../components/NewsBoard';
import NewsItem from '../components/NewsItem';

const coverImg = { uri: 'https://s3-ap-northeast-1.amazonaws.com/s3.trunksys.com/hiking/prod/images/dashboard.jpg' };
const StyleSheet = require('../utils/F8StyleSheet');
const windowSize = Dimensions.get('window');
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
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
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerTitle: {
    top: -100,
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  coverPhoto: {
    width: windowSize.width,
    height: 200,
    top: -20,
  },
  versionBlock: {
    position: 'absolute',
    top: -50,
    bottom: 15,
    right: 5,
    padding: 2,
  },
  imgSrcText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#555',
    fontStyle: 'italic',
  },
  dashboardItem: {
    top: 0,
    flex: 1,
    marginTop: -300,
    height: 150,
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
      // Actions.newsDetail({
      //   newsTitle: detail.title,
      //   newsContent: detail.content,
      // });
      const url = activityData.list[detail.index].url;
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url);
        }
      });
    }
    const activityListData = [];
    for (const item of activityData.list) {
      activityListData.push({
        title: item.title,
        content: item.description,
      });
    }
    const listContainer = [];
    const itemCount = 30;
    if (activityListData.length > 0) {
      activityListData.forEach((news, i) => {
        if (itemCount === 0 || i < itemCount) {
          listContainer.push(
            <NewsItem
              key={i}
              index={i}
              title={news.title}
              content={news.content}
              onItemPress={onListItemPress}
            />
          );
        }
      });
    }
    return (
      <View style={styles.wrapper}>
        <Image
          source={coverImg}
          resizeMode="cover"
          style={ styles.coverPhoto }
        />
        <View style={styles.header}>
          <Text allowFontScaling={false} style={styles.headerTitle}>
              台灣步道一指通
          </Text>
          <View style={styles.versionBlock}>
            <Text allowFontScaling={false} style={styles.imgSrcText}>
              v {ReactNativeAutoUpdater.jsCodeVersion()}
            </Text>
          </View>
        </View>
        <View style={styles.dashboardItem}>
          <DashboardFilter />
          <NewsBoard
            boardTitle={'近期活動'}
            listData={activityListData}
            itemCount={30}
            onItemPress={onListItemPress}
          />
        </View>
      </View>
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
