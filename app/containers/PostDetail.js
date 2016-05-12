import React, {
  ScrollView,
  Image,
  View,
  Text,
} from 'react-native';
import CoverCard from '../components/CoverCard';
import { connect } from 'react-redux';
import Dimensions from 'Dimensions';
const StyleSheet = require('../utils/F8StyleSheet');
const windowSize = Dimensions.get('window');
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginTop: 5,
    marginBottom: 5,
    fontWeight: '500',
  },
  infoText: {
    flex: 1,
    padding: 2,
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
    textShadowColor: '#444',
    textShadowOffset: { width: 1, height: 1 },
  },
  placeText: {
    fontSize: 14,
    paddingTop: 5,
    paddingBottom: 10,
  },
  infoContainer: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: 'row',
  },
  wrapper: {
    flex: 1,
    marginBottom: 50,
    ios: {
      marginTop: 65,
    },
    android: {
      marginTop: 55,
    },
  },
  scrollFrame: {
    flex: 1,
    flexDirection: 'column',
  },
  scrollContainer: {
    flex: 1,
    margin: 15,
    backgroundColor: 'rgb(246, 246, 246)',
  },
});


function PostDetail(props) {
  function status() {
    let cover;
    if (props.status !== 'null') {
      cover = (
        <CoverCard
          title={props.status}
          height={windowSize.height * 0.4}
          textStyle={{
            width: windowSize.width,
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fontSize: 20,
            textAlign: 'center',
            color: '#fff',
          }}
          img={{ uri: props.pic }} style={styles.coverContainer}
        />
      );
    } else {
      cover = (
        <CoverCard
          height={windowSize.height * 0.4}
          img={{ uri: props.pic }} style={styles.coverContainer}
        />
      );
    }
    return cover;
  }
  function info() {
    let infos = [];
    if (props.level) {
      let star = '';
      for (let i = 0; i < props.level; i++) {
        star += '★';
      }
      infos.push(<Text style={styles.infoText} key={'level'}>難易度：{star}</Text>);
    }
    if (props.detail_02) {
      infos.push(
        <Text
          style={styles.infoText}
          key={'detail_02'}
        >
          {props.detail_02}
        </Text>
      );
    }
    return infos;
  }
  function map() {
    let mapImg;
    if (props.map != 'null') {
      mapImg = (
        <View style={{ flex: 1, marginBottom: 20 }}>
          <Image
            source={{ uri: props.map }}
            style={{
              flex: 1,
              padding: 20,
              height: 500,
            }}
          />
      </View>
      );
    }
    return mapImg;
  }
  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.scrollFrame}>
        {status()}
        <View style={{ backgroundColor: 'rgb(246, 246, 246)' }}>
          <View index={0} style={styles.scrollContainer}>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={styles.title}>
                {props.title}
              </Text>
              <Text style={styles.placeText}>
                {props.place}
              </Text>
            </View>
            <Text style={{ fontSize: 14, marginBottom: 20, lineHeight: 25 }}>
               {props.description_01}
            </Text>
            {map()}
            <Text style={{ fontSize: 14, marginBottom: 20, lineHeight: 25 }}>
                {props.description_02}
            </Text>
          </View>
        </View>
        <View style={{ position: 'absolute', top: 10, right: 10 }}>
          {info()}
        </View>
      </ScrollView>
    </View>
  );
}

PostDetail.propTypes = {
  id: React.PropTypes.number,
  title: React.PropTypes.string,
  pic: React.PropTypes.string,
  detail_01: React.PropTypes.string,
  detail_02: React.PropTypes.string,
  detail_03: React.PropTypes.string,
  detail_04: React.PropTypes.string,
  description_01: React.PropTypes.string,
  description_02: React.PropTypes.string,
  status: React.PropTypes.string,
  recommend: React.PropTypes.string,
  level: React.PropTypes.number,
  place: React.PropTypes.string,
  lat: React.PropTypes.number,
  lon: React.PropTypes.number,
  map: React.PropTypes.string,
  url: React.PropTypes.string,
};

PostDetail.defaultProps = {};

function _injectPropsFromStore(state) {
  return {};
}

const _injectPropsFormActions = {};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(PostDetail);
