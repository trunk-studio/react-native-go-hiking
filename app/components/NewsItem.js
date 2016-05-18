import React, {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  newsItem: {
    flexDirection: 'row',
    borderBottomColor: '#417505',//'#333',
    borderBottomWidth: 0.5,
    borderTopColor: '#417505',//'#333',
    borderTopWidth: 0.5,
  },
  newsConent: {
    flex: 8,
    paddingLeft: 20,
    paddingRight: 20,
  },
  newsIcon: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
  },
  icon: {
    fontSize: 40,
    color: '#417505', //'#359ac0',
  },
  newsTitle: {
    fontSize: 19,
    fontWeight: '500',
    lineHeight: 25,
    color: '#333',
    marginTop: 10,
    marginBottom: 5,
  },
  newsInfo: {
    fontSize: 15,
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
      <View style={styles.newsItem}>
        <View style={styles.newsConent}>
          <Text style={styles.newsTitle} numberOfLines={1}>
            {props.title}
          </Text>
          <Text style={styles.newsInfo} numberOfLines={2}>
            {props.content}
          </Text>
        </View>
        <View style={styles.newsIcon}>
          <Icon name={'angle-right'} style={ styles.icon } />
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
