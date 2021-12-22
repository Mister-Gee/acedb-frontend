import {Modal, Container, Row, Col} from 'react-bootstrap';
import {useFormik} from 'formik';
import TextField from '@material-ui/core/TextField';
import * as Yup from 'yup';
import {useState, useEffect, useRef} from 'react';
import {PopupAlert} from '../../components/Alert';
import {getInstitutionId, getWebUserId} from '../../../utils/Functions';
import {GetCommonData, getLGA, getState} from '../../../services/commonServices';
import {getSchool, getFaculty, getDepartment, getProgram} from '../../../services/institutionAdminServices';
import { MenuItem, makeStyles, Button, InputAdornment } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles({
    field: {
        height: 40
    }
})

const NewStaff = (props) => {

    const handleFileInput = useRef()

    const handleClick = (event) => {
        handleFileInput.current.click();
    }

    const classes = useStyles()

    // Popup Alert State
    const[showAlert, setShowAlert] = useState(false) 
    const[alertType, setAlertType] = useState("")
    const[message, setMessage] = useState("")

    //Title data
    const [gender, setGender] = useState([])
    const [maritalStatus, setMaritalStatus] = useState([])

    //School data State
    const [school, setSchool] = useState([])
    const [faculty, setFaculty] = useState([])
    const [department, setDepartment] = useState([])
    const [program, setProgram] = useState([])

    //Submit State
    const[isSubmit, setIsSubmit] = useState(false)

    //Get Institution Id and Current User from Local Storage
    const institutionId = getInstitutionId()
    const userId = getWebUserId()

    //Fetch Data on Render
    // useEffect(() => {
    //     const fetchData = async() => {
    //         try{
               
    //         }
    //         catch(err){
    //             console.log(err.message)
    //         }
    //     }
    //     fetchData()
    // }, [institutionId])

    //Fetch Title

    useEffect(() => {
        const fetchData = async() => {
            try{
                const res = await GetCommonData()
                setGender(res.data.genders)
                setMaritalStatus(res.data.maritalStatus)
            }
            catch(err){
                console.log(err.message)
            }
        }
        fetchData()
    })
    
    //Submit New Semester Function
    const onSubmit = async(data) => {
        console.log(data)
    //     setIsSubmit(true)
    //     try{
    //         const res = await createSemester(data)
    //         if (res.status === 200 || res.status === 204){
    //             setAlertType("success")
    //             setMessage("New Semester Added Successfully")
    //             setShowAlert(true)
    //             setIsSubmit(false)
    //         }
    //         else{
    //             setAlertType("danger")
    //             setMessage("Fail to Create Semester")
    //             setShowAlert(true)
    //             setIsSubmit(false)
    //         }
    //     }
    //     catch(err){
    //         console.log(err.message)
    //         setAlertType("danger")
    //         setMessage("Network Error")
    //         setShowAlert(true)
    //         setIsSubmit(false)
    //     }
    }

    //For Initial Value
    const initialValues = {
        staffId: '',
        role: '',
        designation: '',
        department: '',
        genderId: '',
        maritalStatusId: '',
        institutionId: institutionId,
        email: '',
        phoneNumber: '',
        emergencyContact: '',
        dateOfBirth: '',
        employmentStartDate: '',
        contactAddress: '',
        createdBy: userId,
        photo: ''
    }

    //Form Validation Schema
    const validationSchema = Yup.object({
        staffId: Yup.string().required("Staff ID is Required"),
        role: Yup.string().required("Role is Required"),
        designation: Yup.string().required("Designation is Required"),
        department: Yup.string().required("Department is Required"),
        genderId: Yup.string().required("Gender is Required"),
        firstName: Yup.string().required("First Name is Required"),
        lastName: Yup.string().required("Last Name is Required"),
        maritalStatusId: Yup.string().required("Marital Status is Required"),
        email: Yup.string().email("Valid Email is Required").required("Email Address is Required"),
        phoneNumber: Yup.string().min(10).required("Phone Number is Required"),
        emergencyContact: Yup.string().min(10).required("Emergency Contact is Required"),
        dateOfBirth: Yup.string().required("Date of Birth is Required"),
        employmentStartDate: Yup.string().required("Employment Start Date is Required"),
        contactAddress: Yup.string().required("Contact Address is Required"),
        photo: ''
    })

    //Formik Hook
    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        onSubmit,
        validationSchema
    })


    useEffect(() => {
        const fetchData = async() => {
            try{
                const res = await getSchool(institutionId)
                setSchool(res.data)
            }
            catch(err){
                console.log(err.message)
            }
        }
        fetchData()
    }, [institutionId])

    useEffect(() => {
        const fetchData = async() => {
            try{
                const res = await getFaculty(institutionId, formik.values.schoolId)
                setFaculty(res.data)
            }
            catch(err){
                console.log(err.message)
            }
        }
        fetchData()
    }, [institutionId, formik.values.schoolId])

    useEffect(() => {
        const fetchData = async() => {
            try{
                const res = await getDepartment(institutionId, formik.values.schoolId, formik.values.facultyId)
                setDepartment(res.data)
            }
            catch(err){
                console.log(err.message)
            }
        }
        fetchData()
    }, [institutionId, formik.values.schoolId, formik.values.facultyId])

    useEffect(() => {
        const fetchData = async() => {
            try{
                const res = await getProgram(institutionId, formik.values.departmentId)
                setProgram(res.data)
            }
            catch(err){
                console.log(err.message)
            }
        }
        fetchData()
    }, [institutionId, formik.values.departmentId])



    return (
        <Modal {...props} 
            aria-labelledby="contained-modal-title-vcenter"
            size="xl"
            centered
            className="add-new-modal"
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Staff Details (Basic Information)
            </Modal.Title>
        </Modal.Header>
                <form onSubmit={formik.handleSubmit} >
                    <Modal.Body className="">
                        <Container>        
                        {showAlert && <PopupAlert alertType={alertType} setShowAlert={setShowAlert} message={message}/>}   
                        <Row>
                            <Col lg={3}>
                            <div className="form-group">
                                    <TextField 
                                        name="staffId" 
                                        id="staffId" 
                                        label="Staff ID" 
                                        placeholder="Staff ID"
                                        margin="normal"
                                        fullWidth
                                        size="small"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        inputProps={{
                                            style: {
                                                height: 40
                                            }
                                        }}
                                        variant="outlined"
                                        value={formik.values.staffId}
                                        onChange={formik.handleChange}
                                        error={formik.touched.staffId && Boolean(formik.errors.staffId)}
                                        helperText={formik.touched.staffId && formik.errors.staffId}
                                    />
                                </div>
                            </Col>
                            <Col lg={3}>
                                <TextField 
                                    select
                                    name="role" 
                                    id="role" 
                                    label="Role" 
                                    placeholder="Role"
                                    margin="normal"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    variant="outlined"
                                    value={formik.values.role}
                                    onChange={formik.handleChange}
                                    error={formik.touched.role && Boolean(formik.errors.role)}
                                    helperText={formik.touched.role && formik.errors.role}
                                >
                                    <MenuItem>Role</MenuItem>
                                </TextField>
                            </Col>
                            <Col lg={3}>
                                <TextField 
                                    select
                                    name="designation" 
                                    id="designation" 
                                    label="Designation" 
                                    placeholder="Designation"
                                    margin="normal"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    variant="outlined"
                                    value={formik.values.designation}
                                    onChange={formik.handleChange}
                                    error={formik.touched.designation && Boolean(formik.errors.designation)}
                                    helperText={formik.touched.designation && formik.errors.designation}
                                >
                                    <MenuItem>Lecturer</MenuItem>
                                </TextField>
                            </Col>
                            <Col lg={3}>
                                <TextField 
                                    select
                                    name="department" 
                                    id="department" 
                                    label="Department" 
                                    placeholder="Department"
                                    margin="normal"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    variant="outlined"
                                    value={formik.values.department}
                                    onChange={formik.handleChange}
                                    error={formik.touched.department && Boolean(formik.errors.department)}
                                    helperText={formik.touched.department && formik.errors.department}
                                >
                                    <MenuItem>Department of Law</MenuItem>
                                </TextField>
                            </Col>
                            <Col lg={3}>
                            <div className="form-group">
                                    <TextField 
                                        select
                                        name="genderId" 
                                        id="genderId" 
                                        label="Gender" 
                                        placeholder="Gender"
                                        margin="normal"
                                        fullWidth
                                        size="small"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.genderId}
                                        onChange={formik.handleChange}
                                        error={formik.touched.genderId && Boolean(formik.errors.genderId)}
                                        helperText={formik.touched.genderId && formik.errors.genderId}
                                    >
                                        {gender.map(data => (
                                            <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                            </Col>
                            <Col lg={3}>
                                <TextField 
                                    className={classes.Input}
                                    name="firstName" 
                                    id="firstName" 
                                    label="First Name" 
                                    placeholder="First Name"
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    inputProps={{
                                        style: {
                                            height: 40
                                        }
                                    }}
                                    variant="outlined"
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                    helperText={formik.touched.firstName && formik.errors.firstName}
                                />
                            </Col>
                            <Col lg={3}>
                                <TextField 
                                    className={classes.Input}
                                    name="lastName" 
                                    id="lastName" 
                                    label="Last Name" 
                                    placeholder="Last Name"
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    inputProps={{
                                        style: {
                                            height: 40
                                        }
                                    }}
                                    variant="outlined"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                    helperText={formik.touched.lastName && formik.errors.lastName}
                                />
                            </Col>
                            <Col lg={3}>
                                <TextField 
                                    className={classes.Input}
                                    name="otherName" 
                                    id="otherName" 
                                    label="Other Name" 
                                    placeholder="Other Name"
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    inputProps={{
                                        style: {
                                            height: 40
                                        }
                                    }}
                                    variant="outlined"
                                    value={formik.values.otherName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.otherName && Boolean(formik.errors.otherName)}
                                    helperText={formik.touched.otherName && formik.errors.otherName}
                                />
                            </Col>
                            <Col lg={3}>
                                <TextField 
                                    select
                                    name="maritalStatusId" 
                                    id="maritalStatusId" 
                                    label="Marital Status" 
                                    placeholder="MaritalStatus"
                                    margin="normal"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    variant="outlined"
                                    value={formik.values.maritalStatusId}
                                    onChange={formik.handleChange}
                                    error={formik.touched.maritalStatusId && Boolean(formik.errors.maritalStatusId)}
                                    helperText={formik.touched.maritalStatusId && formik.errors.maritalStatusId}
                                >
                                    {maritalStatus.map(data => (
                                        <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                                    ))}
                                </TextField>
                            </Col>
                            <Col lg={3}>
                                <TextField 
                                    className={classes.Input}
                                    name="email" 
                                    id="email" 
                                    label="Email" 
                                    placeholder="Email"
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    inputProps={{
                                        style: {
                                            height: 40
                                        }
                                    }}
                                    variant="outlined"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                            </Col>
                            <Col lg={3}>
                                <TextField 
                                    className={classes.Input}
                                    name="phoneNumber" 
                                    id="phoneNumber" 
                                    label="Phone Number" 
                                    placeholder="Phone Number"
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    inputProps={{
                                        style: {
                                            height: 40
                                        }
                                    }}
                                    variant="outlined"
                                    value={formik.values.phoneNumber}
                                    onChange={formik.handleChange}
                                    error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                    helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                />
                            </Col>
                            <Col lg={3}>
                                <div className="form-group">
                                    <TextField 
                                        className={classes.Input}
                                        name="emergencyContact" 
                                        id="emergencyContact" 
                                        label="Emergency Contact" 
                                        placeholder="Emergency Contact"
                                        margin="normal"
                                        fullWidth
                                        size="small"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        inputProps={{
                                            style: {
                                                height: 40
                                            }
                                        }}
                                        variant="outlined"
                                        value={formik.values.emergencyContact}
                                        onChange={formik.handleChange}
                                        error={formik.touched.emergencyContact && Boolean(formik.errors.emergencyContact)}
                                        helperText={formik.touched.emergencyContact && formik.errors.emergencyContact}
                                    />
                                </div>
                            </Col>
                            <Col lg={3}>
                                <TextField 
                                    type="date"
                                    name="dateOfBirth" 
                                    id="dateOfBirth" 
                                    label="Date of Birth" 
                                    placeholder="Date of Birth"
                                    margin="normal"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    inputProps={{
                                        style: {
                                            height: 40
                                        }
                                    }}
                                    variant="outlined"
                                    value={formik.values.dateOfBirth}
                                    onChange={formik.handleChange}
                                    error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
                                    helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                                />
                            </Col>
                            <Col lg={3}>
                                <TextField 
                                    type="date"
                                    name="employmentStartDate" 
                                    id="employmentStartDate" 
                                    label="Employment Start Date" 
                                    placeholder="Employment Start Date"
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    inputProps={{
                                        style: {
                                            height: 40
                                        }
                                    }}
                                    variant="outlined"
                                    value={formik.values.employmentStartDate}
                                    onChange={formik.handleChange}
                                    error={formik.touched.employmentStartDate && Boolean(formik.errors.employmentStartDate)}
                                    helperText={formik.touched.employmentStartDate && formik.errors.employmentStartDate}
                                />
                            </Col>
                            <Col lg={6}>
                                <TextField 
                                    className={classes.Input}
                                    name="contactAddress" 
                                    id="contactAddress" 
                                    label="Contact Address" 
                                    placeholder="Contact Address"
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    inputProps={{
                                        style: {
                                            height: 40
                                        }
                                    }}
                                    variant="outlined"
                                    value={formik.values.contactAddress}
                                    onChange={formik.handleChange}
                                    error={formik.touched.contactAddress && Boolean(formik.errors.contactAddress)}
                                    helperText={formik.touched.contactAddress && formik.errors.contactAddress}
                                />
                            </Col>
                            <Col lg={3}>
                                <TextField 
                                    type="file"
                                    className={classes.Input}
                                    name="photo" 
                                    id="photo" 
                                    label="Photo" 
                                    margin="normal"
                                    fullWidth
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    inputRef= {handleFileInput}
                                    inputProps={{
                                        style: {
                                            height: 40,
                                            visibility: "hidden"
                                        },
                                        accept:"image/jpeg", 
                                        multiple: true
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <CloudUploadIcon onClick={handleClick}/>
                                          </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <div className="uploadClass" onClick={handleClick}>
                                                    Drag and Drop a file here or click
                                                </div>
                                            </InputAdornment>
                                        )
                                    }}
                                    variant="outlined"
                                    value={formik.values.photo}
                                    onChange={formik.handleChange}
                                    error={formik.touched.photo && Boolean(formik.errors.photo)}
                                    helperText={formik.touched.photo && formik.errors.photo}
                                />
                            </Col>
                        </Row>  
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={props.onHide} className="cancel-btn">Close</button>
                    <button type="submit" className="submit-btn" disabled={isSubmit}>{isSubmit ? "Submitting" : "Submit" }<span className="iconify" data-icon="entypo:arrow-long-right" data-inline="false"></span></button>
                </Modal.Footer>
            </form>
    </Modal>
    )
}

export default NewStaff