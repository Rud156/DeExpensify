import React from 'react';
import { Container, Header, Text, Body, Title, Content, Card, CardItem } from 'native-base';

import { COLORS } from '../utils/Constants';

const Progress = () => (
  <Container>
    <Header style={{ backgroundColor: COLORS.BLUE }}>
      <Body>
        <Title>Progress</Title>
      </Body>
    </Header>
    <Content padder>
      <Card>
        <CardItem header bordered>
          <Text>Progress</Text>
        </CardItem>
      </Card>
    </Content>
  </Container>
);

export default Progress;
