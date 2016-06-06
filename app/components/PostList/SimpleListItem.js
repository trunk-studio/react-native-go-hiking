import React, {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
const StyleSheet = require('../../utils/F8StyleSheet');
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
    fontSize: 14,
  },
  imageContent: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImg: {
    borderRadius: 3,
    width: 100,
    height: 80,
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
});

export default function PostListItem(props) {
  function onItemPress() {
    props.onItemPress(props.id);
  }
  return (
    <View style={props.bakColor}>
      <TouchableOpacity underlayColor={"#f3f3f3"} onPress={onItemPress} >
        <View style={styles.commentContent}>
          <View style={styles.imageContent}>
            <Image source={{ uri: props.img }} style={styles.itemImg} />
          </View>
          <Text allowFontScaling={false} style={styles.title} numberOfLines={2} >
            {props.title}
          </Text>
          {
            (props.status !== 'null') ?
              <View style={ [styles.tag, { backgroundColor: props.tagColor }] }>
                <Text allowFontScaling={false} style={styles.tagText}>
                  {props.status}
                </Text>
              </View>
            : null
          }
        </View>
      </TouchableOpacity>
    </View>
  );
}

PostListItem.propTypes = {
  id: React.PropTypes.number.isRequired,
  title: React.PropTypes.string,
  img: React.PropTypes.string,
  onItemPress: React.PropTypes.func,
  bakColor: React.PropTypes.object,
  status: React.PropTypes.string,
  tagColor: React.PropTypes.string,
};

PostListItem.defaultProps = {
  title: '',
  img: 'https://unsplash.it/200/300/?random',
  onItemPress: () => {},
  bakColor: { backgroundColor: 'rgba(255, 255, 255, 1)' },
  tagColor: 'rgba(0,0,0,0)',
};
