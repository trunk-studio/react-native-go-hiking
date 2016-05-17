import React, {
  Component,
  Dimensions,
  View,
  Linking,
} from 'react-native';
import InfoBar from '../components/InfoBar';
import CoverCard from '../components/CoverCard';
import NewsBoard from '../components/NewsBoard';
import Filter from '../components/Filter/FilterContainer';
import activityData from '../src/activity.json';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { requestNews, requestFilterArea, requestFilterType } from '../actions/SearchActions';
import { requestToday } from '../actions/DateActions';
import { requestWeather } from '../actions/WeatherActions';
// import { requestSetLocation } from '../actions/GeoActions';
import { Select, Option, OptionList, updatePosition } from 'react-native-dropdown';

const coverImg = {uri: 'https://pixabay.com/static/uploads/photo/2015/10/05/15/37/forest-972792_960_720.jpg'}; //require('../images/dashboard.jpg');
const StyleSheet = require('../utils/F8StyleSheet');
const windowSize = Dimensions.get('window');
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginBottom: 50,
    ios: {
      marginTop: 21,
    },
  },
  icon: {
    lineHeight: 15,
    fontSize: 20,
  },
});

export default class Dashboard extends Component {
  componentDidMount() {
    // this.props.requestNews();
    // this.props.requestToday();
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     this.props.requestSetLocation(position);
    //   },
    //   (error) => {},
    //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    // );
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
      <View style={styles.wrapper}>
        <CoverCard img={coverImg} title={'台灣步道1指通'} height={windowSize.height * 0.3} />
        {/*
        <InfoBar month={month} date={date} weekday={weekday} temp={temp} desc={desc}
          iconId={iconId} locationName={this.props.locationName}
        />
        */}
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
        <NewsBoard boardTitle={'近期活動'} listData={activityListData}
          itemCount={3} onItemPress={onListItemPress}
        />
      </View>
    );
  }
}

Dashboard.propTypes = {
  onListItemPress: React.PropTypes.func,
  requestNews: React.PropTypes.func,
  requestSearchPost: React.PropTypes.func,
  requestToday: React.PropTypes.func,
  // requestSetLocation: React.PropTypes.func,
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
  // requestSetLocation: null,
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
  // requestSetLocation,
  requestWeather,
  requestFilterArea,
  requestFilterType,
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(Dashboard);
