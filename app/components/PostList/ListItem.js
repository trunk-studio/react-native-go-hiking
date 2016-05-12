import React, {
  StyleSheet,
  PixelRatio,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
const PIXEL_RATIO = PixelRatio.get();
const styles = StyleSheet.create({
  commentContent: {
    height: 42 * PIXEL_RATIO,
    paddingTop: 3.5 * PIXEL_RATIO,
    paddingBottom: 3.5 * PIXEL_RATIO,
    marginLeft: 13 * PIXEL_RATIO,
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  title: {
    fontWeight: '700',
    color: 'rgb(198, 118, 69)',
    padding: 2 * PIXEL_RATIO,
    paddingTop: 5.5 * PIXEL_RATIO,
    fontSize: 12,
  },
  commentBody: {
    flex: 1,
    marginLeft: 5 * PIXEL_RATIO,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  commentText: {
    flex: 1,
    flexDirection: 'row',
    padding: 2 * PIXEL_RATIO,
    paddingTop: 3 * PIXEL_RATIO,
    fontWeight: '500',
  },
  itemImg: {
    borderRadius: 3,
    width: 42 * PIXEL_RATIO,
    height: 35 * PIXEL_RATIO,
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
  return (
    <View style={props.bakColor}>
      <TouchableOpacity underlayColor={"#f3f3f3"} onPress={onItemPress}>
        <View>
          <View style={styles.commentContent}>
            <Image source={{ uri: props.img }} style={styles.itemImg} />
            <View style={styles.commentBody}>
              <Text style={styles.title} numberOfLines={2} >
                {props.title}
              </Text>
              <Text style={styles.commentText}>
                {props.description}
              </Text>
            </View>
          </View>
        </View>
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
};

PostListItem.defaultProps = {
  title: '',
  description: '',
  img: 'https://unsplash.it/200/300/?random',
  onItemPress: () => {},
  bakColor: { backgroundColor: 'rgba(255, 255, 255, 1)' },
};
