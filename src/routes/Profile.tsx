import React from 'react';
import { Container, Header, Text, Body, Title, Content, Card, CardItem, Button } from 'native-base';
import { Modal } from 'react-native';

import { COLORS } from '../utils/Constants';

interface Props {}
interface State {
  modalOpen: boolean;
}

class Profile extends React.Component<Props, State> {
  static navigatorStyle = {
    navBarHidden: true,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      modalOpen: false,
    };
  }

  openModal = () => {
    this.setState({ modalOpen: true });
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const { modalOpen } = this.state;
    return (
      <Container>
        <Header style={{ backgroundColor: COLORS.BLUE }}>
          <Body>
            <Title>Profile</Title>
          </Body>
        </Header>
        <Content padder>
          <Modal
            presentationStyle="pageSheet"
            animationType="slide"
            transparent={false}
            visible={modalOpen}
            onRequestClose={this.closeModal}
          >
            <Header style={{ backgroundColor: COLORS.BLUE }}>
              <Body>
                <Title>Modal</Title>
              </Body>
            </Header>
          </Modal>
          <Card>
            <CardItem header bordered>
              <Text>Profile</Text>
            </CardItem>
          </Card>
          <Button onPress={this.openModal}>
            <Text>Open Modal</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default Profile;
