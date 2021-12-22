import {Modal, Container, Row, Col, Button} from 'react-bootstrap';
import {useFormik} from 'formik';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import * as Yup from 'yup';
import {useState} from 'react';
import {PopupAlert} from '../../components/Alert';

const NewSessionSemester = (props) => {
    const[showAlert, setShowAlert] = useState(false) 
    const[alertType, setAlertType] = useState("")
    const[message, setMessage] = useState("")

    
    const onSubmit = (data) => {
        console.log(data)
    }

    const initialValues = {
        sessionId: '',
        semesterId: '',
        startDate: '',
        endDate: ''
    }

    const validationSchema = Yup.object({
        sessionId: Yup.string().required("Session is Required"),
        semesterId: Yup.string().required(" Semester is Required "),
        startDate: Yup.string().required("start Date is required"),
        endDate: Yup.string().required("End Date is required")
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
            size="lg"
            centered
            className="add-new-modal"
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Add New Sesssion/Semester
            </Modal.Title>
        </Modal.Header>
                <form onSubmit={formik.handleSubmit} >
                    <Modal.Body className="">
                        <Container>        
                        {showAlert && <PopupAlert alertType={alertType} setShowAlert={setShowAlert} message={message}/>}   
                        <Row>
                            <Col lg={6} md={6} sm={12}>
                                    <div className="form-group" id="select-input">
                                    <TextField 
                                        name="sessionId" 
                                        id="sessionId" 
                                        label="Session" 
                                        placeholder="Session"
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.sessionId}
                                        onChange={formik.handleChange}
                                        error={formik.touched.sessionId && Boolean(formik.errors.sessionId)}
                                        helperText={formik.touched.sessionId && formik.errors.sessionId}
                                    />
                                </div>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                    <div className="form-group" id="select-input">
                                    <TextField 
                                        select 
                                        name="semesterId" 
                                        id="semesterId"
                                        label="Semester" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.semesterId}
                                        onChange={formik.handleChange}
                                        error={formik.touched.semesterId && Boolean(formik.errors.semesterId)}
                                        helperText={formik.touched.semesterId && formik.errors.semesterId}
                                    >
                                        <MenuItem value="1">First Semester</MenuItem>
                                        <MenuItem value="2">Second Semester</MenuItem>
                                    </TextField>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            
                            <Col lg={6} md={6} sm={12}>
                                    <div className="form-group">
                                    <TextField 
                                        type="date" 
                                        name="startDate" 
                                        id="startDate" 
                                        placeholder="Start Date"
                                        label="Start Date" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.startDate}
                                        onChange={formik.handleChange}
                                        error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                                        helperText={formik.touched.startDate && formik.errors.startDate}
                                    />
                                    </div>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                    <div className="form-group">
                                    <TextField 
                                        type="date" 
                                        name="endDate" 
                                        id="endDate" 
                                        placeholder="End Date"
                                        label="End Date" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.endDate}
                                        onChange={formik.handleChange}
                                        error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                                        helperText={formik.touched.endDate && formik.errors.endDate}
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

export default NewSessionSemester