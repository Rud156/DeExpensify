import { StyleSheet } from 'react-native';
import { COLORS } from '../../utils/ColorUtil';

const style = StyleSheet.create({
  username: {
    textAlign: 'center',
    fontSize: 25,
    color: COLORS.GRAY,
    marginRight: 14,
  },
  usernameHolder: {
    marginTop: 14,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImage: {
    height: 100,
    width: 100,
  },
  userImageHolder: {
    marginTop: 21,
    borderRadius: 55,
    borderColor: COLORS.WHITE,
    borderWidth: 1,
    width: 110,
    height: 110,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  usernameInputHolder: {
    width: 150,
    marginRight: 14,
    borderBottomWidth: 0,
    height: 22,
  },
  usernameInput: {
    color: COLORS.GRAY,
    fontSize: 25,
  },
});

export default style;
