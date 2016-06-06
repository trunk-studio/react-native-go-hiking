import React, {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  dateFrame: {
    flex: 5,
    borderRadius: 7,
    borderColor: '#359ac0',
    borderWidth: 3,
    marginRight: 20,
    height: 100,
  },
  weatherFrame: {
    flex: 6,
    flexDirection: 'row',
    borderRadius: 7,
    borderColor: '#359ac0',
    borderWidth: 3,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationArea: {
    backgroundColor: '#064c69',
    color: 'white',
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    height: 27,
  },
  dateTxt: {
    fontSize: 30,
    color: '#064c69',
    textAlign: 'center',
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 10,
    paddingRight: 10,
    letterSpacing: 1,
  },
  weekdayTxt: {
    fontSize: 18,
    fontWeight: '500',
    color: '#064c69',
    textAlign: 'center',
    paddingTop: 1,
    paddingBottom: 5,
  },
  degreeTxt: {
    flex: 7,
    fontSize: 40,
    textAlign: 'center',
    color: '#064c69',
    paddingTop: 10,
    paddingBottom: 10,
  },
  degreeSign: {
    fontSize: 28,
  },
  stateArea: {
    flex: 4,
    flexDirection: 'column',
    alignItems: 'center',
    paddingRight: 5,
  },
  stateTxt: {
    flex: 1,
    fontSize: 18,
    color: '#064c69',
    textAlign: 'center',
  },
  weatherIcon: {
    flex: 1,
    width: 40,
    height: 40,
  },
});

export default function InfoBar(props) {
  return (
    <View style={styles.container}>
      <View style={styles.dateFrame}>
        <Text allowFontScaling={false} style={styles.dateTxt}>{props.month}/{props.date}</Text>
        <Text allowFontScaling={false} style={styles.weekdayTxt}>星期{props.weekday}</Text>
        <Text allowFontScaling={false} style={styles.locationArea}>{props.locationName}</Text>
      </View>
      <View style={styles.weatherFrame}>
        <Text allowFontScaling={false} style={styles.degreeTxt}>
          {props.temp !== undefined ? Math.round(props.temp) : ''}
          <Text allowFontScaling={false} style={styles.degreeSign}>
          {props.temp !== undefined ? '℃' : ''}
          </Text>
        </Text>
        <View style={styles.stateArea}>
          <Image style={styles.weatherIcon} source={{ uri: `http://openweathermap.org/img/w/${props.iconId}.png` }} />
          <Text allowFontScaling={false} style={styles.stateTxt}>{props.desc}</Text>
        </View>
      </View>
    </View>
  );
}

InfoBar.propTypes = {
  month: React.PropTypes.number,
  date: React.PropTypes.number,
  weekday: React.PropTypes.string,
  locationName: React.PropTypes.string,
  temp: React.PropTypes.number,
  desc: React.PropTypes.string,
  iconId: React.PropTypes.string,
};

InfoBar.defaultProps = {
};
