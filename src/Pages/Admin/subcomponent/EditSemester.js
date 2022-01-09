import {Modal, Container, Row, Col, Button} from 'react-bootstrap';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useState} from 'react';
import {PopupAlert} from '../../components/Alert';
import {editSemester} from '../../../services/institutionAdminServices';
import StyledTextField from '../../components/StyledTextField';

const EditSemester = (props) => {
    const {data} = props
    const[showAlert, setShowAlert] = useState(false) 
    const[alertType, setAlertType] = useState("")
    const[message, setMessage] = useState("")
    const[isSubmit, setIsSubmit] = useState(false)
    
    const onSubmit = async(editData) => {
        setIsSubmit(true)
        try{
            const res = await editSemester(data.id, editData)
            if (res.status === 200 || res.status === 204){
                setAlertType("success")
                setMessage("New Semester Updated Successfully")
                setShowAlert(true)
                setIsSubmit(false)
            }
            else{
                setAlertType("danger")
                setMessage("Fail to Update Semester")
                setShowAlert(true)
                setIsSubmit(false)
            }
        }
        catch(err){
            console.log(err.message)
            setAlertType("danger")
            setMessage("Network Error")
            setShowAlert(true)
            setIsSubmit(false)
        }
    }

    const initialValues = {
        name: data.name
    }

    const validationSchema = Yup.object({
        name: Yup.string().required("Semester Name is Required")
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
                Edit Semester
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
                                        label="Semester Name" 
                                        placeholder="Semester Name"
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
                        </Row>  
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide} className="cancel-btn">Close</Button>
                    <button type="submit" className="submit-btn" disabled={isSubmit}>{isSubmit ? "Submitting" : "Submit" }<span className="iconify" data-icon="entypo:arrow-long-right" data-inline="false"></span></button>
                </Modal.Footer>
            </form>
    </Modal>
    )
}

export default EditSemester