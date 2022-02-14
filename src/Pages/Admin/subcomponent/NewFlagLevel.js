import {Modal, Container, Row, Col, Button} from 'react-bootstrap';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useState} from 'react';
import {PopupAlert} from '../../components/Alert';
import StyledTextField from '../../components/StyledTextField';
import {createFlagLevel} from '../../../services/flagServices';

const NewFlagLevel = (props) => {
    const[showAlert, setShowAlert] = useState(false) 
    const[alertType, setAlertType] = useState("")
    const [isSubmit, setIsSubmit] = useState(false)
    const[message, setMessage] = useState("")

    
    const onSubmit = async(data) => {
        setIsSubmit(true)
        try {
            const res = await createFlagLevel(data)
            console.log(res)
            if (res.status === 200 || res.status === 204){
                setIsSubmit(false)
                setAlertType("success")
                setMessage("Flag level Created Successfully")
                setShowAlert(true)
            }
            else{
                setIsSubmit(false)
                setAlertType("danger")
                setMessage("Failed to Create Flag Level")
                setShowAlert(true)
            }
        }
        catch(err){
            console.log(err.message)
            setIsSubmit(false)
            setAlertType("danger")
            setMessage(err.message)
            setShowAlert(true)
            console.log(err.statusDescription)
        } 
    }


    const initialValues = {
        name: ''
    }

    const validationSchema = Yup.object({
        name: Yup.string().required("Flag Level Name is Required")
    })

    const formik = useFormik({
        // enableReinitialize: true,
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
                New Flag Level
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
                                        label="Flag level Name" 
                                        margin="normal"
                                        placeholder="Flag level Name"
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
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide} className="cancel-btn">Close</Button>
                    <button type="submit" className="submit-btn" disabled={isSubmit}> {
                        isSubmit ? "Submitting..." : "Submit"
                    } <span className="iconify" data-icon="entypo:arrow-long-right" data-inline="false"></span></button>
                </Modal.Footer>
            </form>
    </Modal>
    )
}

export default NewFlagLevel