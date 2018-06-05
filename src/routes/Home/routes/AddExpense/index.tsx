import React from 'react';
import { NavigationInjectedProps } from 'react-navigation';

import BodyContainer from '../../../../components/BodyContainer';

interface Props extends NavigationInjectedProps {}
interface State {}

class AddExpense extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return <BodyContainer title="Add Expense" />;
  }
}

export default AddExpense;
