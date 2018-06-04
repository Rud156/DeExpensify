import React from 'react';
import { Modal } from 'react-native';
import BodyContainer from '../../../components/BodyContainer';

interface Props {
  displayModal: boolean;
  closeModal: () => void;
}

class AddExpenseModal extends React.PureComponent<Props, {}> {
  render() {
    const { displayModal, closeModal } = this.props;

    return (
      <Modal
        presentationStyle="pageSheet"
        animationType="slide"
        transparent={false}
        visible={displayModal}
        onRequestClose={closeModal}
      >
        <BodyContainer title="Add Expense" />
      </Modal>
    );
  }
}

export default AddExpenseModal;
