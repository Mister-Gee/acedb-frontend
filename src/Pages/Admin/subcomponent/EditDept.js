import {Modal, Container, Row, Col, Button} from 'react-bootstrap';
import {useFormik} from 'formik';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import * as Yup from 'yup';
import {useState, useEffect} from 'react';
import {PopupAlert} from '../../components/Alert';
import {getInstitutionId, getWebUserId} from '../../../utils/Functions';
import {editDepartment, getSchool, getFaculty} from '../../../services/institutionAdminServices';

const EditDepartment = (props) => {
    const {data} = props

    const[showAlert, setShowAlert] = useState(false) 
    const[alertType, setAlertType] = useState("")
    const[message, setMessage] = useState("")
    const [isSubmit, setIsSubmit] = useState(false)
    const [school, setSchool] = useState([])
    const [faculty, setFaculty] = useState([])
    const institutionId = getInstitutionId()
    const userId = getWebUserId()

    useEffect(() => {
        const fetchData = async() => {
            const res = await getSchool(institutionId)
            const data = res.data
            setSchool(data)
        } 
        fetchData()
    }, [institutionId])

    const onSubmit = async(data) => {
        setIsSubmit(true)
        try {
            const res = await editDepartment(data.id, data.name, data.institutionId, data.schoolId, data.facultyId, data.headId)
            if (res.status === 200 || res.status === 204){
                setIsSubmit(false)
                setAlertType("success")
                setMessage("Department Created Successfully")
                setShowAlert(true)
                props.setContentLength(props.contentLength + 1)
            }
            else{
                setIsSubmit(false)
                setAlertType("danger")
                setMessage("Failed to Create Department")
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
        schoolId: data.schoolId,
        facultyId: data.facultyId,
        headId: data.headId,
        createdBy: userId
    }

    const validationSchema = Yup.object({
        name: Yup.string().required("Department Name is Required"),
        schoolId: Yup.string().required("School Name is Required"),
        facultyId: Yup.string().required("Faculty Name is required"),
        // headId: Yup.string().required("HOD is required"),
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        onSubmit,
        validationSchema
    })

    useEffect(() => {
        const fetchData = async() => {
            const res = await getFaculty(institutionId, formik.values.schoolId)
            const data = res.data
            setFaculty(data)
        } 
        fetchData()
    }, [institutionId, formik.values.schoolId])

    return (
        <Modal {...props} 
            aria-labelledby="contained-modal-title-vcenter"
            size="lg"
            centered
            className="add-new-modal"
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Edit Department
            </Modal.Title>
        </Modal.Header>
                <form onSubmit={formik.handleSubmit} >
                    <Modal.Body className="">
                        <Container>        
                        {showAlert && <PopupAlert alertType={alertType} setShowAlert={setShowAlert} message={message}/>}   
                        <Row>
                            <Col lg={6} md={6} sm={12}>
                                    <div className="form-group" id="customSelect-input">
                                    <TextField 
                                        name="name" 
                                        id="name" 
                                        label="Department Name" 
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
                            <Col lg={6} md={6} sm={12}>
                                    <div className="form-group" id="select-input">
                                    <TextField 
                                        select 
                                        name="headId" 
                                        id="headId"
                                        label="H.O.D" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        // value={formik.values.headId}
                                        // onChange={formik.handleChange}
                                        // error={formik.touched.headId && Boolean(formik.errors.headId)}
                                        // helperText={formik.touched.headId && formik.errors.headId}
                                    >
                                        <MenuItem value="">Select HOD</MenuItem>
                                    </TextField>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6} md={6} sm={12}>
                                    <div className="form-group" id="select-input">
                                    <TextField 
                                        select 
                                        name="facultyId" 
                                        id="facultyId" 
                                        label="Faculty" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.facultyId}
                                        onChange={formik.handleChange}
                                        error={formik.touched.facultyId && Boolean(formik.errors.facultyId)}
                                        helperText={formik.touched.facultyId && formik.errors.facultyId}
                                    >
                                        {faculty.map(data => (
                                            <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem> 
                                        ))} 
                                    </TextField>
                                    </div>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                    <div className="form-group" id="select-input">
                                    <TextField 
                                        select
                                        name="schoolId" 
                                        id="schoolId"
                                        label="School"
                                        disabled={true} 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.schoolId}
                                        onChange={formik.handleChange}
                                        error={formik.touched.schoolId && Boolean(formik.errors.schoolId)}
                                        helperText={formik.touched.schoolId && formik.errors.schoolId}
                                    >
                                        {school.map(data => (
                                            <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem> 
                                        ))}  
                                    </TextField>
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

export default EditDepartment