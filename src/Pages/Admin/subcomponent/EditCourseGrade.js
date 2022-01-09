import {Modal, Container, Row, Col, Button} from 'react-bootstrap';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useState} from 'react';
import {PopupAlert} from '../../components/Alert';
import {editCourseGrade} from '../../../services/institutionAdminServices';
import StyledTextField from '../../components/StyledTextField';

const EditCourseGrade = (props) => {
    const {data} = props
    const[showAlert, setShowAlert] = useState(false) 
    const[alertType, setAlertType] = useState("")
    const[message, setMessage] = useState("")
    const [isSubmit, setIsSubmit] = useState(false)

    
    const onSubmit = async(editData) => {
        setIsSubmit(true)
        try {
            const res = await editCourseGrade(data.id, editData)
            if (res.status === 200 || res.status === 204){
                setIsSubmit(false)
                setAlertType("success")
                setMessage("Course Grade Edited Successfully")
                setShowAlert(true)
                props.setContentLength(props.contentLength + 1)
            }
            else{
                setIsSubmit(false)
                setAlertType("danger")
                setMessage("Failed to Edit Course Grade")
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
        startingScore: data.startingScore,
        endingScore: data.endingScore,
        gradePoint: data.gradePoint,
        letterGrade: data.letterGrade
    }

    const validationSchema = Yup.object({
        startingScore: Yup.number().required("Minimum Score is Required"),
        endingScore: Yup.number().required("Maximum Score is Required "),
        gradePoint: Yup.number().required("Grade Point is Required "),
        letterGrade: Yup.string().required("Grade is Required "),
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
                Edit Course Grade
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
                                        name="letterGrade" 
                                        id="letterGrade" 
                                        label="Grade" 
                                        margin="normal"
                                        placeholder="Grade"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.letterGrade}
                                        onChange={formik.handleChange}
                                        error={formik.touched.letterGrade && Boolean(formik.errors.letterGrade)}
                                        helperText={formik.touched.letterGrade && formik.errors.letterGrade}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12} md={12} sm={12}>
                                    <div className="form-group" id="new-session-textfield">
                                    <StyledTextField 
                                        type="number"
                                        name="gradePoint" 
                                        id="gradePoint" 
                                        label="Grade Point" 
                                        margin="normal"
                                        placeholder="Grade Point"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        inputProps={{
                                        min: "0",
                                        }}
                                        variant="outlined"
                                        value={formik.values.gradePoint}
                                        onChange={formik.handleChange}
                                        error={formik.touched.gradePoint && Boolean(formik.errors.gradePoint)}
                                        helperText={formik.touched.gradePoint && formik.errors.gradePoint}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12} md={12} sm={12}>
                                    <div className="form-group" id="new-session-textfield">
                                    <StyledTextField 
                                        type="number"
                                        name="startingScore" 
                                        id="startingScore" 
                                        placeholder="Minimum Score"
                                        label="Minimum Score" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.startingScore}
                                        onChange={formik.handleChange}
                                        error={formik.touched.startingScore && Boolean(formik.errors.startingScore)}
                                        helperText={formik.touched.startingScore && formik.errors.startingScore}
                                        />
                                    </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12} md={12} sm={12}>
                                    <div className="form-group" id="new-session-textfield">
                                    <StyledTextField 
                                        type="number"
                                        name="endingScore" 
                                        id="endingScore" 
                                        placeholder="Maximum Score"
                                        label="Maximum Score" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.endingScore}
                                        onChange={formik.handleChange}
                                        error={formik.touched.endingScore && Boolean(formik.errors.endingScore)}
                                        helperText={formik.touched.endingScore && formik.errors.endingScore}
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

export default EditCourseGrade