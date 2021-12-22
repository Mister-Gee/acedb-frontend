import {Modal, Container, Row, Col, Button} from 'react-bootstrap';
import {useFormik} from 'formik';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import * as Yup from 'yup';
import {useState, useEffect} from 'react';
import {PopupAlert} from '../../components/Alert';
import {getInstitutionId, getWebUserId} from '../../../utils/Functions';
import {editFaculty, getSchool} from '../../../services/institutionAdminServices';

const EditFaculty = (props) => {
    const {data} = props
    const[showAlert, setShowAlert] = useState(false) 
    const[alertType, setAlertType] = useState("")
    const[message, setMessage] = useState("")
    const [isSubmit, setIsSubmit] = useState(false)
    const [school, setSchool] = useState([])
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
            const res = await editFaculty(data.id, data.name, data.schoolId, data.headId, data.institutionId, data.createdBy)
            console.log(res)
            if (res.status === 200 || res.status === 204){
                setIsSubmit(false)
                setAlertType("success")
                setMessage("Faculty Edited Successfully")
                setShowAlert(true)
                props.setContentLength(props.contentLength + 1)
            }
            else{
                setIsSubmit(false)
                setAlertType("danger")
                setMessage("Failed to Edit Faculty")
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
        headId: data.headId,
        schoolId: data.schoolId,
        createdBy: userId

    }

    const validationSchema = Yup.object({
        name: Yup.string().required("Faculty Name is Required"),
        // headId: Yup.string().required("Faculty Dean is Required "),
        schoolId: Yup.string().required("school is Required ")
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
                Edit Faculty
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
                                        label="Faculty Name" 
                                        margin="normal"
                                        placeholder="Faculty Name"
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
                                        name="headId" 
                                        id="headId" 
                                        placeholder="Faculty Head"
                                        label="Faculty Head" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        // value={formik.values.headId}
                                        // onChange={formik.handleChange}
                                        // error={formik.touched.headId && Boolean(formik.errors.headId)}
                                        // helperText={formik.touched.headId && formik.errors.headId}
                                    />
                                    </div>
                            </Col>
                        </Row>
                        <Row>
                            
                            <Col lg={12} md={12} sm={12}>
                                    <div className="form-group" id="new-session-textfield">
                                    <TextField 
                                        select
                                        name="schoolId" 
                                        id="schoolId" 
                                        placeholder="School"
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

export default EditFaculty