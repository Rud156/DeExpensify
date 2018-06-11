import React from 'react';
import { Container, Header, Body, Title, Content, Left, Right } from 'native-base';

import { COLORS } from '../../utils/ColorUtil';

interface Props {
  title: string;
  fixedPositionButtons?: JSX.Element;
  children?: JSX.Element | any;
  leftComponent?: JSX.Element;
  rightComponent?: JSX.Element;

  makeDarkBackground?: boolean;
}

class BodyContainer extends React.PureComponent<Props, {}> {
  public static defaultProps: Props = {
    title: '',
    makeDarkBackground: false,
  };

  render() {
    const {
      title,
      children,
      fixedPositionButtons,
      leftComponent,
      rightComponent,
      makeDarkBackground,
    } = this.props;

    return (
      <Container>
        <Header
          androidStatusBarColor={COLORS.BLACK}
          iosBarStyle="light-content"
          style={{ backgroundColor: COLORS.BLACK }}
        >
          {leftComponent && <Left>{leftComponent}</Left>}
          <Body>
            <Title>{title}</Title>
          </Body>
          {rightComponent && <Right>{rightComponent}</Right>}
        </Header>
        <Content style={{ backgroundColor: makeDarkBackground ? COLORS.BLACK : COLORS.WHITE }}>
          {children}
        </Content>
        {fixedPositionButtons}
      </Container>
    );
  }
}

export default BodyContainer;
