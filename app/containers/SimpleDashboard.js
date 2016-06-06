import React, {
  Component,
  Dimensions,
  View,
  Linking,
  Text,
  Image,
  Alert,
  TouchableOpacity,
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
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

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
  rightsInfo: {
    position: 'absolute',
    top: 20,
    right: 20,
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
  onSearchHandle = () => {
    this.props.requestFilterArea(this.state.areaId);
    this.props.requestFilterType(this.state.typeId);
    Actions.tabList();
  };
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
  rightsInfoHandle = () => {
    const msg = 'ㄧ、台灣步道一指通(以下簡稱本程式)所有之內容，本程式擁有著作權，均受到中 ' +
    '華民國著作權法及國際著作權法律的保障。非經本程式同意，任何人均不得以任何方式重製、改作、' +
      '編輯等使用本網站內所有內容，如有侵害，本程式將依法訴追所有之民、刑事責任。本程式資訊內容受' +
      '著作權法保護者，除有合理使用情形外，應取得本程式之同意或授權後，方得利用；若涉及其他著作' +
      '權人之著作內容者，亦應取得該著作權人之同意或授權後，方得利用。' +
      '\n\n二、為報導、評論、教學、研究或其他正當目的，在合理範圍內，得引用本程式上之資訊；引' +
      '用時並請註明出處。其他合理使用情形，請參考著作權法第44條至第65條之規定。' +
      '\n\n三、為供網路使用者便利，任何網站連結至本程式網站，毋須經本程式同意。' +
      '\n\n四、本程式僅提供相關網站之連結，對利用人涉及該網站內容之使用行為，本程式不負責任。' +
      '\n\n五、本程式所提供相關連結網站之網頁或資料，均為被連結網站所提供，相關權利為該等網站' +
      '或合法權利人所有，本程式不擔保其正確性、即時性或完整性。';
    Alert.alert('服務條款', msg);
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
        <TouchableOpacity onPress={this.rightsInfoHandle} style={styles.rightsInfo}>
          <FontAwesomeIcon
            name="info-circle"
            size={25}
            color={'rgba(255, 255, 255, 0.5)'}
          />
        </TouchableOpacity>
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
