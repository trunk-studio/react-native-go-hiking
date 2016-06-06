import React, {
  Text,
  TouchableOpacity,
  PropTypes,
  StyleSheet,
} from 'react-native';
const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 5,
    borderRadius: 3,
    borderWidth: 1,
    backgroundColor: 'rgb(79, 164, 89)',
    borderColor: 'rgb(79, 164, 89)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
  },
});

export default function Button(props) {
  const buttonColor = props.active ? props.activeColor : 'rgba(0, 0, 0, 0)';
  const borderColor = props.activeColor;
  const textColor = props.active ? props.textColor : props.activeColor;
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: buttonColor, width: props.width, borderColor: borderColor }]}
      onPress={props.onPress.bind(this, props.index)}
    >
      <Text allowFontScaling={false} style={[styles.text, { color: textColor }]}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
}

Button.propTypes = {
  index: PropTypes.number,
  text: PropTypes.string,
  active: PropTypes.bool,
  width: PropTypes.number,
  onPress: PropTypes.func,
  activeColor: PropTypes.string,
  textColor: PropTypes.string,
};

Button.defaultProps = {
  text: '',
  active: false,
  width: 50,
  onPress: () => {},
  activeColor: 'rgb(79, 164, 89)',
  textColor: '#fff',
};
