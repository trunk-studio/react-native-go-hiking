import React, {
  Component,
  Dimensions,
  View,
  Linking,
  TouchableOpacity,
  StatusBar,
  Text,
} from 'react-native';
import CoverCard from '../components/CoverCard';
import NewsBoard from '../components/NewsBoard';
import Filter from '../components/Filter/FilterContainer';
import activityData from '../src/activity.json';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { requestNews, requestFilterArea, requestFilterType } from '../actions/SearchActions';
import { requestToday } from '../actions/DateActions';
import { requestWeather } from '../actions/WeatherActions';
import Icon from 'react-native-vector-icons/FontAwesome';
import ParallaxView from 'react-native-parallax-view';
import { requestSetLocation } from '../actions/GeoActions';

const coverImg = {uri: 'https://pixabay.com/static/uploads/photo/2015/10/05/15/37/forest-972792_960_720.jpg'}; //require('../images/dashboard.jpg');
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
  },
  searchBtn: {
    margin: 10,
    padding: 5,
    borderRadius: 3,
    backgroundColor: 'rgb(79, 164, 89)',
    width: 140,
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
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowColor: 'black',
    shadowOpacity: 1.0,
  },
});

export default class Dashboard extends Component {
  componentWillMount() {
    // this.props.requestNews();
    // this.props.requestToday();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.props.requestSetLocation(position);
        },
        (error) => {},
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {},
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
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
    this.props.requestFilterArea(id);
  };
  typeOnChange = (id) => {
    this.props.requestFilterType(id);
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
    const { listData, month, date, weekday, temp, desc, iconId } = this.props;
    let activityListData = [];
    for (const item of activityData.list) {
      activityListData.push({
        title: item.title,
        content: item.description,
      });
    }
    const area = [
      { title: '全部' },
      { title: '北部' },
      { title: '中部' },
      { title: '南部' },
      { title: '東部' },
    ];
    const type = [
      { title: '全部' },
      { title: '郊山' },
      { title: '中級山', width: 65 },
      { title: '百岳' },
    ];
    return (
      <ParallaxView
          backgroundSource={coverImg}
          windowHeight={200}
          header={(
            <View style={styles.header}>
              <Text style={styles.headerTitle}>
                  台灣步道 1 指通
              </Text>
            </View>
          )}
      >
        <StatusBar barStyle="light-content" />
        <Filter
          title={'區域'}
          dataList={area}
          active={this.props.areaIndex}
          onChange={this.areaOnChange}
        />
        <Filter
          title={'類型'}
          dataList={type}
          active={this.props.typeIndex}
          onChange={this.typeOnChange}
        />
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.searchBtn} onPress={Actions.tabList}>
            <Icon name={'search'} style={ styles.searchIcon } />
            <Text style={styles.searchText}>搜尋台灣步道</Text>
          </TouchableOpacity>
        </View>
        <NewsBoard boardTitle={'近期活動'} listData={activityListData}
          itemCount={30} onItemPress={onListItemPress}
        />
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
