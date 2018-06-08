import React from 'react';
import BodyContainer from '../../components/BodyContainer';

class Stats extends React.Component {
  static navigatorStyle = {
    navBarHidden: true,
  };

  render() {
    return <BodyContainer title="Stats" />;
  }
}

export default Stats;
