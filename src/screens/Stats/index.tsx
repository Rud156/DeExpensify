import React from 'react';
import { View, Text } from 'native-base';

import BodyContainer from '../../components/BodyContainer';

import { removeExpense } from '../../core/actions/expenditure';

import style from './style';

class Stats extends React.Component {
  static navigatorStyle = {
    navBarHidden: true,
  };

  render() {
    return (
      <BodyContainer title="Stats">
        <View style={style.containerView} />
      </BodyContainer>
    );
  }
}

export default Stats;
