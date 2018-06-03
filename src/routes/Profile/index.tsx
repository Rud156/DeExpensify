import React from 'react';
import BodyContainer from '../../components/BodyContainer';

interface Props {}
interface State {}

class Profile extends React.Component<Props, State> {
  static navigatorStyle = {
    navBarHidden: true,
  };

  constructor(props: Props) {
    super(props);
  }

  render() {
    return <BodyContainer title="Profile" />;
  }
}

export default Profile;
