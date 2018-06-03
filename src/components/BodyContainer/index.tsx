import React from 'react';
import { Container, Header, Text, Body, Title, Content, Card, CardItem } from 'native-base';

import { COLORS } from '../../utils/Constants';

const BodyContainer = ({ title, children }: { title: string; children?: any }) => (
  <Container>
    <Header style={{ backgroundColor: COLORS.BLUE }}>
      <Body>
        <Title>{title}</Title>
      </Body>
    </Header>
    <Content padder>
      <Card>
        <CardItem header bordered>
          <Text>{title}</Text>
        </CardItem>
      </Card>
      {children}
    </Content>
  </Container>
);

export default BodyContainer;
