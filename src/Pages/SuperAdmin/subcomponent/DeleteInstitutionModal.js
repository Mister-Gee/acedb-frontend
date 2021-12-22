import {Modal, Container, Row, Col, Button} from 'react-bootstrap';
import {Formik, Form} from 'formik';
import {useState} from 'react';
import {PopupAlert} from '../../components/Alert';
import {deleteInstitution} from '../../../services/institutionServices';


const DeleteInstitutionModal = (props) => {

    const {data} = props
    const[showAlert, setShowAlert] = useState(false) 
    const[alertType, setAlertType] = useState("")
    const[message, setMessage] = useState("")
    const [isSubmit, setIsSubmit] = useState(false)

    const webUser = localStorage.getItem("webUserId")

    const onSubmit = async(data) => {
        setIsSubmit(true)
        try{
            const res = await deleteInstitution(data)
            if (res.status === 204 || res.status === 200){
                setAlertType("success")
                setMessage("Institution deleted Successfully")
                setShowAlert(true)
                setIsSubmit(false)
                props.setContentLength(props.contentLength - 1)
            }
            else{
                setAlertType("danger")
                setMessage("Fail to Delete to Institution")
                setShowAlert(true)
                setIsSubmit(false
                )
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
        name: data.name,
        institutionTypeId: data.institutionTypeId,
        instituionEmail: data.InstitutionEmail,
        principalName: data.principalName,
        principalPhoneNumber: data.principalPhoneNumber,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        city: data.city,
        createdBy: webUser,
        addressLine3: data.addressLine3,
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
            Delete Institution
            </Modal.Title>
        </Modal.Header>
            <Formik
                onSubmit={onSubmit}
                initialValues={initialValues}
            >
                <Form>
                    <Modal.Body className="">
                        <Container fluid>    
                        {showAlert && <PopupAlert alertType={alertType} setShowAlert={setShowAlert} message={message}/>}  
                        <Row>
                          <Col lg={12}>
                          <span className="iconify delete-warning" data-icon="ant-design:warning-filled" data-inline="false"></span>
                          <b className="delete-text">Are you sure you want to delete {data.name}?</b>
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

export default DeleteInstitutionModal
