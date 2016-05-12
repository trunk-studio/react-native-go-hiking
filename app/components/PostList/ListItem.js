import React, {
  PixelRatio,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
const PIXEL_RATIO = PixelRatio.get();
const StyleSheet = require('../../utils/F8StyleSheet');
import { formatDistance } from '../../utils/place';
const styles = StyleSheet.create({
  commentContent: {
    flex: 1,
    paddingTop: 10 * PIXEL_RATIO,
    paddingBottom: 3.5 * PIXEL_RATIO,
    marginLeft: 13 * PIXEL_RATIO,
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  title: {
    flex: 1,
    fontWeight: '700',
    color: 'rgb(198, 118, 69)',
    padding: 2 * PIXEL_RATIO,
    // paddingTop: 3 * PIXEL_RATIO,
    fontSize: 14,
  },
  commentBody: {
    flex: 1,
    marginLeft: 5 * PIXEL_RATIO,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  imageContent: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentText: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 14,
    ios: {
      paddingLeft: 30,
      paddingRight: 30,
      paddingTop: 3,
      paddingBottom: 20,
    },
    android: {
      marginLeft: 30,
      marginRight: 30,
      paddingTop: 3,
      paddingBottom: 20,
    },
  },
  infoText: {
    flex: 1,
    flexDirection: 'row',
    padding: 2,
    fontSize: 12,
  },
  itemImg: {
    borderRadius: 3,
    width: 84,
    height: 70,
  },
  rightBlock: {
    flex: 1,
    paddingRight: 2,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function PostListItem(props) {
  function onItemPress() {
    props.onItemPress(props.id);
  }
  function info() {
    let infos = [];
    if (props.place) infos.push(<Text style={styles.infoText} key={'place'}>{props.place}</Text>);
    if (props.level) {
      let star = '';
      for (let i = 0; i < props.level; i++) {
        star += '★';
      }
      infos.push(<Text style={styles.infoText} key={'level'}>難易度：{star}</Text>);
    }
    if (props.detail_02 != 'null') infos.push(<Text style={styles.infoText} key={'detail_02'}>{props.detail_02}</Text>);
    return infos;
  }
  function nearby() {
    let data;
    if (props.distance) {
      data = <Text style={styles.infoText}>距離：{formatDistance(props.distance)}</Text>
    }
    return data;
  }
  return (
    <View style={props.bakColor}>
      <TouchableOpacity underlayColor={"#f3f3f3"} onPress={onItemPress}>
        <View style={styles.commentContent}>
          <View style={styles.imageContent}>
            <Image source={{ uri: props.img }} style={styles.itemImg} />
          </View>
          <View style={styles.commentBody}>
            <Text style={styles.title} numberOfLines={2} >
              {props.title}
            </Text>
            {nearby()}
            {info()}
          </View>
        </View>
        <Text style={styles.commentText} numberOfLines={3}>
          {props.description}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

PostListItem.propTypes = {
  id: React.PropTypes.number.isRequired,
  title: React.PropTypes.string,
  description: React.PropTypes.string,
  img: React.PropTypes.string,
  onItemPress: React.PropTypes.func,
  bakColor: React.PropTypes.object,
  rightText: React.PropTypes.string,
  rightTextStyle: React.PropTypes.object,
  notificationCount: React.PropTypes.number,
  status: React.PropTypes.string,
  level: React.PropTypes.number,
  detail_02: React.PropTypes.string,
  place: React.PropTypes.string,
  distance: React.PropTypes.number,
};

PostListItem.defaultProps = {
  title: '',
  description: '',
  img: 'https://unsplash.it/200/300/?random',
  onItemPress: () => {},
  bakColor: { backgroundColor: 'rgba(255, 255, 255, 1)' },
};
