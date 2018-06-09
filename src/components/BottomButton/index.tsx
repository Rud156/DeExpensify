import React from 'react';
import { Button, Text } from 'native-base';

import { COLORS } from '../../utils/ColorUtil';

import style from './style';

interface Props {
  buttonText: string;
  onPress: () => void;
  buttonColor?: string;
  textColor?: string;
}

class BottomButton extends React.PureComponent<Props, {}> {
  public static defaultProps: Props = {
    buttonText: 'Hello World',
    onPress: () => {},
    buttonColor: COLORS.BLUE,
    textColor: COLORS.WHITE,
  };

  constructor(props: Props) {
    super(props);
  }

  render() {
    const { buttonText, onPress, buttonColor, textColor } = this.props;

    return (
      <Button onPress={onPress} style={[style.button, { backgroundColor: buttonColor }]}>
        <Text style={[style.text, { color: textColor }]}>{buttonText}</Text>
      </Button>
    );
  }
}

export default BottomButton;
