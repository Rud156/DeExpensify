import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../utils/ColorUtil';

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
  detailsHolder: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 14,
  },
  monthStatsHeader: {
    color: COLORS.GRAY,
    fontSize: 12,
  },

  monthStatsDetails: {
    fontSize: 20,
    fontWeight: '500',
  },
  todaysDateText: {
    textAlign: 'center',
    color: COLORS.WHITE,
  },
  mainHeaderText: {
    textAlign: 'center',
    fontSize: 18,
    color: COLORS.BLACK,
  },
  extraMargin: {
    marginVertical: 21,
  },
});
