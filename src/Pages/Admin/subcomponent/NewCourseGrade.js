import {Modal, Container, Row, Col, Button} from 'react-bootstrap';
import {useFormik} from 'formik';
import TextField from '@material-ui/core/TextField';
import * as Yup from 'yup';
import {useState} from 'react';
import {PopupAlert} from '../../components/Alert';
import {getInstitutionId, getWebUserId} from '../../../utils/Functions';
import {createCourseGrade} from '../../../services/institutionAdminServices';

const NewCourseGrade = (props) => {
    const[showAlert, setShowAlert] = useState(false) 
    const[alertType, setAlertType] = useState("")
    const[message, setMessage] = useState("")
    const [isSubmit, setIsSubmit] = useState(false)
    const institutionId = getInstitutionId()
    const userId = getWebUserId()

    
    const onSubmit = async(data) => {
        console.log(data)
        setIsSubmit(true)
        try {
            const res = await createCourseGrade(data)
            if (res.status === 200 || res.status === 204){
                setIsSubmit(false)
                setAlertType("success")
                setMessage("Course Grade Created Successfully")
                setShowAlert(true)
                props.setContentLength(props.contentLength + 1)
            }
            else{
                setIsSubmit(false)
                setAlertType("danger")
                setMessage("Failed to Create Course Grade")
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
        code: '',
        remark: '',
        gradeScore: 0,
        minimumScore: 0,
        maximumScore: 0,
        institutionId: institutionId,
        createdBy: userId
    }

    const validationSchema = Yup.object({
        code: Yup.string().required("Grade Code is Required"),
        remark: Yup.string().required("Grade Remark is Required "),
        gradeScore: Yup.number().required("Grade Score is Required "),
        minimumScore: Yup.number().required("Grade Score is Required "),
        maximumScore: Yup.number().required("Maximum Score is Required ")
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
                Add New Course Grade
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
                                        name="code" 
                                        id="code" 
                                        label="Grade Code" 
                                        margin="normal"
                                        placeholder="Grade Code"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.code}
                                        onChange={formik.handleChange}
                                        error={formik.touched.code && Boolean(formik.errors.code)}
                                        helperText={formik.touched.code && formik.errors.code}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12} md={12} sm={12}>
                                    <div className="form-group" id="new-session-textfield">
                                    <TextField 
                                        name="remark" 
                                        id="remark" 
                                        placeholder="Remark"
                                        label="Remark" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.remark}
                                        onChange={formik.handleChange}
                                        error={formik.touched.remark && Boolean(formik.errors.remark)}
                                        helperText={formik.touched.remark && formik.errors.remark}
                                        />
                                    </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12} md={12} sm={12}>
                                    <div className="form-group" id="new-session-textfield">
                                    <TextField 
                                        type="number"
                                        name="gradeScore" 
                                        id="gradeScore" 
                                        label="Grade Score" 
                                        margin="normal"
                                        placeholder="Grade Score"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        inputProps={{
                                        min: "0",
                                        }}
                                        variant="outlined"
                                        value={formik.values.gradeScore}
                                        onChange={formik.handleChange}
                                        error={formik.touched.gradeScore && Boolean(formik.errors.gradeScore)}
                                        helperText={formik.touched.gradeScore && formik.errors.gradeScore}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12} md={12} sm={12}>
                                    <div className="form-group" id="new-session-textfield">
                                    <TextField 
                                        type="number"
                                        name="minimumScore" 
                                        id="minimumScore" 
                                        placeholder="Minimum Score"
                                        label="Minimum Score" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.minimumScore}
                                        onChange={formik.handleChange}
                                        error={formik.touched.minimumScore && Boolean(formik.errors.minimumScore)}
                                        helperText={formik.touched.minimumScore && formik.errors.minimumScore}
                                        />
                                    </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12} md={12} sm={12}>
                                    <div className="form-group" id="new-session-textfield">
                                    <TextField 
                                        type="number"
                                        name="maximumScore" 
                                        id="maximumScore" 
                                        placeholder="Maximum Score"
                                        label="Maximum Score" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.maximumScore}
                                        onChange={formik.handleChange}
                                        error={formik.touched.maximumScore && Boolean(formik.errors.maximumScore)}
                                        helperText={formik.touched.maximumScore && formik.errors.maximumScore}
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

export default NewCourseGrade