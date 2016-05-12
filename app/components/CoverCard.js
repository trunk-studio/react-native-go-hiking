import React, {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
} from 'react-native';

const windowSize = Dimensions.get('window');
const styles = StyleSheet.create({
  cover: {
    position: 'absolute',
    width: windowSize.width,
    opacity: 0.9,
  },
  text: {
    position: 'absolute',
    width: windowSize.width,
    fontSize: 34,
    textAlign: 'center',
    color: '#fff',
    letterSpacing: 1,
    fontWeight: '600',
    textShadowColor: '#444',
    textShadowOffset: { width: 1, height: 1 },
  },
});

export default function CoverCard(props) {
  return (
    <View style={{ height: props.height }}>
      <Image source={props.img}
        style={[styles.cover, { height: props.height }]}
      />
      <View style={[{ height: props.height, paddingTop: props.height / 2 + props.txtTop }]}>
        <Text style={[styles.text]} >
          {props.title}
        </Text>
      </View>
    </View>
  );
}

CoverCard.propTypes = {
  title: React.PropTypes.string,
  index: React.PropTypes.number,
  top: React.PropTypes.number,
  txtTop: React.PropTypes.number,
  height: React.PropTypes.number,
  img: React.PropTypes.object,
};

CoverCard.defaultProps = {
  title: '',
  txtTop: -20,
  height: 200,
};
