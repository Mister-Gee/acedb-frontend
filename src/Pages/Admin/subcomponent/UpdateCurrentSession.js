import {Modal, Container, Row, Col, Button} from 'react-bootstrap';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useState, useEffect} from 'react';
import {PopupAlert} from '../../components/Alert';
import {getSession, getSemester} from '../../../services/institutionAdminServices';
import {updateSesssionSemester} from '../../../services/sessionServices';
import StyledTextField from '../../components/StyledTextField';
import { MenuItem } from '@material-ui/core';


const UpdateCurrentSession = (props) => {
    //Popup Alert state
    const[showAlert, setShowAlert] = useState(false) 
    const[alertType, setAlertType] = useState("")
    const[message, setMessage] = useState("")

    const [semesterData, setSemesterData] = useState([])
    const [sessionData, setSessionData] = useState([])

    useEffect(() => {
        const fetchData = async() => {
            try{
                const res = await getSemester()
                setSemesterData(res.data)
            }
            catch(err){
                console.log(err.message)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async() => {
            try{
                const res = await getSession()
                setSessionData(res.data)
            }
            catch(err){
                console.log(err.message)
            }
        }
        fetchData()
    }, [])

    //Submission State
    const[isSubmit, setIsSubmit] = useState(false)

    //Form submission function
    const onSubmit = async(data) => {
        setIsSubmit(true)
        try{
            const res = await updateSesssionSemester(data)
            if (res.status === 200 || res.status === 204){
                setAlertType("success")
                setMessage("School Year Updated Successfully")
                setShowAlert(true)
                setIsSubmit(false)
            }
            else{
                setAlertType("danger")
                setMessage("Fail to Update School Year")
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

    //Form initial Value
    const initialValues = {
        academicYearID: '',
        semesterID: ''
    }

    //Form Validation Schema
    const validationSchema = Yup.object({
        academicYearID: Yup.string().required("Session is Required"),
        semesterID: Yup.string().required("Semester is Required ")
    })

    //Formik hook
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
                Update Current Session And Semester
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
                                        name="academicYearID" 
                                        id="academicYearID" 
                                        label="Session" 
                                        placeholder="Session"
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.academicYearID}
                                        onChange={formik.handleChange}
                                        error={formik.touched.academicYearID && Boolean(formik.errors.academicYearID)}
                                        helperText={formik.touched.academicYearID && formik.errors.academicYearID}
                                    >
                                        {sessionData.map(data => (
                                            <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                                        ))}
                                    </StyledTextField>
                                </div>
                            </Col>
                            <Col lg={12} md={12} sm={12}>
                                <div className="form-group" id="new-session-textfield">
                                    <StyledTextField 
                                        select
                                        name="semesterID" 
                                        type='date'
                                        id="semesterID" 
                                        label="Semster" 
                                        placeholder="Semster"
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.semesterID}
                                        onChange={formik.handleChange}
                                        error={formik.touched.semesterID && Boolean(formik.errors.semesterID)}
                                        helperText={formik.touched.semesterID && formik.errors.semesterID}
                                    >
                                        {semesterData.map(data => (
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
                    <button type="submit" className="submit-btn" disabled={isSubmit}>{isSubmit ? "Submitting..." : "Submit" } <span className="iconify" data-icon="entypo:arrow-long-right" data-inline="false"></span></button>
                </Modal.Footer>
            </form>
    </Modal>
    )
}

export default UpdateCurrentSession
