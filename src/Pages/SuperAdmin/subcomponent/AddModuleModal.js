import {Modal, Container, Row, Col, Button} from 'react-bootstrap';
import {Formik, Field, ErrorMessage, Form} from 'formik';
import * as Yup from 'yup';
import {useState} from 'react';
import {instance} from '../../../services/httpService';

const AddModuleModal = (props) => {

    const onSubmit = (data) => {
        instance.post("/api/ieducare/module/post", data)
        .then(res => {
            if(res.status === 200){
                console.log("Success")
            }
            else{
                console.log("Fail")
            }
        })
        .catch(err => console.log(err.message))
    }

    const initialValues = {
        code: '',
        name: ''

    }

    const validationSchema = Yup.object({
        code: Yup.string().required("Module Unique Code is Required"),
        name: Yup.string().required(" Module Name is Required "),
    })
    return (
        <Modal {...props} 
            aria-labelledby="contained-modal-title-vcenter"
            size="md"
            centered
            className="add-new-modal"
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Create Module
            </Modal.Title>
        </Modal.Header>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form>
                    <Modal.Body className="">
                        <Container>    
                        <Row>
                            <Col lg={12} md={12} sm={12}>
                                <div className="form-group">
                                    <Field type="text" name="code" id="code"className="form-control" placeholder="Module Code"/>
                                    <small id="passwordHelpBlock" className="form-text text-danger">
                                        <ErrorMessage name="code" />
                                    </small>
                                </div>
                            </Col>
                            
                        </Row>
                        <Row>
                            <Col lg={12} md={12} sm={12}>
                                    <div className="form-group">
                                    <Field type="text" name="name" id="name" className="form-control" placeholder="Module Name"/>
                                    <small id="passwordHelpBlock" className="form-text text-danger">
                                        <ErrorMessage name="name" />
                                    </small>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide} className="cancel-btn">Close</Button>
                    <button type="submit" className="submit-btn">Create <span className="iconify" data-icon="entypo:arrow-long-right" data-inline="false"></span></button>
                </Modal.Footer>
            </Form>
        </Formik>
    </Modal>
    )
}

export default AddModuleModal
