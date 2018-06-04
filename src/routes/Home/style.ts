import { StyleSheet } from 'react-native';
import { COLORS } from '../../utils/ColorUtil';

export default StyleSheet.create({
  bottomActionButton: {
    backgroundColor: COLORS.BLUE,
    borderRadius: 25,
    height: 50,
    width: 50,
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  todaysDateText: {
    textAlign: 'center',
    color: COLORS.DARK_GREY,
  },
  mainHeaderText: {
    textAlign: 'center',
    fontSize: 20,
    color: COLORS.BLACK,
  },
  extraMargin: {
    marginVertical: 21,
  },
});
