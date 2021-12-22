import {Modal, Container, Row, Col, Button} from 'react-bootstrap';
import {useFormik} from 'formik';
import TextField from '@material-ui/core/TextField';
import * as Yup from 'yup';
import {useState, useEffect} from 'react';
import {PopupAlert} from '../../components/Alert';
import {getInstitutionId, getWebUserId} from '../../../utils/Functions';
import {createSemester, getSession} from '../../../services/institutionAdminServices';
import { MenuItem } from '@material-ui/core';

const NewSemester = (props) => {
    // Popup Alert State
    const[showAlert, setShowAlert] = useState(false) 
    const[alertType, setAlertType] = useState("")
    const[message, setMessage] = useState("")

    //Current Semester Session State
    const[sessionData, setSessionData] = useState([])

    //Submit State
    const[isSubmit, setIsSubmit] = useState(false)

    //Get Institution Id and Current User from Local Storage
    const institutionId = getInstitutionId()
    const userId = getWebUserId()

    //Fetch Data on Render
    useEffect(() => {
        const fetchData = async() => {
            try{
                const res = await getSession(institutionId)
                const data = res.data
                setSessionData(data)
            }
            catch(err){
                console.log(err.message)
            }
        }
        fetchData()
    }, [institutionId])
    
    //Submit New Semester Function
    const onSubmit = async(data) => {
        setIsSubmit(true)
        try{
            const res = await createSemester(data)
            if (res.status === 200 || res.status === 204){
                setAlertType("success")
                setMessage("New Semester Added Successfully")
                setShowAlert(true)
                setIsSubmit(false)
            }
            else{
                setAlertType("danger")
                setMessage("Fail to Create Semester")
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

    //For Initial Value
    const initialValues = {
        name: '',
        institutionId: institutionId,
        sessionId: props.sessionId,
        createdBy: userId,
        startDate: '',
        endDate: ''
    }

    //Form Validation Schema
    const validationSchema = Yup.object({
        name: Yup.string().required("Semester Name is Required"),
        sessionId: Yup.string().required("Session is Required"),
        startDate: Yup.string().required("Start Date is required"),
        endDate: Yup.string().required("End Date is required")
    })

    //Formik Hook
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
                Add New Semester
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
                                        select
                                        name="sessionId" 
                                        id="sessionId" 
                                        label="Session" 
                                        placeholder="sessionId"
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.sessionId}
                                        onChange={formik.handleChange}
                                        error={formik.touched.sessionId && Boolean(formik.errors.sessionId)}
                                        helperText={formik.touched.sessionId && formik.errors.sessionId}
                                    >
                                        {sessionData.map(data => (
                                            <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                </Col>
                                <Col lg={12} md={12} sm={12}>
                                    <div className="form-group" id="new-session-textfield">
                                    <TextField 
                                        name="name" 
                                        id="name" 
                                        label="Semester Name" 
                                        placeholder="Semester Name"
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
                                {/* <Col lg={12} md={12} sm={12}>
                                    <div className="form-group" id="select-textarea">
                                    <TextField 
                                        name="description" 
                                        id="description" 
                                        label="Description" 
                                        placeholder="Description"
                                        margin="normal"
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
                                </Col> */}
                                <Col lg={12} md={12} sm={12}>
                                    <div className="form-group" id="new-session-textfield">
                                    <TextField 
                                        type="date"
                                        name="startDate" 
                                        id="startDate" 
                                        label="From" 
                                        placeholder="From"
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.startDate}
                                        onChange={formik.handleChange}
                                        error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                                        helperText={formik.touched.startDate && formik.errors.startDate}
                                    />
                                </div>
                                </Col>
                                <Col lg={12} md={12} sm={12}>
                                    <div className="form-group" id="new-session-textfield">
                                    <TextField 
                                        type="date"
                                        name="endDate" 
                                        id="endDate" 
                                        label="To" 
                                        placeholder="To"
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.endDate}
                                        onChange={formik.handleChange}
                                        error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                                        helperText={formik.touched.endDate && formik.errors.endDate}
                                    />
                                </div>
                                </Col>
                        </Row>  
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide} className="cancel-btn">Close</Button>
                    <button type="submit" className="submit-btn" disabled={isSubmit}>{isSubmit ? "Submitting" : "Submit" }<span className="iconify" data-icon="entypo:arrow-long-right" data-inline="false"></span></button>
                </Modal.Footer>
            </form>
    </Modal>
    )
}

export default NewSemester