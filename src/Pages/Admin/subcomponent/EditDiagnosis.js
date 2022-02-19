import {Modal, Container, Row, Col, Button} from 'react-bootstrap';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useState} from 'react';
import {PopupAlert} from '../../components/Alert';
import { editMedicalDiagnosis } from '../../../services/healthService';
import StyledTextField from '../../components/StyledTextField';

const EditDiagnosis = (props) => {
    const[showAlert, setShowAlert] = useState(false) 
    const[alertType, setAlertType] = useState("")
    const [isSubmit, setIsSubmit] = useState(false)
    const[message, setMessage] = useState("")

    
    const onSubmit = async(data) => {
        setIsSubmit(true)
        try {
            const res = await editMedicalDiagnosis(props.data.id, data)
            console.log(res)
            if (res.status === 200 || res.status === 204){
                setIsSubmit(false)
                setAlertType("success")
                setMessage("Medical Diagnosis Updated")
                setShowAlert(true)
                props.setContentLength(props.contentLength + 1)
            }
            else{
                setIsSubmit(false)
                setAlertType("danger")
                setMessage("Failed to Update Medical Diagnosis")
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
        id: props.data.id,
        userID: props.data.userID,
        initialDiagnosis: props.data.initialDiagnosis,
        finalDiagnosis: props.data.finalDiagnosis,
        description: props.data.description,
        treatmentPlan: props.data.treatmentPlan,
        vitalSign: props.data.vitalSign,
        additionDoctorsNote: props.data.additionDoctorsNote
    }

    const validationSchema = Yup.object({
        initialDiagnosis: Yup.string().required("Initial Diagnosis is Required"),
        finalDiagnosis: Yup.string().required("Final Diagnosis is Required"),
        description: Yup.string().required("Description is Required"),
        treatmentPlan: Yup.string().required("Treatment Plan is Required"),
        vitalSign: Yup.string().required("Vital Sign is Required"),
        additionDoctorsNote: Yup.string(),

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
                Edit Diagnosis
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
                                        name="initialDiagnosis" 
                                        id="initialDiagnosis" 
                                        label="Initial Diagnosis" 
                                        margin="normal"
                                        placeholder="Initial Diagnosis"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.initialDiagnosis}
                                        onChange={formik.handleChange}
                                        error={formik.touched.initialDiagnosis && Boolean(formik.errors.initialDiagnosis)}
                                        helperText={formik.touched.initialDiagnosis && formik.errors.initialDiagnosis}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12} md={12} sm={12}>
                                    <div className="form-group" id="new-session-textfield">
                                    <StyledTextField 
                                        name="finalDiagnosis" 
                                        id="finalDiagnosis" 
                                        label="Final Diagnosis" 
                                        margin="normal"
                                        placeholder="Final Diagnosis"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.finalDiagnosis}
                                        onChange={formik.handleChange}
                                        error={formik.touched.finalDiagnosis && Boolean(formik.errors.finalDiagnosis)}
                                        helperText={formik.touched.finalDiagnosis && formik.errors.finalDiagnosis}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12} md={12} sm={12}>
                                    <div className="form-group" id="new-session-textfield">
                                    <StyledTextField 
                                        name="description" 
                                        id="description" 
                                        label="Description" 
                                        margin="normal"
                                        placeholder="Description"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        error={formik.touched.description && Boolean(formik.errors.description)}
                                        helperText={formik.touched.description && formik.errors.description}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12} md={12} sm={12}>
                                    <div className="form-group" id="new-session-textfield">
                                    <StyledTextField 
                                        name="treatmentPlan" 
                                        id="treatmentPlan" 
                                        label="Treatment Plan" 
                                        margin="normal"
                                        placeholder="Treatment Plan"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.treatmentPlan}
                                        onChange={formik.handleChange}
                                        error={formik.touched.treatmentPlan && Boolean(formik.errors.treatmentPlan)}
                                        helperText={formik.touched.treatmentPlan && formik.errors.treatmentPlan}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12} md={12} sm={12}>
                                    <div className="form-group" id="new-session-textfield">
                                    <StyledTextField 
                                        name="vitalSign" 
                                        id="vitalSign" 
                                        label="Vital Sign" 
                                        margin="normal"
                                        placeholder="Vital Sign"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.vitalSign}
                                        onChange={formik.handleChange}
                                        error={formik.touched.vitalSign && Boolean(formik.errors.vitalSign)}
                                        helperText={formik.touched.vitalSign && formik.errors.vitalSign}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12} md={12} sm={12}>
                                    <div className="form-group" id="new-session-textfield">
                                    <StyledTextField 
                                        name="additionDoctorsNote" 
                                        id="additionDoctorsNote" 
                                        label="Additional Note" 
                                        margin="normal"
                                        placeholder="Additional Note"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.additionDoctorsNote}
                                        onChange={formik.handleChange}
                                        error={formik.touched.additionDoctorsNote && Boolean(formik.errors.additionDoctorsNote)}
                                        helperText={formik.touched.additionDoctorsNote && formik.errors.additionDoctorsNote}
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

export default EditDiagnosis