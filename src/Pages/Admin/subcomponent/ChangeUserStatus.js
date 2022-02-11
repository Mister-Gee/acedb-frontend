import {Modal, Container, Row, Col, Button} from 'react-bootstrap';
import {useFormik} from 'formik';
import {useState} from 'react';
import {PopupAlert} from '../../components/Alert';
import {updateUserStatus} from '../../../services/userServices';

const ChangeUserStatus = (props) => {
    const {data} = props
    const[showAlert, setShowAlert] = useState(false) 
    const[alertType, setAlertType] = useState("")
    const[message, setMessage] = useState("")
    const[isSubmit, setIsSubmit] = useState(false)

    
    const onSubmit = async(data) => {
        setIsSubmit(true)
        try{
            console.log(data)
            const res = await updateUserStatus(data)
            console.log(res)
            if (res.status === 200 || res.status === 204){
                setAlertType("success")
                setMessage("User Deactivated")
                setShowAlert(true)
                setIsSubmit(false)
                props.setContentLength(props.contentLengt - 1)
            }
            else{
                setAlertType("danger")
                setMessage("Fail to Deactivate User")
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
        userID: data.id,
        activeStatus: false
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
                Deactivate User
            </Modal.Title>
        </Modal.Header>
                <form onSubmit={formik.handleSubmit} >
                    <Modal.Body className="">
                        <Container>        
                        {showAlert && <PopupAlert alertType={alertType} setShowAlert={setShowAlert} message={message}/>}   
                        <Row>
                            <Col lg={12} md={12} sm={12}>
                                <div className="form-group">
                                    Are You Sure you want to Deactivate User?
                                </div> 
                            </Col>
                        </Row>  
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide} className="cancel-btn">Close</Button>
                    <button type="submit" className="submit-btn" disabled={isSubmit}>{isSubmit ? "Deactivating..." : "Deactivate" } <span className="iconify" data-icon="entypo:arrow-long-right" data-inline="false"></span></button>
                </Modal.Footer>
            </form>
    </Modal>
    )
}

export default ChangeUserStatus