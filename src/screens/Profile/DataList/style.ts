import { StyleSheet } from 'react-native';
import { COLORS } from '../../../utils/ColorUtil';

const style = StyleSheet.create({
  containerView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 7,
    backgroundColor: COLORS.WHITE,
    padding: 7,
    minHeight: 50,
    marginVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.GRAY,
  },
  leftText: {
    fontWeight: '500',
  },
  rightText: {
    color: COLORS.DARK_GREY,
    marginRight: 14,
  },
  rightInput: {
    width: 50,
    marginRight: 14,
    height: 22,
  },
  input: {
    color: COLORS.DARK_GREY,
    fontSize: 16,
  },
});

export default style;
