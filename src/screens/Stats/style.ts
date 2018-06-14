import { StyleSheet } from 'react-native';
import { COLORS } from '../../utils/ColorUtil';

const style = StyleSheet.create({
  containerView: {
    backgroundColor: COLORS.BLACK,
    height: 280,
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateTextStyle: {
    textAlign: 'center',
    color: COLORS.WHITE,
    top: -21,
  },
  chartHolder: {
    height: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 14,
  },
});

export default style;
