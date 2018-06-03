import React from 'react';
import BodyContainer from '../../components/BodyContainer';

class Home extends React.Component {
  static navigatorStyle = {
    navBarHidden: true,
  };

  render() {
    return <BodyContainer title="Home" />;
  }
}

export default Home;
