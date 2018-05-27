import React from 'react';
import { Container, Header, Text, Body, Title, Content, Card, CardItem } from 'native-base';

import { COLORS } from '../utils/Constants';

const Home = () => (
  <Container>
    <Header style={{ backgroundColor: COLORS.BLUE }}>
      <Body>
        <Title>Home</Title>
      </Body>
    </Header>
    <Content padder>
      <Card>
        <CardItem header bordered>
          <Text>Home</Text>
        </CardItem>
      </Card>
    </Content>
  </Container>
);

export default Home;
