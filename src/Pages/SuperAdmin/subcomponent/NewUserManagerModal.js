import {Modal, Container, Row, Col, Button} from 'react-bootstrap';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {useState, useEffect} from 'react';
import {PopupAlert} from '../../components/Alert';
import {addInstitutionAdmin, getInstitution} from '../../../services/institutionServices';
import {getGender} from '../../../services/commonServices';


const NewUserManagerModal = (props) => {
    const [pryAdmin, setPryAdmin] = useState(true)
    const [institution, setInstitution] = useState([])
    const [gender, setGender] = useState([])
    const[showAlert, setShowAlert] = useState(false) 
    const[alertType, setAlertType] = useState("")
    const[message, setMessage] = useState("")
    const [isSubmit, setIsSubmit] = useState(false)

    const webUser = localStorage.getItem("webUserId")

    useEffect(()=>{
        const fetchData = async() => {
            try{
                const res = await getInstitution()
                setInstitution(res.data)
            }
            catch(err){
                console.log(err.message)
            }
        }
        fetchData()
    }, [])

    useEffect(()=>{
        const fetchData = async () => {
            try{
                let res = await getGender()
                setGender(res.data.genders)
            }
            catch(err){
                console.log(err.message)
            }  
        }
        fetchData()
    }, [])

    const onSubmit = async(data) => {
        data.isPrimary = pryAdmin
        setIsSubmit(true)
        try{
            const res = await addInstitutionAdmin(data)
            if (res.status === 204 || res.status === 200){
                setAlertType("success")
                setMessage("User Manager successfully Added")
                setShowAlert(true)
                setIsSubmit(false)
                props.setContentLength(props.contentLength + 1)
            }
            else{
                setAlertType("danger")
                setMessage("Fail to add User Manager")
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

    const initialValues = {       
        firstName: '',
        lastName: '',
        otherNames: '',
        email: '',
        phoneNumber: '',
        administratorUserName: '',
        administratorPassword: '',
        genderId: '',
        institutionId: '',
        createdBy: webUser
    }

    const validationSchema = Yup.object({
        firstName: Yup.string().required("First Name is Required"),
        lastName: Yup.string().required("Last Name is Required"),
        otherNames: Yup.string(),
        email: Yup.string().email("Enter Valid Email Format").required("Email is Required"),
        phoneNumber: Yup.string().min(10).required("Phone Number is Required"),
        administratorUserName: Yup.string().required("Admin User Name is Required"),
        administratorPassword: Yup.string().min(8).required("Password is required").matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
          ),
        institutionId: Yup.string().required("Institution Name is Required"),
    })
    const formik = useFormik({
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
            Add New User Manager
            </Modal.Title>
        </Modal.Header>
                <form onSubmit={formik.handleSubmit}>
                    <Modal.Body className="">
                        <Container>    
                        {showAlert && <PopupAlert alertType={alertType} setShowAlert={setShowAlert} message={message}/>}  
                        <Row>
                            <Col lg={6} md={6} sm={12}>
                                <div className="form-group">
                                    <TextField 
                                        type="text" 
                                        name="firstName" 
                                        id="firstName" 
                                        placeholder="First Name"
                                        label="First Name" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                        helperText={formik.touched.firstName && formik.errors.firstName}
                                    />
                                </div>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                <div className="form-group">
                                    <TextField 
                                        type="text" 
                                        name="lastName" 
                                        id="lastName"
                                        placeholder="Last Name"
                                        label="Last Name" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                        helperText={formik.touched.lastName && formik.errors.lastName}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6} md={6} sm={12}>
                                    <div className="form-group">
                                    <TextField 
                                        type="text" 
                                        name="otherNames" 
                                        id="otherNames"
                                        placeholder="Other Names"
                                        label="Other Names" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.otherNames}
                                        onChange={formik.handleChange}
                                        error={formik.touched.otherNames && Boolean(formik.errors.otherNames)}
                                        helperText={formik.touched.otherNames && formik.errors.otherNames}
 
                                    />
                                </div>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                    <div className="form-group" id="select-input">
                                    <TextField 
                                        select 
                                        name="genderId" 
                                        id="genderId" 
                                        label="Gender" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.genderId}
                                        onChange={formik.handleChange}
                                        error={formik.touched.genderId && Boolean(formik.errors.genderId)}
                                        helperText={formik.touched.genderId && formik.errors.genderId}
                                    >
                                        <MenuItem value=""> Select Gender </MenuItem>
                                        {gender.map((data)=>(
                                            <MenuItem key={data.id} value={data.id}>{data.name} </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                    <div className="form-group" id="select-input">
                                    <TextField 
                                        select 
                                        name="institutionId" 
                                        id="institutionId" 
                                        label="Institution" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.institutionId}
                                        onChange={formik.handleChange}
                                        error={formik.touched.institutionId && Boolean(formik.errors.institutionId)}
                                        helperText={formik.touched.institutionId && formik.errors.institutionId}
                                    >
                                        <MenuItem value=""> Select Institution </MenuItem>
                                        {institution.map((data)=>(
                                            <MenuItem key={data.id} value={data.id}>{data.name} </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                <FormGroup id="prySwitch">
                                <FormControlLabel
                                    label="Make as primary Admin" 
                                    control={<Switch checked={pryAdmin} onChange={(e) => setPryAdmin(e.target.checked)} color="primary" name="pryAdmin"/>}
                                    
                                />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6} md={6} sm={12}>
                                    <div className="form-group">
                                    <TextField 
                                        type="email" 
                                        name="email" 
                                        id="email" 
                                        placeholder="Email Address"
                                        label="Email Address" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                    />
                                </div>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                    <div className="form-group">
                                    <TextField 
                                        type="tel" 
                                        name="phoneNumber" 
                                        id="phoneNumber" 
                                        placeholder="Phone Number"
                                        label="Phone Number" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.phoneNumber}
                                        onChange={formik.handleChange}
                                        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6} md={6} sm={12}>
                                    <div className="form-group">
                                    <TextField 
                                        type="text" 
                                        name="administratorUserName" 
                                        id="administratorUserName"
                                        placeholder="Admin Username"
                                        label="Admin Username" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.administratorUserName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.administratorUserName && Boolean(formik.errors.administratorUserName)}
                                        helperText={formik.touched.administratorUserName && formik.errors.administratorUserName}    
                                    />
                                </div>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                    <div className="form-group">
                                    <TextField 
                                        type="password" 
                                        name="administratorPassword" 
                                        id="administratorPassword"
                                        placeholder="Admin Password"
                                        label="Admin Password" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.administratorPassword}
                                        onChange={formik.handleChange}
                                        error={formik.touched.administratorPassword && Boolean(formik.errors.administratorPassword)}
                                        helperText={formik.touched.administratorPassword && formik.errors.administratorPassword}    
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            {/* <Col lg={6} md={6} sm={12}>
                                <div className="form-group">
                                    <TextField as="select" name="genderId" id="genderId" className="form-control">
                                        <option value="">Select Gender</option>
                                      
                                    </Field>
                                    <small id="passwordHelpBlock" className="form-text text-danger">
                                        <ErrorMessage name="genderId" />
                                    </small>
                                </div>
                            </Col> */}
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide} className="cancel-btn">Close</Button>
                    <button type="submit" className="submit-btn" disabled={isSubmit ? true : false}>{
                        isSubmit ? "Submitting..." : "Submit"
                    }</button>
                </Modal.Footer>
            </form>
    </Modal>
    )
}

export default NewUserManagerModal
