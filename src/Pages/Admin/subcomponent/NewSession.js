import {Modal, Container, Row, Col, Button} from 'react-bootstrap';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useState} from 'react';
import {PopupAlert} from '../../components/Alert';
import {createSession} from '../../../services/institutionAdminServices';
import StyledTextField from '../../components/StyledTextField';



const NewSession = (props) => {

    //Popup Alert state
    const[showAlert, setShowAlert] = useState(false) 
    const[alertType, setAlertType] = useState("")
    const[message, setMessage] = useState("")

    //Submission State
    const[isSubmit, setIsSubmit] = useState(false)

    //Form submission function
    const onSubmit = async(data) => {
        setIsSubmit(true)
        try{
            const res = await createSession(data)
            if (res.status === 200 || res.status === 204){
                setAlertType("success")
                setMessage("New Session Added Successfully")
                setShowAlert(true)
                setIsSubmit(false)
                props.setContentLength(props.contentLength + 1)
            }
            else{
                setAlertType("danger")
                setMessage("Fail to Create Session")
                setShowAlert(true)
                setIsSubmit(false)
            }
        }
        catch(err){
            setAlertType("danger")
            setMessage(err.response.data.message)
            setShowAlert(true)
            setIsSubmit(false)
        }
    }

    //Form initial Value
    const initialValues = {
        name: '',
        year: ''
    }

    //Form Validation Schema
    const validationSchema = Yup.object({
        name: Yup.string().required("Session Name is Required"),
        year: Yup.string().required("Year is Required ")
    })

    //Formik hook
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
                Add New Session
            </Modal.Title>
        </Modal.Header>
                <form onSubmit={formik.handleSubmit} >
                    <Modal.Body className="">
                        <Container>        
                        {showAlert && <PopupAlert alertType={alertType} setShowAlert={setShowAlert} message={message}/>}   
                        <Row>
                            <Col lg={12} md={12} sm={12}>
                                <div className="form-group" id="new-session-textfield">
                                    <StyledTextField 
                                        name="name" 
                                        id="name" 
                                        label="Session Name" 
                                        placeholder="Session Name"
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                    />
                                </div>
                            </Col>
                            <Col lg={12} md={12} sm={12}>
                                <div className="form-group" id="new-session-textfield">
                                    <StyledTextField 
                                        name="year" 
                                        type='date'
                                        id="Year" 
                                        label="Date" 
                                        placeholder="Date"
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.year}
                                        onChange={formik.handleChange}
                                        error={formik.touched.year && Boolean(formik.errors.year)}
                                        helperText={formik.touched.year && formik.errors.year}
                                    />
                                </div>
                            </Col>
                        </Row>  
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide} className="cancel-btn">Close</Button>
                    <button type="submit" className="submit-btn" disabled={isSubmit}>{isSubmit ? "Submitting..." : "Submit" } <span className="iconify" data-icon="entypo:arrow-long-right" data-inline="false"></span></button>
                </Modal.Footer>
            </form>
    </Modal>
    )
}

export default NewSession