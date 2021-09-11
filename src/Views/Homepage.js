import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import {getEmployees , addEmployee } from '../redux/Actions/EmployeeActions'
import EmployeeCard from '../Components/EmployeeCard';

function Homepage(props) {
    const handleValidSubmit =(event,values)=>{
        values.leaves = [];
        values.id = new Date().getTime();
        props.addEmployee(values)
    }
    useEffect(() => {
        props.getEmployees()
    }, [])
    return (
        <div>
            <h3 className="text-center my-5">Employee Management System</h3>
               
            <hr />

            <Row>
                <Col sm={4}>
                    <div className="add-employee-form p-4">
                        <AvForm onValidSubmit={handleValidSubmit}>
                            <AvField 
                                name="email" 
                                label="Email Address" 
                                placeholder="Email Address" 
                                type="email"
                                className="my-2"
                                validate={{
                                    required: {value: true, errorMessage: 'Please enter an email'}
                                }}
                                
                            />
                            <AvField 
                                name="phone" 
                                label="Phone number" 
                                placeholder="Phone number" 
                                type="number"
                                className="my-2"
                                validate={{
                                    required: {value: true, errorMessage: 'Please enter a phone number'},
                                    minLength: {value: 10, errorMessage: 'Phone number must be 10 digits'},
                                    maxLength: {value: 10, errorMessage: 'Phone number must be 10 digits'}                  
                                }}
                                
                            />
                            <AvField 
                                name="firstName" 
                                label="First Name" 
                                placeholder="First Name" 
                                type="text"
                                className="my-2"
                                validate={{
                                    required: {value: true, errorMessage: 'Please enter a first name'},
                                    minLength: {value: 2, errorMessage: 'Your name must be between 2 and 16 characters'},
                                    maxLength: {value: 16, errorMessage: 'Your name must be between 6 and 16 characters'}         
                                }}
                                
                            />
                            <AvField 
                                name="lastName" 
                                label="Last Name" 
                                placeholder="Last Name" 
                                type="text"
                                className="my-2"
                                validate={{
                                    required: {value: true, errorMessage: 'Please enter a last name'},
                                    minLength: {value: 2, errorMessage: 'Your name must be between 2 and 16 characters'},
                                    maxLength: {value: 16, errorMessage: 'Your name must be between 6 and 16 characters'}
                                }}
                                
                            />

                            <AvField 
                               name="dob" 
                               label="Date of birth" 
                               type="date" 
                               className="my-2"
                                validate={{
                                    required: {value: true, errorMessage: 'Please enter date'},
                                }}
                               />
                            <Button color="primary">Submit</Button>
                        </AvForm>
                    </div>
                </Col>

                <Col sm={8}>
                    {
                        props.employees.map((formData,index)=>{
                            return <EmployeeCard key={index} formData={formData} />
                        })
                    }
                </Col>
            </Row>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    getEmployees : ()=>dispatch(getEmployees()),
    addEmployee : (data)=>dispatch(addEmployee(data))
});

const mapStateToProps = state => ({
    employees:state.employees
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
