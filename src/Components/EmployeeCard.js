import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap'
import { updateEmployee , deleteEmployee } from '../redux/Actions/EmployeeActions';
import { connect } from 'react-redux';
import EmployeeDeleteModal from './DeleteModal';
import LeavesManagementModal from './LeavesManagementModal';

function EmployeeCard(props) {
    const [formData, setFormData] = useState(props.formData)
    const [edit, setEdit] = useState(false);
    const [deleteEmployeeModal, setDeleteEmployeeModal] = useState(false);
    const [manageLeaves, setManageLeaves] = useState(false);

    const handleValidSubmit = (event, values) => {
        values.leaves = formData.leaves;
        values.id = formData.id
        props.updateEmployee(values)
        setEdit(!edit)
        
    }

    const handleDelete =()=>{
       props.deleteEmployee({email:formData.email})
    }

    const toggleDeleteEmployeeModal=()=>{
        setDeleteEmployeeModal(!deleteEmployeeModal)
    }
    const toggleLeaveManagementModal=()=>{
     setManageLeaves(!manageLeaves)
    }
    
    return (
        <div className="employee-card">
            <h4>{formData.firstName + formData.lastName}</h4>
            <AvForm onValidSubmit={handleValidSubmit}>
                <Row>
               
                    <Col sm={4}>
                        <AvField
                            name="email"
                            label="Email Address"
                            placeholder="Email Address"
                            type="email"
                            value={formData.email}
                            className="my-2"
                            validate={{
                                required: { value: true, errorMessage: 'Please enter an email' }
                            }}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            disabled={true}
                        />
                    </Col>
                    <Col sm={4}>
                        <AvField
                            name="phone"
                            label="Phone number"
                            placeholder="Phone number"
                            type="number"
                            value={formData.phone}
                            className="my-2"
                            validate={{
                                required: { value: true, errorMessage: 'Please enter a phone number' }
                            }}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            disabled={!edit}
                        />
                    </Col>
                    <Col sm={4}>
                        <AvField
                            name="firstName"
                            label="First Name"
                            placeholder="First Name"
                            type="text"
                            className="my-2"
                            value={formData.firstName}
                            validate={{
                                required: { value: true, errorMessage: 'Please enter a first name' }
                            }}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            disabled={!edit}
                        />
                    </Col>
                    <Col sm={4}>
                        <AvField
                            name="lastName"
                            label="Last Name"
                            placeholder="Last Name"
                            type="text"
                            value={formData.lastName}
                            className="my-2"
                            validate={{
                                required: { value: true, errorMessage: 'Please enter a last name' },
                            }}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            disabled={!edit}
                        />
                    </Col>
                    <Col sm={4}>
                        <AvField
                            name="dob"
                            label="Date of birth"
                            type="date"
                            value={formData.dob}
                            className="my-2"
                            validate={{
                                required: { value: true, errorMessage: 'Please enter a date of birth' },
                            }}
                            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                            disabled={!edit}
                        />
                    </Col>
                    <Col sm={4}>
                    {edit?<Button className="mt-4 w-100" color="success">Save</Button>:''}
                    </Col>
                </Row>
               
            </AvForm>
            <div className="mt-3">
                <Button  className="mx-2" color="warning" onClick={() => setEdit(!edit)}>Edit</Button>
                <Button  className="mx-2"  color="info" onClick={()=> setManageLeaves(true)}>Manage Leaves</Button>
                <Button  className="mx-2" color="danger" onClick={()=>setDeleteEmployeeModal(true)}>Delete</Button>
            </div>
         {deleteEmployeeModal?<EmployeeDeleteModal open={deleteEmployeeModal} text={"Are you sure you want to delete employee?"} toggle={toggleDeleteEmployeeModal} onConfirm={handleDelete} onCancel={toggleDeleteEmployeeModal} />:''}
         
         {manageLeaves?<LeavesManagementModal data={formData} open={manageLeaves} toggle={toggleLeaveManagementModal} />:'' }
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    updateEmployee :(data)=>dispatch(updateEmployee(data)),
    deleteEmployee :(data)=>dispatch(deleteEmployee(data))
});

const mapStateToProps = state => ({
    
});

export default connect(mapStateToProps,mapDispatchToProps)(EmployeeCard)
