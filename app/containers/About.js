import React, {
  StyleSheet,
  ScrollView,
  Dimensions,
  View,
  Text,
} from 'react-native';
import CoverCard from '../components/CoverCard';

const coverImg = require('../images/about.jpg');
const windowSize = Dimensions.get('window');
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: 64,
    marginBottom: 50,
  },
  scrollFrame: {
    flex: 1,
    flexDirection: 'column',
  },
  scrollContainer: {
    flex: 1,
    margin: 15,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgb(11, 70, 108)',
    backgroundColor: 'rgb(200, 227, 235)',
  },
});

export default function About() {
  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.scrollFrame}>
        <CoverCard title={'雲端農場'} height={windowSize.height * 0.4}
          img={coverImg} style={styles.coverContainer}
        />
        <View style={{ backgroundColor: 'rgb(96, 179, 203)' }}>
          <View index={0} style={styles.scrollContainer}>
            <Text allowFontScaling={false} style={{ fontSize: 20, marginTop: 5, marginBottom: 5, fontWeight: '500' }}>
              緣起
            </Text>
            <Text allowFontScaling={false} style={{ fontSize: 14, marginBottom: 20, lineHeight: 25 }}>
               當大眾普遍關注工業 4.0 的發展時，民間與企業已默默推動農業朝向 3.0 甚至 4.0 發展，
               雲科大工業工程與管理系雲端農業服務中心即是其中之一。
               五年前毒奶粉事件讓工管系開始嘗試應用製造業管理的專長解決食安問題，
               其後農產品安全事件不斷發生，遂決定為弱勢的農業成立雲端農業服務中心，
               整合跨領域的專業協助農業轉型升級。
            </Text>
            <Text allowFontScaling={false} style={{ fontSize: 20, marginTop: 5, marginBottom: 5, fontWeight: '500' }}>
              食安導向
            </Text>
            <Text allowFontScaling={false} style={{ fontSize: 14, marginBottom: 20, lineHeight: 25 }}>
                食安導向農產品現階段最重要的訴求在「安全」，因此服務中心從創造安全價值著手。
                具體做法是將製造業管理的經驗與機制調整後移植到田間。服務中心自行開發e化雲端系統，
                管理農場的進產銷存，各項管理執行後由系統自動彙整產生農產品足跡(FoodPrint)，
                提供消費者透明產品資訊，也可以由系統產生驗證文件協助農民申請公信力標章。
                「農產品足跡」是次世代的履歷，不需人工填寫且可以快速逆向或順向溯源追蹤，
                FoodPrint藉e化管理為農產品的安全加值。
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

About.propTypes = {
};

About.defaultProps = {
};
