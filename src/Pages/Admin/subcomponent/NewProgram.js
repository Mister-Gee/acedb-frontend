import {Modal, Container, Row, Col, Button} from 'react-bootstrap';
import {useFormik} from 'formik';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import * as Yup from 'yup';
import {useState, useEffect} from 'react';
import {PopupAlert} from '../../components/Alert';
import {getInstitutionId, getWebUserId} from '../../../utils/Functions';
import {createProgram, getDepartment} from '../../../services/institutionAdminServices';

const NewProgram = (props) => {
    const[showAlert, setShowAlert] = useState(false) 
    const[alertType, setAlertType] = useState("")
    const[message, setMessage] = useState("") 
    const [isSubmit, setIsSubmit] = useState(false)
    const [department, setDepartment] = useState([])
    const institutionId = getInstitutionId()
    const userId = getWebUserId()

    useEffect(() => {
        const fetchData = async() => {
            const res = await getDepartment(institutionId)
            const data = res.data
            setDepartment(data)
        } 
        fetchData()
    }, [institutionId])


    
    const onSubmit = async(data) => {
        setIsSubmit(true)
        try {
            const res = await createProgram(data)
            if (res.status === 200 || res.status === 204){
                setIsSubmit(false)
                setAlertType("success")
                setMessage("Program Created Successfully")
                setShowAlert(true)
                props.setContentLength(props.contentLength + 1)
            }
            else{
                setIsSubmit(false)
                setAlertType("danger")
                setMessage("Failed to Create Program")
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
        name: '',
        institutionId: institutionId,
        departmentId: '',
        createdBy: userId
    }

    const validationSchema = Yup.object({
        name: Yup.string().required("Program Name is Required"),
        departmentId: Yup.string().required("Department is Required ")
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
                Add New Program
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
                                        label="Program Name" 
                                        margin="normal"
                                        placeholder="Program Name"
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
                                        name="departmentId" 
                                        id="departmentId" 
                                        placeholder="Department"
                                        label="Department" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.departmentId}
                                        onChange={formik.handleChange}
                                        error={formik.touched.departmentId && Boolean(formik.errors.departmentId)}
                                        helperText={formik.touched.departmentId && formik.errors.departmentId}
                                        >
                                        {department.map(data => (
                                           <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem> 
                                        ))}
                                    </TextField>
                                    </div>
                            </Col>
                        </Row>
                        {/* <Row>
                            <Col lg={12} md={12} sm={12}>
                                    <div className="form-group" id="new-session-textfield">
                                    <TextField 
                                        select
                                        name="school" 
                                        id="school" 
                                        placeholder="School"
                                        label="School" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.school}
                                        onChange={formik.handleChange}
                                        error={formik.touched.school && Boolean(formik.errors.school)}
                                        helperText={formik.touched.school && formik.errors.school}
                                    >
                                        <MenuItem value="HODHOD">Computer Science</MenuItem>
                                    </TextField>
                                    </div>
                            </Col>
                        </Row> */}
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

export default NewProgram