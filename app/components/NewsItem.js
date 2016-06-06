import React, {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  newsItem: {
    flex: 1,
    flexDirection: 'row',
    // borderBottomColor: '#410005',//'#333',
    // borderBottomWidth: 0.5,
    // borderTopColor: '#417500',//'#333',
    // borderTopWidth: 0.5,
  },
  newsConent: {
    flex: 10,
    paddingLeft: 20,
  },
  newsIcon: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
  },
  icon: {
    fontSize: 40,
    color: '#417505', //'#359ac0',
  },
  newsTitle: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 25,
    color: '#333',
    marginTop: 10,
    marginBottom: 2,
  },
  newsInfo: {
    fontSize: 12,
    lineHeight: 20,
    color: '#555',
    marginBottom: 15,
  },
});

export default function NewsItem(props) {
  function onItemPress() {
    props.onItemPress({
      index: props.index,
      title: props.title,
      content: props.content,
    });
  }
  return (
    <TouchableOpacity underlayColor={"#f3f3f3"} onPress={onItemPress}>
      <View style={{height: 1, backgroundColor: '#37A22E'}} />
      <View style={styles.newsItem}>
        <View style={styles.newsConent}>
          <Text allowFontScaling={false} style={styles.newsTitle} numberOfLines={1}>
            {props.title}
          </Text>
          <Text allowFontScaling={false} style={styles.newsInfo} numberOfLines={3}>
            {props.content}
          </Text>
        </View>
        <View style={styles.newsIcon}>
          <Icon allowFontScaling={false} name={'angle-right'} style={ styles.icon } />
        </View>
      </View>
    </TouchableOpacity>
  );
}

NewsItem.propTypes = {
  boardTitle: React.PropTypes.string,
  title: React.PropTypes.string,
  content: React.PropTypes.string,
  index: React.PropTypes.number,
  onItemPress: React.PropTypes.func,
};

NewsItem.defaultProps = {
};
