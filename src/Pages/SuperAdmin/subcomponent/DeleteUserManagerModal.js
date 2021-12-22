import {Modal, Container, Row, Col, Button} from 'react-bootstrap';
import {Formik, Form} from 'formik';
import {useState} from 'react';
import {PopupAlert} from '../../components/Alert';
import {deleteInstitutionAdmin} from '../../../services/institutionServices';


const DeleteUserManagerModal = (props) => {
    const {data} = props

    const [pryAdmin, setPryAdmin] = useState(true)
    const[showAlert, setShowAlert] = useState(false) 
    const[alertType, setAlertType] = useState("")
    const[message, setMessage] = useState("")
    const [isSubmit, setIsSubmit] = useState(false)

    const webUser = localStorage.getItem("webUserId")

    const onSubmit = async(data) => {
        data.isPrimary = pryAdmin
        setIsSubmit(true)

        try{
            const res = await deleteInstitutionAdmin(data)
            if (res.status === 204 || res.status === 200){
                setAlertType("success")
                setMessage("User Manager Deleted successfully")
                setShowAlert(true)
                props.setContentLength(props.contentLength - 1)
            }
            else{
                setAlertType("danger")
                setMessage("Fail to Delete User Manager")
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
        firstName: data.firstName,
        lastName: data.lastName,
        otherNames: data.otherNames,
        email: data.email,
        phoneNumber: data.phoneNumber,
        administratorUserName: data.administratorUserName,
        administratorPassword: data.administratorPassword,
        genderId: data.genderId,
        institutionId: data.institutionId,
        createdBy: webUser,
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
            Delete User Manager
            </Modal.Title>
        </Modal.Header>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
            >
                <Form>
                    <Modal.Body className="">
                        <Container fluid>      
                        {showAlert && <PopupAlert alertType={alertType} setShowAlert={setShowAlert} message={message}/>}    
                        <Row>
                          <Col lg={12}>
                          <span className="iconify delete-warning" data-icon="ant-design:warning-filled" data-inline="false"></span>
                          <b className="delete-text">Are you sure you want to delete User Admin?</b>
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

export default DeleteUserManagerModal
