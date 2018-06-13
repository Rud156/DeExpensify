import { StyleSheet } from 'react-native';
import { COLORS } from '../../utils/ColorUtil';

const style = StyleSheet.create({
  containerView: {
    backgroundColor: COLORS.BLACK,
    height: 280,
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default style;
