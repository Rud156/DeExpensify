import React from 'react';
import { View, Text, Input, Item } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { COLORS } from '../../../utils/ColorUtil';

import style from './style';

interface Props {
  leftText: string | number;
  rightText: string | number;

  displayTextField: boolean;
  error: boolean;

  onEditPress: () => void;
  handleValueSave: () => void;
  onValueChange: (value: string) => void;
}

interface State {}

class DataList extends React.PureComponent<Props, State> {
  render() {
    const {
      leftText,
      rightText,
      onEditPress,
      onValueChange,
      displayTextField,
      handleValueSave,
      error,
    } = this.props;

    return (
      <View style={style.containerView}>
        <View>
          <Text style={style.leftText}>{leftText}</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          {!displayTextField ? (
            <React.Fragment>
              <Text style={style.rightText}>{rightText}</Text>
              <MaterialIcons
                name="edit"
                color={COLORS.BLACK}
                onPress={onEditPress}
                style={{ paddingTop: 3 }}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Item style={[style.rightInput, { borderBottomWidth: error ? 1 : 0 }]} error={error}>
                <Input
                  defaultValue={`${rightText}`}
                  style={style.input}
                  onChangeText={onValueChange}
                  autoFocus
                />
              </Item>
              <MaterialIcons
                name="save"
                color={COLORS.BLACK}
                onPress={handleValueSave}
                style={{ paddingTop: 3 }}
              />
            </React.Fragment>
          )}
        </View>
      </View>
    );
  }
}

export default DataList;
