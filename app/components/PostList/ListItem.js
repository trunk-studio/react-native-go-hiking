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
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
const styles = StyleSheet.create({
  commentContent: {
    flex: 1,
    padding: 10,
    paddingBottom: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontWeight: '700',
    color: 'rgb(198, 118, 69)',
    paddingBottom: 5,
    paddingLeft: 2,
    // paddingTop: 3 * PIXEL_RATIO,
    fontSize: 14,
  },
  commentBody: {
    flex: 0.6,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  imageContent: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentTextBlock: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 0,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    ios: {
    },
    android: {
    },
  },
  commentText: {
    flex: 1,
    fontSize: 14,
  },
  distance: {
    flex: 1,
    flexDirection: 'row',
    padding: 2,
    fontSize: 12,
    color: '#666',
  },
  infoText: {
    flex: 1,
    flexDirection: 'row',
    padding: 2,
    fontSize: 12,
    color: '#666',
  },
  itemImg: {
    borderRadius: 3,
    width: 100,
    height: 80,
  },
  rightBlock: {
    flex: 1,
    paddingRight: 2,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tag: {
    position: 'absolute',
    right: 10,
    bottom: 18,
    padding: 5,
    backgroundColor: 'rgb(19, 150, 46)',
    borderRadius: 5,
    alignItems: 'center',
  },
  tagText: {
    fontSize: 12,
    color: 'white',
  },
  favoriteIcon: {
    margin: 0,
  },
  nearbyContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
      data = (
        <View style={styles.nearbyContainer}>
          <MaterialIcon
            name="near-me"
            size={12}
            color={'#000'}
            style={[styles.favoriteIcon]}
          /><Text style={styles.distance}>{formatDistance(props.distance)}</Text>
        </View>
      );
    }
    return data;
  }
  return (
    <View style={props.bakColor}>
      <TouchableOpacity underlayColor={"#f3f3f3"} onPress={onItemPress} >
        <View style={styles.commentContent}>
          <View style={styles.imageContent}>
            <Image source={{ uri: props.img }} style={styles.itemImg} />
          </View>
          <View style={styles.commentBody}>
            <Text style={styles.title} numberOfLines={2} >
              {props.title}
            </Text>
            {info()}
          </View>
          {nearby()}
          {
            (props.status !== 'null') ?
              <View style={ [styles.tag, { backgroundColor: props.tagColor }] }>
                <Text style={styles.tagText}>
                  {props.status}
                </Text>
              </View>
            : null
          }
        </View>
        {
          (!!props.description) ?
            <View style={styles.commentTextBlock}>
              <Text style={styles.commentText} numberOfLines={3}>
                {props.description}
              </Text>
            </View>
          : null
        }
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
  tagColor: React.PropTypes.string,
};

PostListItem.defaultProps = {
  title: '',
  description: '',
  img: 'https://unsplash.it/200/300/?random',
  onItemPress: () => {},
  bakColor: { backgroundColor: 'rgba(255, 255, 255, 1)' },
  tagColor: 'rgba(0,0,0,0)',
};
