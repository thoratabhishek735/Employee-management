import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, Table } from 'reactstrap';
import { updateEmployee } from '../redux/Actions/EmployeeActions';
import DeleteModal from './DeleteModal';

function LeavesManagementModal(props) {
    const { data, open, toggle } = props;

    const handleValidSubmit = (event, values) => {
        values.id = new Date();
        const newData = { ...data, leaves: [...data.leaves, values] }
        props.updateEmployee(newData)
        setLeaves([...leaves, values]);
    }

    const [leaves, setLeaves] = useState(data.leaves);

    const [selected, setselected] = useState();

    const [deleteLeaveModal, setDeleteLeaveModal] = useState();

    const toggleLeaveModal = () => {
        setDeleteLeaveModal(!deleteLeaveModal)
    }

    const handleDelete = () => {
        var newArray = leaves.filter((data) => data.id !== selected);
        setLeaves(newArray);
        const newData = { ...data, leaves: newArray }
        props.updateEmployee(newData)
        toggleLeaveModal()
    }

    return (
        <Modal isOpen={open} toggle={toggle} size='lg'>
            <ModalHeader toggle={toggle}>Manage Leaves</ModalHeader>
            <ModalBody>
                <div className="add-leave">
                    <AvForm onValidSubmit={handleValidSubmit}>
                        <Row>
                            <Col sm={5}>
                                <AvField
                                    name="reason"
                                    label="Reason"
                                    placeholder="Reason"
                                    type="text"
                                    className="my-2"
                                    validate={{
                                        required: { value: true, errorMessage: 'Please enter a reason' }
                                    }}
                                />
                            </Col>
                            <Col sm={5}>
                                <AvField
                                    name="date"
                                    label="Date of leave"
                                    type="date"
                                    className="my-2"
                                    validate={{
                                        required: { value: true, errorMessage: 'Please enter date' },
                                    }}
                                />
                            </Col>
                            <Col sm={2}>
                                <Button className="mt-4" color="primary">Add</Button>
                            </Col>
                        </Row>


                    </AvForm>
                </div>
                <hr />
                <div className="show-leave mt-4">
                    <Table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Reason</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                leaves.map((each, index) => {
                                    return <tr key={index}>
                                        <th scope="row">{new Date(each.id).toISOString()}</th>
                                        <td>{each.reason}</td>
                                        <td>{new Date(each.date).toDateString()}</td>
                                        <td><Button className="mx-2" color="danger" onClick={() => {

                                            setselected(each.id)
                                            setDeleteLeaveModal(true)
                                        }}>Delete</Button></td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </Table>
                </div>
                {deleteLeaveModal ? <DeleteModal text={"Are you sure you want to delete leave?"} open={deleteLeaveModal} toggle={toggleLeaveModal} onConfirm={handleDelete} onCancel={toggleLeaveModal} /> : ''}
            </ModalBody>
        </Modal>
    )
}

const mapDispatchToProps = dispatch => ({
    updateEmployee: (data) => dispatch(updateEmployee(data))
});

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(LeavesManagementModal)