import React, {
  ScrollView,
  Dimensions,
} from 'react-native';
import CateItem from '../components/CateItem';

const windowSize = Dimensions.get('window');
const styles = React.StyleSheet.create({
  wrapper: {
    backgroundColor: 'rgb(96, 179, 203)',
    paddingTop: 80,
    marginBottom: 50,
    height: windowSize.height,
  },
});

export default function Category() {
  return (
    <ScrollView style={styles.wrapper}>
      <CateItem key={0} mIndex={1} title={'一月'} subTitle={'January'} />
      <CateItem key={1} mIndex={2} title={'二月'} subTitle={'February'} />
      <CateItem key={2} mIndex={3} title={'三月'} subTitle={'March'} />
      <CateItem key={3} mIndex={4} title={'四月'} subTitle={'April'} />
      <CateItem key={4} mIndex={5} title={'五月'} subTitle={'Ｍay'} />
      <CateItem key={5} mIndex={6} title={'六月'} subTitle={'June'} />
      <CateItem key={6} mIndex={7} title={'七月'} subTitle={'July'} />
      <CateItem key={7} mIndex={8} title={'八月'} subTitle={'August'} />
      <CateItem key={8} mIndex={9} title={'九月'} subTitle={'September'} />
      <CateItem key={9} mIndex={10} title={'十月'} subTitle={'October'} />
      <CateItem key={10} mIndex={11} title={'十一月'} subTitle={'November'} />
      <CateItem key={11} mIndex={12} title={'十二月'} subTitle={'December'} />
    </ScrollView>
  );
}
