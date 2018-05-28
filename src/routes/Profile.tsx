import React from 'react';
import { Container, Header, Text, Body, Title, Content, Card, CardItem } from 'native-base';

import { COLORS } from '../utils/Constants';

class Profile extends React.Component {
  static navigatorStyle = {
    navBarHidden: true,
  };

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: COLORS.BLUE }}>
          <Body>
            <Title>Profile</Title>
          </Body>
        </Header>
        <Content padder>
          <Card>
            <CardItem header bordered>
              <Text>Profile</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

export default Profile;
