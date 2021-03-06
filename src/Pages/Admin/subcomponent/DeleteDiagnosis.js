import {Modal, Container, Row, Col, Button} from 'react-bootstrap';
import {useFormik} from 'formik';
import {useState} from 'react';
import {PopupAlert} from '../../components/Alert';
import { deleteMedicalDiagnosis } from '../../../services/healthService';

const DeleteDiagnosis = (props) => {
    const[showAlert, setShowAlert] = useState(false) 
    const[alertType, setAlertType] = useState("")
    const[message, setMessage] = useState("")
    const[isSubmit, setIsSubmit] = useState(false)

    
    const onSubmit = async(data) => {
        setIsSubmit(true)
        try{
            const res = await deleteMedicalDiagnosis(data.id)
            if (res.status === 200 || res.status === 204){
                setAlertType("success")
                setMessage("Medical Diagnosis Deleted Successfully")
                setShowAlert(true)
                setIsSubmit(false)
                props.setContentLength(props.contentLength - 1)
            }
            else{
                setAlertType("danger")
                setMessage("Fail to Delete Medical Diagnosis")
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

    const initialValues = {
        id: props.data.id
    }


    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        onSubmit
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
                Delete Diagnosis
            </Modal.Title>
        </Modal.Header>
                <form onSubmit={formik.handleSubmit} >
                    <Modal.Body className="">
                        <Container>        
                        {showAlert && <PopupAlert alertType={alertType} setShowAlert={setShowAlert} message={message}/>}   
                        <Row>
                            <Col lg={12} md={12} sm={12}>
                                <div className="form-group">
                                    Are You Sure you want to Delete?
                                </div> 
                            </Col>
                        </Row>  
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide} className="cancel-btn">Close</Button>
                    <button type="submit" className="submit-btn" disabled={isSubmit}>{isSubmit ? "Deleting..." : "Delete" } <span className="iconify" data-icon="entypo:arrow-long-right" data-inline="false"></span></button>
                </Modal.Footer>
            </form>
    </Modal>
    )
}

export default DeleteDiagnosis