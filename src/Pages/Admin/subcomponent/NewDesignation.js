import {Modal, Container, Row, Col, Button} from 'react-bootstrap';
import {useFormik} from 'formik';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import * as Yup from 'yup';
import {useState} from 'react';
import {PopupAlert} from '../../components/Alert';

const NewSchool = (props) => {
    const[showAlert, setShowAlert] = useState(false) 
    const[alertType, setAlertType] = useState("")
    const[message, setMessage] = useState("")

    
    const onSubmit = (data) => {
        console.log(data)
    }

    const initialValues = {
        designation: '',
        description: '',
        designationCategory: ''
    }

    const validationSchema = Yup.object({
        designation: Yup.string().required("Designation is Required"),
        description: Yup.string().required(" Description is Required "),
        designationCategory: Yup.string().required(" Designation Category is Required ")
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        onSubmit,
        validationSchema
    })


    return (
        <Modal {...props} 
            aria-labelledby="contained-modal-title-vcenter"
            size="sm"
            centered
            className="add-new-modal"
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Add Designation
            </Modal.Title>
        </Modal.Header>
                <form onSubmit={formik.handleSubmit} >
                    <Modal.Body className="">
                        <Container>        
                        {showAlert && <PopupAlert alertType={alertType} setShowAlert={setShowAlert} message={message}/>}   
                        <Row>
                            <Col lg={12} md={12} sm={12}>
                                    <div className="form-group" id="new-session-textfield">
                                    <TextField 
                                        name="designation" 
                                        id="designation" 
                                        label="Designation" 
                                        margin="normal"
                                        placeholder="Designation"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.designation}
                                        onChange={formik.handleChange}
                                        error={formik.touched.designation && Boolean(formik.errors.designation)}
                                        helperText={formik.touched.designation && formik.errors.designation}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            
                            <Col lg={12} md={12} sm={12}>
                                    <div className="form-group" id="new-session-textfield">
                                    <TextField 
                                        name="description" 
                                        id="description" 
                                        placeholder="Description"
                                        label="Description" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        error={formik.touched.description && Boolean(formik.errors.description)}
                                        helperText={formik.touched.description && formik.errors.description}
                                    />
                                    </div>
                            </Col>
                        </Row>
                        <Row>
                            
                            <Col lg={12} md={12} sm={12}>
                                    <div className="form-group" id="new-session-textfield">
                                    <TextField 
                                        name="designationCategory" 
                                        id="designationCategory" 
                                        placeholder="Designation Category"
                                        label="Designation Category" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.designationCategory}
                                        onChange={formik.handleChange}
                                        error={formik.touched.designationCategory && Boolean(formik.errors.designationCategory)}
                                        helperText={formik.touched.designationCategory && formik.errors.designationCategory}
                                    />
                                    </div>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide} className="cancel-btn">Close</Button>
                    <button type="submit" className="submit-btn">Submit <span className="iconify" data-icon="entypo:arrow-long-right" data-inline="false"></span></button>
                </Modal.Footer>
            </form>
    </Modal>
    )
}

export default NewSchool