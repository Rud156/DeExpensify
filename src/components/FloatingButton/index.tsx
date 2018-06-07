import React from 'react';
import { Button, Text } from 'native-base';

import { COLORS } from '../../utils/ColorUtil';

import style from './style';

interface Props {
  buttonText: string;
  onPress: () => void;
  buttonColor?: string;
  textColor?: string;
  buttonPositionRight?: number;
}

class FloatingButton extends React.PureComponent<Props, {}> {
  public static defaultProps: Props = {
    buttonText: 'Hello World',
    onPress: () => {},
    buttonColor: COLORS.BLUE,
    textColor: COLORS.WHITE,
    buttonPositionRight: 20,
  };

  constructor(props: Props) {
    super(props);
  }

  render() {
    const { buttonText, onPress, buttonColor, textColor, buttonPositionRight } = this.props;

    return (
      <Button
        onPress={onPress}
        style={[style.button, { backgroundColor: buttonColor, right: buttonPositionRight }]}
      >
        <Text style={[style.text, { color: textColor }]}>{buttonText}</Text>
      </Button>
    );
  }
}

export default FloatingButton;
