import {Modal, Container, Row, Col, Button} from 'react-bootstrap';
import {useFormik} from 'formik';
import TextField from '@material-ui/core/TextField';
import {makeStyles} from '@material-ui/core';
import * as Yup from 'yup';
import {useState} from 'react';
import {PopupAlert} from '../../components/Alert';
import {getInstitutionId, getWebUserId} from '../../../utils/Functions';
import {createSession} from '../../../services/institutionAdminServices';

// makestyles function to style material ui components
const useStyles = makeStyles({
    field: {
        marginLeft: -20,
        width: 260
    }
})

const NewSession = (props) => {
    //material ui style class
    const classes = useStyles()

    //Popup Alert state
    const[showAlert, setShowAlert] = useState(false) 
    const[alertType, setAlertType] = useState("")
    const[message, setMessage] = useState("")

    //Submission State
    const[isSubmit, setIsSubmit] = useState(false)

    //Current year & following year variable
    const currentYear = new Date().getFullYear()
    const nextYear = currentYear + 1

    //get institutionId and current user Id from local storage
    const institutionId = getInstitutionId()
    const userId = getWebUserId()

    //Form submission function
    const onSubmit = async(data) => {
        setIsSubmit(true)
        try{
            const res = await createSession(data)
            if (res.status === 200 || res.status === 204){
                setAlertType("success")
                setMessage("New Session Added Successfully")
                setShowAlert(true)
                setIsSubmit(false)
                props.setContentLength(props.contentLength + 1)
            }
            else{
                setAlertType("danger")
                setMessage("Fail to Create Session")
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
        name: '',
        institutionId: institutionId,
        description: '',
        createdBy: userId,
        yearFrom: currentYear,
        yearTo: nextYear

    }

    //Form Validation Schema
    const validationSchema = Yup.object({
        name: Yup.string().required("Session is Required"),
        description: Yup.string().required(" Description is Required "),
        yearFrom: Yup.number().required("Start Year is required"),
        yearTo: Yup.number().required("End Year is required")
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
                Add New Session
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
                                        label="Session Name" 
                                        placeholder="Session Name"
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
                                <Col lg={12} md={12} sm={12}>
                                    <div className="form-group">
                                    <TextField 
                                        className={classes.field}
                                        name="description" 
                                        id="description" 
                                        label="Description" 
                                        placeholder="Description"
                                        margin="normal"
                                        fullWidth
                                        multiline
                                        row={20}
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
                                <Col lg={12} md={12} sm={12}>
                                    <div className="form-group" id="new-session-textfield">
                                    <TextField 
                                        type="number"
                                        min="1900" 
                                        max="2099" 
                                        step="1"
                                        name="yearFrom" 
                                        id="yearFrom" 
                                        label="From" 
                                        placeholder="From"
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.yearFrom}
                                        onChange={formik.handleChange}
                                        error={formik.touched.yearFrom && Boolean(formik.errors.yearFrom)}
                                        helperText={formik.touched.yearFrom && formik.errors.yearFrom}
                                    />
                                </div>
                                </Col>
                                <Col lg={12} md={12} sm={12}>
                                    <div className="form-group" id="new-session-textfield">
                                    <TextField 
                                        type="number"
                                        min="1900" 
                                        max="2099" 
                                        step="1"
                                        name="yearTo" 
                                        id="yearTo" 
                                        label="To" 
                                        placeholder="To"
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.yearTo}
                                        onChange={formik.handleChange}
                                        error={formik.touched.yearTo && Boolean(formik.errors.yearTo)}
                                        helperText={formik.touched.yearTo && formik.errors.yearTo}
                                    />
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

export default NewSession