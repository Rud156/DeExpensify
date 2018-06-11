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
  username: {
    textAlign: 'center',
    fontSize: 25,
    color: COLORS.GRAY,
    marginRight: 14,
  },
  usernameHolder: {
    paddingTop: 35,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImage: {
    height: 150,
    width: 150,
  },
  userImageHolder: {
    borderRadius: 80,
    borderColor: COLORS.WHITE,
    borderWidth: 1,
    width: 160,
    height: 160,
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
