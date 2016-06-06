import React, {
  ScrollView,
  View,
  Text,
} from 'react-native';
import { connect } from 'react-redux';

const StyleSheet = require('../utils/F8StyleSheet');
const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 65,
    backgroundColor: 'rgb(240, 240, 240)',
  },
  hr: {
    borderColor: 'rgba(185, 190, 183, 0.53)',
    borderWidth: 1,
    borderStyle: 'solid',
    marginLeft: 15,
    marginRight: 15,
  },
  title: {
    fontSize: 20,
    paddingLeft: 27,
    paddingRight: 27,
    paddingTop: 10,
    lineHeight: 30,
    textAlign: 'center',
  },
  container: {
    marginLeft: 25,
    marginRight: 25,
    marginTop: 20,
    marginBottom: 100,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 30,
    backgroundColor: 'white',
    ios: {
      shadowOpacity: 1,
      shadowColor: 'rgba(147, 147, 147, 0.6)',
      shadowOffset: {
        width: 0,
        height: 0,
      },
    },
  },
  content: {
    fontSize: 16,
    color: 'rgb(40, 40, 40)',
    lineHeight: 30,
  },
});
function NewsDetail(props) {
  return (
    <ScrollView
      style={styles.wrapper}
      keyscrollEventThrottle={200}
      automaticallyAdjustContentInsets={false}
    >
      <Text allowFontScaling={false} style={ styles.title }>{props.newsTitle}</Text>
      <View style={ styles.container }>
        <Text allowFontScaling={false} style={ styles.content }>{props.newsContent}</Text>
      </View>
    </ScrollView>
  );
}

NewsDetail.propTypes = {
  newsTitle: React.PropTypes.string,
  newsContent: React.PropTypes.string,
};

NewsDetail.defaultProps = {
};

function _injectPropsFromStore(state) {
  return {
  };
}

const _injectPropsFormActions = {
};

export default connect(_injectPropsFromStore, _injectPropsFormActions)(NewsDetail);
