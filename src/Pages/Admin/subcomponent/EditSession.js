import {Modal, Container, Row, Col, Button} from 'react-bootstrap';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useState} from 'react';
import {PopupAlert} from '../../components/Alert';
import {editSession} from '../../../services/institutionAdminServices';
import StyledTextField from '../../components/StyledTextField';
import {dateToInputDate} from '../../../utils/Functions';

const EditSession = (props) => {
    const {data} = props
    const[showAlert, setShowAlert] = useState(false) 
    const[alertType, setAlertType] = useState("")
    const[message, setMessage] = useState("")
    const[isSubmit, setIsSubmit] = useState(false)

    
    const onSubmit = async(editdata) => {
        setIsSubmit(true)
        try{
            const res = await editSession(data.id, editdata)
            if (res.status === 200 || res.status === 204){
                setAlertType("success")
                setMessage("Session Edited Successfully")
                setShowAlert(true)
                setIsSubmit(false)
                props.setContentLength(props.contenthLength + 1)
            }
            else{
                setAlertType("danger")
                setMessage("Fail to Edit Session")
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
        name: data.name,
        year: data.year,
    }

    const validationSchema = Yup.object({
        name: Yup.string().required("Session Name is Required"),
        year: Yup.string().required("Year is Required ")
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
                Edit Session
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
                                        value={dateToInputDate(formik.values.year)}
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
                    <button type="submit" className="submit-btn" disabled={isSubmit}>{isSubmit ? "Editing..." : "Edit" } <span className="iconify" data-icon="entypo:arrow-long-right" data-inline="false"></span></button>
                </Modal.Footer>
            </form>
    </Modal>
    )
}

export default EditSession