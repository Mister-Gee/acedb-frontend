import {Modal, Container, Row, Col, Button} from 'react-bootstrap';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useState} from 'react';
import {PopupAlert} from '../../components/Alert';
import {editSchool} from '../../../services/institutionAdminServices';
import StyledTextField from '../../components/StyledTextField';

const EditSchool = (props) => {

    const {data} = props

    const[showAlert, setShowAlert] = useState(false) 
    const[alertType, setAlertType] = useState("")
    const [isSubmit, setIsSubmit] = useState(false)
    const[message, setMessage] = useState("")

    
    const onSubmit = async(editdata) => {
        setIsSubmit(true)
        try {
            const res = await editSchool(data.id, editdata)
            if (res.status === 200 || res.status === 204){
                setIsSubmit(false)
                setAlertType("success")
                setMessage("School Edited Successfully")
                setShowAlert(true)
                props.setContentLength(props.contentLength - 1)
            }
            else{
                setIsSubmit(false)
                setAlertType("danger")
                setMessage("Failed to Edit School")
                setShowAlert(true)
            }
        }
        catch(err){
            setIsSubmit(false)
            setAlertType("danger")
            setMessage(err.response.data.message)
            setShowAlert(true)
        }
        
    }

    const initialValues = {
        name: data.name,
    }

    const validationSchema = Yup.object({
        name: Yup.string().required("School Name is Required")
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
                Edit School
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
                                        label="School Name" 
                                        margin="normal"
                                        placeholder="School Name"
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
                        isSubmit ? "Submiting..." : "Submit"
                    } <span className="iconify" data-icon="entypo:arrow-long-right" data-inline="false"></span></button>
                </Modal.Footer>
            </form>
    </Modal>
    )
}

export default EditSchool