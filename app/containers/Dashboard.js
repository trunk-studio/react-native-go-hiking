import React, {
  Component,
  Dimensions,
  View,
  StatusBar,
  Text,
} from 'react-native';
import CoverCard from '../components/CoverCard';
import NewsBoard from '../components/NewsBoard';
import activityData from '../src/activity.json';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { requestNews } from '../actions/SearchActions';
import { requestToday } from '../actions/DateActions';
import { requestWeather } from '../actions/WeatherActions';
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
  icon: {
    lineHeight: 15,
    fontSize: 20,
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
  render() {
    function onListItemPress(detail) {
      Actions.newsDetail({
        newsTitle: detail.title,
        newsContent: detail.content,
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
        <View>
          <NewsBoard boardTitle={'近期活動'} listData={activityListData}
            itemCount={3} onItemPress={onListItemPress}
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
  };
}

const _injectPropsFormActions = {
  requestNews,
  requestToday,
  requestSetLocation,
  requestWeather,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(Dashboard);
