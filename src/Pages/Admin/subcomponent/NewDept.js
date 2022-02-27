import {Modal, Container, Row, Col, Button} from 'react-bootstrap';
import {useFormik} from 'formik';
import MenuItem from '@material-ui/core/MenuItem';
import * as Yup from 'yup';
import {useState, useEffect} from 'react';
import {PopupAlert} from '../../components/Alert';
import {createDepartment, getSchool} from '../../../services/institutionAdminServices';
import StyledTextField from '../../components/StyledTextField';

const NewDepartment = (props) => {
    const[showAlert, setShowAlert] = useState(false) 
    const[alertType, setAlertType] = useState("")
    const[message, setMessage] = useState("")
    const [isSubmit, setIsSubmit] = useState(false)
    const [school, setSchool] = useState([])

    useEffect(() => {
        const fetchData = async() => {
            const res = await getSchool()
            const data = res.data
            setSchool(data)
        } 
        fetchData()
    }, [])

    const onSubmit = async(data) => {
        setIsSubmit(true)
        try {
            const res = await createDepartment(data)
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
            setIsSubmit(false)
            setAlertType("danger")
            setMessage(err.response.data.message)
            setShowAlert(true)
        }
    }

    const initialValues = {
        name: '',
        schoolId: '',
    }

    const validationSchema = Yup.object({
        name: Yup.string().required("Department Name is Required"),
        schoolId: Yup.string().required("School Name is Required"),
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
            size="lg"
            centered
            className="add-new-modal"
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Add New Department
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
                                    <StyledTextField 
                                        select
                                        name="schoolId" 
                                        id="schoolId"
                                        label="School"
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

export default NewDepartment