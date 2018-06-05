import React from 'react';
import { Container, Header, Text, Body, Title, Content } from 'native-base';

import { COLORS } from '../../utils/ColorUtil';

const BodyContainer = ({
  title,
  fixedPositionButtons,
  children,
}: {
  title: string;
  fixedPositionButtons?: JSX.Element;
  children?: any;
}) => (
  <Container>
    <Header style={{ backgroundColor: COLORS.BLUE }}>
      <Body>
        <Title>{title}</Title>
      </Body>
    </Header>
    <Content padder style={{ backgroundColor: COLORS.WHITE }}>
      {children}
    </Content>
    {fixedPositionButtons}
  </Container>
);

export default BodyContainer;
