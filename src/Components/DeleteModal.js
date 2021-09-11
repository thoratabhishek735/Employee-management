import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default function DeleteModal(props) {
  const { open, onConfirm, onCancel, toggle, text } = props;
  return (
    <Modal isOpen={open} toggle={toggle}>
      <ModalHeader toggle={toggle}>Confirm Delete</ModalHeader>
      <ModalBody>
        <h3>{text}</h3>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={() => onConfirm()}>Yes</Button>{' '}
        <Button color="secondary" onClick={() => onCancel()}>No</Button>
      </ModalFooter>
    </Modal>
  )
}
