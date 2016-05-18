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
  const buttonColor = props.active ? 'rgb(79, 164, 89)' : 'rgba(0, 0, 0, 0)';
  const textColor = props.active ? '#fff' : 'rgb(79, 164, 89)';
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: buttonColor, width: props.width }]}
      onPress={props.onPress.bind(this, props.index)}
    >
      <Text style={[styles.text, { color: textColor }]}>
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
};

Button.defaultProps = {
  text: '',
  active: false,
  width: 50,
  onPress: () => {},
};
