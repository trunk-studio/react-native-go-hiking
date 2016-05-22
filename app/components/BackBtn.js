import React, {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  leftButtonContainer: {
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    paddingRight: 6,
    marginTop: 2,
  },
  navBackTitle: {
    marginTop: 2,
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default function BackBtn(props) {
  return (
    <TouchableOpacity
      style={styles.leftButtonContainer}
      onPress={Actions.pop}
    >
      <Icon
        name="angle-left"
        size={24}
        color={'#FFF'}
        style={styles.menuIcon}
      />
    <Text style={styles.navBackTitle} />
    </TouchableOpacity>
  );
}
