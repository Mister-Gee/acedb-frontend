import {Modal, Container, Row, Col, Button} from 'react-bootstrap';
import {useFormik} from 'formik';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import * as Yup from 'yup';
import {useState} from 'react';
import {PopupAlert} from '../../components/Alert';
import {getWebUserId} from '../../../utils/Functions';
import {editSchool} from '../../../services/institutionAdminServices';

const EditSchool = (props) => {

    const {data} = props

    const[showAlert, setShowAlert] = useState(false) 
    const[alertType, setAlertType] = useState("")
    const [isSubmit, setIsSubmit] = useState(false)
    const[message, setMessage] = useState("")
    const userId = getWebUserId()

    
    const onSubmit = async(data) => {
        setIsSubmit(true)
        try {
            const res = editSchool(data.id, data.name, data.headId, data.institutionId)
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
            console.log(err.message)
            setIsSubmit(false)
            setAlertType("danger")
            setMessage(err.message)
            setShowAlert(true)
        }
        
    }

    const initialValues = {
        id: data.id,
        name: data.name,
        institutionId: data.institutionId,
        webUserId: userId
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
                Add New School
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
                        <Row>
                            <Col lg={12} md={12} sm={12}>
                                    <div className="form-group" id="new-session-textfield">
                                    <TextField 
                                        select
                                        name="headId" 
                                        id="headId" 
                                        placeholder="School Head"
                                        label="School Head" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.headId}
                                        onChange={formik.handleChange}
                                        error={formik.touched.headId && Boolean(formik.errors.headId)}
                                        helperText={formik.touched.headId && formik.errors.headId}
                                        >
                                            <MenuItem value="3fa85f64-5717-4562-b3fc-2c963f66afa6">Default</MenuItem>
                                    </TextField>
                                    </div>
                            </Col>
                        </Row>
                        <Row>
                            
                            <Col lg={12} md={12} sm={12}>
                                    <div className="form-group" id="new-session-textfield">
                                    <TextField 
                                        select
                                        name="designation" 
                                        id="designation" 
                                        placeholder="Designation"
                                        label="Designation" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                    >
                                        <MenuItem value="HODHOD">HOD</MenuItem>
                                    </TextField>
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