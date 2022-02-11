import {Modal, Container, Row, Col, Button} from 'react-bootstrap';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useState, useEffect} from 'react';
import {PopupAlert} from '../../components/Alert';
import StyledTextField from '../../components/StyledTextField';
import {MenuItem} from '@material-ui/core';
import { removeStaffFromRole } from '../../../services/roleServices';



const RemoveStaffFromRole = (props) => {
    const[showAlert, setShowAlert] = useState(false) 
    const[alertType, setAlertType] = useState("")
    const[message, setMessage] = useState("")
    const [isSubmit, setIsSubmit] = useState(false)

    const [roles, setRoles] = useState([])

    const onSubmit = async(data) => {        
        try {
            setIsSubmit(true)
            const res = await removeStaffFromRole(data.userId, data.role)
            if (res.status === 200 || res.status === 204){
                setIsSubmit(false)
                setAlertType("success")
                setMessage(`${props.data.firstName} ${props.data.lastName} Removed from Role`)
                setShowAlert(true)
                props.setContentLength(props.contentLength + 1)
            }
            else{
                setIsSubmit(false)
                setAlertType("danger")
                setMessage(`Failed to Remove ${props.data.firstName} ${props.data.lastName} from role`)
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
        role : '',
        userId : props.data.userId

    }

    const validationSchema = Yup.object({
        role : Yup.string().required("Role is Required")
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        onSubmit,
        validationSchema
    })

    useEffect(() => {
        if(props.data.role){
            const currentRoles = props.data.role.split(", ")
            setRoles(currentRoles)
        }
    }, [props.data.role])

    return (
        <Modal {...props} 
            aria-labelledby="contained-modal-title-vcenter"
            size="sm"
            centered
            className="add-new-modal"
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Remove {props.data.firstName} {props.data.lastName} From Role
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
                                        select
                                        name="role" 
                                        id="role"
                                        label="Role"
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.role}
                                        onChange={formik.handleChange}
                                        error={formik.touched.role && Boolean(formik.errors.role)}
                                        helperText={formik.touched.role && formik.errors.role}
                                    >
                                        <MenuItem value="">Select Role</MenuItem>
                                        {roles.map(data => (
                                            <MenuItem key={data} value={data}>{data}</MenuItem>
                                        ))}
                                    </StyledTextField>
                                </div>
                            </Col>
                        </Row>  
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide} className="cancel-btn">Close</Button>
                    <button type="submit" className="submit-btn" disabled={isSubmit}> {
                        isSubmit ? "Submitting..." : "Submit"
                    } <span className="iconify" data-icon="entypo:arrow-long-right" data-inline="false"></span></button>
                </Modal.Footer>
            </form>
    </Modal>
    )
}

export default RemoveStaffFromRole
