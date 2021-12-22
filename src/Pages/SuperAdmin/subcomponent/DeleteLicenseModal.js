import {Modal, Container, Row, Col, Button} from 'react-bootstrap';
import {Formik, Form} from 'formik';
import {useState} from 'react';
import {PopupAlert} from '../../components/Alert';
import {deleteInstitutionLicense} from '../../../services/institutionServices';

const DeleteLicenseModal = (props) => {

    const {data} = props

    const[showAlert, setShowAlert] = useState(false) 
    const[alertType, setAlertType] = useState("")
    const[message, setMessage] = useState("")
    const [isSubmit, setIsSubmit] = useState(false)

    
    const onSubmit = async(editData) => {
        const institutionId = data.id
        setIsSubmit(true)
        try{
            const res = await deleteInstitutionLicense(institutionId, editData)
            if (res.status === 204 || res.status === 200){
                setAlertType("success")
                setMessage("Institution License deleted Successfully")
                setShowAlert(true)
                setIsSubmit(false)
                props.setContentLength(props.contentLength - 1)
            }
            else{
                setAlertType("danger")
                setMessage("Fail to Delete to Institution License")
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
        isDeleted: true
    }

    return (
        <Modal {...props} 
            aria-labelledby="contained-modal-title-vcenter"
            size="sm"
            centered
            className="add-new-modal"
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Delete License
            </Modal.Title>
        </Modal.Header>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
            >
                <Form>
                    <Modal.Body className="">
                        <Container>       
                        {showAlert && <PopupAlert alertType={alertType} setShowAlert={setShowAlert} message={message}/>}  
                        <Row>
                        <Col lg={12}>
                          <span className="iconify delete-warning" data-icon="ant-design:warning-filled" data-inline="false"></span>
                          <b className="delete-text">Are you sure you want to delete License?</b>
                          </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer className="modal-btn">
                    <Button onClick={props.onHide} className="cancel-btn">Close</Button>
                    <button type="submit" className="delete-btn" disabled={isSubmit ? true : false}>{
                        isSubmit ? "Deleting..." : "Delete"
                    }</button>
                </Modal.Footer>
            </Form>
        </Formik>
    </Modal>
    )
}

export default DeleteLicenseModal
