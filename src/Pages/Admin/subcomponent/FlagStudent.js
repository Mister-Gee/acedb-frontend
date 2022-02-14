import {Modal, Container, Row, Col, Button} from 'react-bootstrap';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useState, useEffect} from 'react';
import {PopupAlert} from '../../components/Alert';
import StyledTextField from '../../components/StyledTextField';
import { MenuItem } from '@material-ui/core';
import {getAllFlagLevel, flagStudent} from '../../../services/flagServices';

const FlagStudent = (props) => {
    const[showAlert, setShowAlert] = useState(false) 
    const[alertType, setAlertType] = useState("")
    const [isSubmit, setIsSubmit] = useState(false)
    const[message, setMessage] = useState("")
    const [flagLevels, setFlagLevels] = useState([])

    
    const onSubmit = async(data) => {
        setIsSubmit(true)
        try {
            const res = await flagStudent(data)
            console.log(res)
            if (res.status === 200 || res.status === 204){
                setIsSubmit(false)
                setAlertType("success")
                setMessage("Student Flagged Successfully")
                setShowAlert(true)
                props.setContentLength(props.contentLength + 1)
            }
            else{
                setIsSubmit(false)
                setAlertType("danger")
                setMessage("Failed to Flag Student")
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

    useEffect(() => {
        const fetchData = async() => {
            const res = await getAllFlagLevel()
            const data = res.data
            if(Array.isArray(data)){
                setFlagLevels(data)
            }
            else{
                setFlagLevels([])
            }
        } 
        fetchData()
    }, [])

    const initialValues = {
        userId: '',
        flagLevelID: ''
    }

    const validationSchema = Yup.object({
        userId: Yup.string().required("Student Email/Matric Number is Required"),
        flagLevelID: Yup.string().required("Flag Level is Required")
    })

    const formik = useFormik({
        // enableReinitialize: true,
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
                Flag Student
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
                                        name="userId" 
                                        id="userId" 
                                        label="Student Email/Matric Number" 
                                        margin="normal"
                                        placeholder="Student Email/Matric Number"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.userId}
                                        onChange={formik.handleChange}
                                        error={formik.touched.userId && Boolean(formik.errors.userId)}
                                        helperText={formik.touched.userId && formik.errors.userId}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12} md={12} sm={12}>
                                    <div className="form-group" id="new-session-textfield">
                                    <StyledTextField 
                                        select
                                        name="flagLevelID" 
                                        id="flagLevelID" 
                                        label="Flag Level" 
                                        margin="normal"
                                        placeholder="Flag Level"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.flagLevelID}
                                        onChange={formik.handleChange}
                                        error={formik.touched.flagLevelID && Boolean(formik.errors.flagLevelID)}
                                        helperText={formik.touched.flagLevelID && formik.errors.flagLevelID}
                                    >
                                        <MenuItem value="">Select Flag Level</MenuItem>
                                        {flagLevels.map(data => (
                                            <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
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

export default FlagStudent