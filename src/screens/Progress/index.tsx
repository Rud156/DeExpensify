import React from 'react';
import BodyContainer from '../../components/BodyContainer';

class Progress extends React.Component {
  static navigatorStyle = {
    navBarHidden: true,
  };

  render() {
    return <BodyContainer title="Progress" />;
  }
}

export default Progress;
