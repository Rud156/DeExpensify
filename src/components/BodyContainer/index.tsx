import React from 'react';
import { Container, Header, Body, Title, Content, Left, Right } from 'native-base';

import { COLORS } from '../../utils/ColorUtil';

interface Props {
  title: string;
  fixedPositionButtons?: JSX.Element;
  children?: JSX.Element;
  leftComponent?: JSX.Element;
  rightComponent?: JSX.Element;
}

class BodyContainer extends React.PureComponent<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { title, children, fixedPositionButtons, leftComponent, rightComponent } = this.props;

    return (
      <Container>
        <Header style={{ backgroundColor: COLORS.BLUE }}>
          {leftComponent && <Left>{leftComponent}</Left>}
          <Body>
            <Title>{title}</Title>
          </Body>
          {rightComponent && <Right>{rightComponent}</Right>}
        </Header>
        <Content padder style={{ backgroundColor: COLORS.WHITE }}>
          {children}
        </Content>
        {fixedPositionButtons}
      </Container>
    );
  }
}

export default BodyContainer;
