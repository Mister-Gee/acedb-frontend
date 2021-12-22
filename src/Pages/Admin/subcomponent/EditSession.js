import {Modal, Container, Row, Col, Button} from 'react-bootstrap';
import {useFormik} from 'formik';
import TextField from '@material-ui/core/TextField';
import * as Yup from 'yup';
import {useState} from 'react';
import {PopupAlert} from '../../components/Alert';
import {getWebUserId} from '../../../utils/Functions';
import {editSession} from '../../../services/institutionAdminServices';

const EditSession = (props) => {
    const {data} = props
    const[showAlert, setShowAlert] = useState(false) 
    const[alertType, setAlertType] = useState("")
    const[message, setMessage] = useState("")
    const[isSubmit, setIsSubmit] = useState(false)

    const userId = getWebUserId()
    
    const onSubmit = async(data) => {
        setIsSubmit(true)
        try{
            const res = await editSession(data.id, data.name, data.institutionId, data.description, data.createdBy, data.yearFrom, data.yearTo)
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
            console.log(err.message)
            setAlertType("danger")
            setMessage("Network Error")
            setShowAlert(true)
            setIsSubmit(false)
        }
    }

    const initialValues = {
        id: data.id,
        name: data.name,
        institutionId: data.institutionId,
        description: data.description,
        createdBy: userId,
        yearFrom: data.yearFrom,
        yearTo: data.yearTo

    }

    const validationSchema = Yup.object({
        name: Yup.string().required("Session is Required"),
        description: Yup.string().required(" Description is Required "),
        yearFrom: Yup.number().required("Start Year is required"),
        yearTo: Yup.number().required("End Year is required")
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
                                    <TextField 
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
                                    <TextField 
                                        name="description" 
                                        id="description" 
                                        label="Description" 
                                        placeholder="Description"
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        error={formik.touched.description && Boolean(formik.errors.description)}
                                        helperText={formik.touched.description && formik.errors.description}
                                    />
                                </div>
                                </Col>
                                <Col lg={12} md={12} sm={12}>
                                    <div className="form-group" id="new-session-textfield">
                                    <TextField 
                                        type="number"
                                        min="1900" 
                                        max="2099" 
                                        step="1"
                                        name="yearFrom" 
                                        id="yearFrom" 
                                        label="From" 
                                        placeholder="From"
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.yearFrom}
                                        onChange={formik.handleChange}
                                        error={formik.touched.yearFrom && Boolean(formik.errors.yearFrom)}
                                        helperText={formik.touched.yearFrom && formik.errors.yearFrom}
                                    />
                                </div>
                                </Col>
                                <Col lg={12} md={12} sm={12}>
                                    <div className="form-group" id="new-session-textfield">
                                    <TextField 
                                        type="number"
                                        min="1900" 
                                        max="2099" 
                                        step="1"
                                        name="yearTo" 
                                        id="yearTo" 
                                        label="To" 
                                        placeholder="To"
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.yearTo}
                                        onChange={formik.handleChange}
                                        error={formik.touched.yearTo && Boolean(formik.errors.yearTo)}
                                        helperText={formik.touched.yearTo && formik.errors.yearTo}
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