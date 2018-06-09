import { StyleSheet } from 'react-native';
import { COLORS } from '../../../utils/ColorUtil';

const style = StyleSheet.create({
  containerView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY,
    paddingVertical: 7,
    marginVertical: 14,
  },
  leftTextStyle: {
    fontWeight: '500',
  },
  rightTextStyle: {
    color: COLORS.DARK_GREY,
    marginRight: 14,
  },
});

export default style;
