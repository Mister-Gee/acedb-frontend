import {Modal, Container, Row, Col, Button} from 'react-bootstrap';
import {useFormik} from 'formik';
import MenuItem from '@material-ui/core/MenuItem';
import * as Yup from 'yup';
import {useState, useEffect} from 'react';
import {PopupAlert} from '../../components/Alert';
import {getDepartment} from '../../../services/institutionAdminServices';
import StyledTextField from '../../components/StyledTextField';
import { getStaffByDept } from '../../../services/staffServices';
import { getCourse } from '../../../services/courseServices';
import { createTimetable } from '../../../services/examTimetableService';



const NewTimeTable = (props) => {
    const[showAlert, setShowAlert] = useState(false) 
    const[alertType, setAlertType] = useState("")
    const[message, setMessage] = useState("")
    const [isSubmit, setIsSubmit] = useState(false)
    const [dept, setDept] = useState([])
    const [selectedDept, setSelectedDept] = useState("")
    const [supervisor, setSupervisor] = useState([])
    const [courses, setCourses] = useState([])


    const onSubmit = async(data) => {
        setIsSubmit(true)
        try {
            const res = await createTimetable(data)
            if (res.status === 200 || res.status === 204){
                setIsSubmit(false)
                setAlertType("success")
                setMessage("Exam Timetable Added Successfully")
                setShowAlert(true)
                props.setContentLength(props.contentLength + 1)
            }
            else{
                setIsSubmit(false)
                setAlertType("danger")
                setMessage("Failed to Create Exam Timetable")
                setShowAlert(true)
            }
            setIsSubmit(false)
        }
        catch(err){
            console.log(err.message)
            setIsSubmit(false)
            setAlertType("danger")
            setMessage(err.message)
            setShowAlert(true)
            setIsSubmit(false)
        }
    }

    const initialValues = {
        courseID: '',
        examDateTime: '',
        supervisorID: '',
        examStartTime: '',
        examDuration: '',
        venue: ''
    }

    const validationSchema = Yup.object({
        courseID: Yup.string().required("Course Title is Required"),
        examDateTime: Yup.string().required("Exam Date is Required"),
        supervisorID: Yup.string().required("Supervisor is Required"),
        examStartTime: Yup.string().required("Exam Time is Required"),
        examDuration: Yup.string().required("Exam Duration is Required"),
        venue: Yup.string().required("Exam Venue is Required")
    })

    const formik = useFormik({
        // enableReinitialize: true,
        initialValues,
        onSubmit,
        validationSchema
    })

    useEffect(() => {
        const fetchData = async() => {
            const res = await getCourse()
            const data = res.data
            if(Array.isArray(data)){
                setCourses(data)
            }
            else{
                setCourses([])
            }
        } 
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async() => {
            const res = await getDepartment()
            const data = res.data
            if(Array.isArray(data)){
                setDept(data)
            }
            else{
                setDept([])
            }
        } 
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async() => {
            const res = await getStaffByDept(selectedDept)
            const data = res.data
            if(Array.isArray(data)){
                setSupervisor(data)
            }
            else{
                setSupervisor([])
            }
        } 
        fetchData()
    }, [selectedDept])

    return (
        <Modal {...props} 
            aria-labelledby="contained-modal-title-vcenter"
            size="lg"
            centered
            className="add-new-modal"
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Add Exam Timetable
            </Modal.Title>
        </Modal.Header>
                <form onSubmit={formik.handleSubmit} >
                    <Modal.Body className="">
                        <Container>        
                        {showAlert && <PopupAlert alertType={alertType} setShowAlert={setShowAlert} message={message}/>}   
                        <Row>
                        <Col lg={6} md={6} sm={12}>
                                    <div className="form-group" id="customSelect-input">
                                    <StyledTextField 
                                        select
                                        name="courseID" 
                                        id="courseID" 
                                        label="Course" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.courseID}
                                        onChange={formik.handleChange}
                                        error={formik.touched.courseID && Boolean(formik.errors.courseID)}
                                        helperText={formik.touched.courseID && formik.errors.courseID}
                                    >
                                        {courses.map(data => (
                                            <MenuItem key={data.id} value={data.id}>{data.courseTitle}({data.courseCode})</MenuItem>
                                        ))}
                                    </StyledTextField>
                                </div>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                    <div className="form-group" id="select-input">
                                    <StyledTextField 
                                        type="date"
                                        name="examDateTime" 
                                        id="examDateTime"
                                        label="Exam Date"
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.examDateTime}
                                        onChange={formik.handleChange}
                                        error={formik.touched.examDateTime && Boolean(formik.errors.examDateTime)}
                                        helperText={formik.touched.examDateTime && formik.errors.examDateTime}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6} md={6} sm={12}>
                                    <div className="form-group" id="customSelect-input">
                                    <StyledTextField 
                                        name="examStartTime" 
                                        id="examStartTime" 
                                        label="Exam Time" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.examStartTime}
                                        onChange={formik.handleChange}
                                        error={formik.touched.examStartTime && Boolean(formik.errors.examStartTime)}
                                        helperText={formik.touched.examStartTime && formik.errors.examStartTime}
                                    />
                                </div>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                    <div className="form-group" id="customSelect-input">
                                    <StyledTextField
                                        name="examDuration" 
                                        id="examDuration" 
                                        label="Exam Duration" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.examDuration}
                                        onChange={formik.handleChange}
                                        error={formik.touched.examDuration && Boolean(formik.errors.examDuration)}
                                        helperText={formik.touched.examDuration && formik.errors.examDuration}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6} md={6} sm={12}>
                                    <div className="form-group" id="customSelect-input">
                                    <StyledTextField
                                        select
                                        name="supervisorDept" 
                                        id="supervisorDept" 
                                        label="Supervisor's Department" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={selectedDept}
                                        onChange={(e) => setSelectedDept(e.target.value)}
                                    >
                                        <MenuItem>Select Supervisors Department</MenuItem>
                                        {dept.map(data => (
                                            <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                                        ))}
                                    </StyledTextField>
                                </div>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                    <div className="form-group" id="customSelect-input">
                                    <StyledTextField 
                                        select
                                        name="supervisorID" 
                                        id="supervisorID" 
                                        label="Supervisor" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.supervisorID}
                                        onChange={formik.handleChange}
                                        error={formik.touched.supervisorID && Boolean(formik.errors.supervisorID)}
                                        helperText={formik.touched.supervisorID && formik.errors.supervisorID}
                                    >
                                        <MenuItem>Select Supervisors Department</MenuItem>
                                        {supervisor.map(data => (
                                            <MenuItem key={data.id} value={data.id}>{data.firstName} {data.lastName}</MenuItem>
                                        ))}
                                    </StyledTextField>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6} md={6} sm={12}>
                                    <div className="form-group" id="customSelect-input">
                                    <StyledTextField 
                                        name="venue" 
                                        id="venue" 
                                        label="Venue" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.venue}
                                        onChange={formik.handleChange}
                                        error={formik.touched.venue && Boolean(formik.errors.venue)}
                                        helperText={formik.touched.venue && formik.errors.venue}
                                    />
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

export default NewTimeTable