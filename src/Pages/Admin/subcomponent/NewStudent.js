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

const NewStudent = (props) => {

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
    const [title, setTitle] = useState([])
    const [gender, setGender] = useState([])
    const [maritalStatus, setMaritalStatus] = useState([])
    const [religion, setReligion] = useState([])
    const [country, setCountry] = useState([])
    const [state, setState] = useState([])
    const [lga, setLga] = useState([])

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
                setTitle(res.data.titles)
                setGender(res.data.genders)
                setMaritalStatus(res.data.maritalStatus)
                setReligion(res.data.religions)
                setCountry(res.data.countries)
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
        titleId: '',
        firstName: '',
        lastName: '',
        otherName: '',
        genderId: '',
        maritalStatusId: '',
        institutionId: institutionId,
        email: '',
        phoneNumber: '',
        emergencyContact: '',
        dateOfBirth: '',
        religion: '',
        maidenName: '',
        bloodGroup: '',
        genotype: '',
        weight: '',
        height: '',
        createdBy: userId,
        countryId: '',
        stateId: '',
        lgaId: '',
        residentAddress: '',
        matricNo: '',
        schoolId: '',
        facultyId: '',
        departmentId: '',
        programId: '',
        photo: ''
    }

    //Form Validation Schema
    const validationSchema = Yup.object({
        titleId: Yup.string().required("Title is Required"),
        firstName: Yup.string().required("First Name is Required"),
        lastName: Yup.string().required("Last Name is Required"),
        genderId: Yup.string().required("Gender is Required"),
        maritalStatusId: Yup.string().required("Marital Status is Required"),
        email: Yup.string().email("Valid Email is Required").required("Email Address is Required"),
        phoneNumber: Yup.string().min(10).required("Phone Number is Required"),
        emergencyContact: Yup.string().min(10).required("Emergency Contact is Required"),
        dateOfBirth: Yup.string().required("Date of Birth is Required"),
        religion: Yup.string().min(10).required("Religion is Required"),
        maidenName: Yup.string().required("Maiden Name is Required"),
        bloodGroup: Yup.string().min(10).required("Blood Group is Required"),
        genotype: Yup.string().required("Genotype is Required"),
        weight: Yup.string().min(10).required("Weight is Required"),
        height: Yup.string().required("Height is Required"),
        countryId: Yup.string().required("Country is required"),
        stateId: Yup.string().required("State is required"),
        lgaId: Yup.string().required("LGA is required"),
        residentAddress: Yup.string().required("Resident Address is required"),
        matricNo: Yup.string().required("Matric No is required"),
        schoolId: Yup.string().required("School is required"),
        facultyId: Yup.string().required("Faculty is required"),
        departmentId: Yup.string().required("Department is required"),
        programId: Yup.string().required("Program is required"),
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
                const res = await getState(formik.values.countyId)
                setState(res.data)
            }
            catch(err){
                console.log(err.message)
            }
        }
        fetchData()
    }, [formik.values.countyId])

    useEffect(() => {
        const fetchData = async() => {
            try{
                const res = await getLGA(formik.values.stateId)
                setLga(res.data)
            }
            catch(err){
                console.log(err.message)
            }
        }
        fetchData()
    }, [formik.values.stateId])

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
                Student Details (Basic Information)
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
                                        select
                                        name="titleId" 
                                        id="titleId" 
                                        label="Title" 
                                        placeholder="titleId"
                                        margin="normal"
                                        fullWidth
                                        size="small"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.titleId}
                                        onChange={formik.handleChange}
                                        error={formik.touched.titleId && Boolean(formik.errors.titleId)}
                                        helperText={formik.touched.titleId && formik.errors.titleId}
                                    >
                                        {title.map(data => (
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
                                    select
                                    size="small"
                                    name="religion" 
                                    id="religion" 
                                    label="Religion" 
                                    placeholder="Religion"
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
                                    value={formik.values.religion}
                                    onChange={formik.handleChange}
                                    error={formik.touched.religion && Boolean(formik.errors.religion)}
                                    helperText={formik.touched.religion && formik.errors.religion}
                                >
                                    {religion.map(data => (
                                        <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                                    ))}
                                </TextField>
                            </Col>
                            <Col lg={3}>
                                <TextField 
                                    className={classes.Input}
                                    name="maidenName" 
                                    id="maidenName" 
                                    label="Maiden Name" 
                                    placeholder="Maiden Name"
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
                                    value={formik.values.maidenName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.maidenName && Boolean(formik.errors.maidenName)}
                                    helperText={formik.touched.maidenName && formik.errors.maidenName}
                                />
                            </Col>
                            <Col lg={3}>
                            <div className="form-group">
                                    <TextField 
                                        select
                                        name="bloodGroup" 
                                        id="bloodGroup" 
                                        label="Blood Group" 
                                        placeholder="Blood Group"
                                        margin="normal"
                                        fullWidth
                                        size="small"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.bloodGroup}
                                        onChange={formik.handleChange}
                                        error={formik.touched.bloodGroup && Boolean(formik.errors.bloodGroup)}
                                        helperText={formik.touched.bloodGroup && formik.errors.bloodGroup}
                                    >
                                        <MenuItem value="">A+</MenuItem>
                                    </TextField>
                                </div>
                            </Col>
                            <Col lg={3}>
                                <TextField 
                                    select
                                    name="genotype" 
                                    id="genotype" 
                                    label="Genotype" 
                                    placeholder="Genotype"
                                    margin="normal"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    variant="outlined"
                                    value={formik.values.genotype}
                                    onChange={formik.handleChange}
                                    error={formik.touched.genotype && Boolean(formik.errors.genotype)}
                                    helperText={formik.touched.genotype && formik.errors.genotype}
                                >
                                    <MenuItem value="">O</MenuItem>
                                </TextField>
                            </Col>
                            <Col lg={3}>
                                <TextField 
                                    className={classes.Input}
                                    name="weight" 
                                    id="weight" 
                                    label="Weight(KG)" 
                                    placeholder="Weight(KG)"
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
                                    value={formik.values.weight}
                                    onChange={formik.handleChange}
                                    error={formik.touched.weight && Boolean(formik.errors.weight)}
                                    helperText={formik.touched.weight && formik.errors.weight}
                                />
                            </Col>
                            <Col lg={3}>
                                <TextField 
                                    className={classes.Input}
                                    name="height" 
                                    id="height" 
                                    label="Height" 
                                    placeholder="Height"
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
                                    value={formik.values.height}
                                    onChange={formik.handleChange}
                                    error={formik.touched.height && Boolean(formik.errors.height)}
                                    helperText={formik.touched.height && formik.errors.height}
                                />
                            </Col>
                            <Col lg={3}>
                                <div className="form-group">
                                    <TextField 
                                        select
                                        name="countryId" 
                                        id="countryId" 
                                        label="Country" 
                                        placeholder="Country"
                                        margin="normal"
                                        fullWidth
                                        size="small"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.countryId}
                                        onChange={formik.handleChange}
                                        error={formik.touched.countryId && Boolean(formik.errors.countryId)}
                                        helperText={formik.touched.countryId && formik.errors.countryId}
                                    >
                                        {country.map(data => (
                                            <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                            </Col>
                            <Col lg={3}>
                                <TextField 
                                    select
                                    name="stateId" 
                                    id="stateId" 
                                    label="State of Origin" 
                                    placeholder="State of Origin"
                                    margin="normal"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    variant="outlined"
                                    value={formik.values.stateId}
                                    onChange={formik.handleChange}
                                    error={formik.touched.stateId && Boolean(formik.errors.stateId)}
                                    helperText={formik.touched.stateId && formik.errors.stateId}
                                >
                                    {state.map(data => (
                                        <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                                    ))}
                                </TextField>
                            </Col>
                            <Col lg={3}>
                            <div className="form-group">
                                    <TextField 
                                        select
                                        name="lga" 
                                        id="lga" 
                                        label="LGA" 
                                        placeholder="LGA"
                                        margin="normal"
                                        fullWidth
                                        size="small"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.lga}
                                        onChange={formik.handleChange}
                                        error={formik.touched.lga && Boolean(formik.errors.lga)}
                                        helperText={formik.touched.lga && formik.errors.lga}
                                    >
                                        {lga.map(data => (
                                            <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                            </Col>
                            <Col lg={3}>
                                <TextField 
                                    className={classes.Input}
                                    name="residentAddress" 
                                    id="residentAddress" 
                                    label="Resident Address" 
                                    placeholder="Resident Address"
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
                                    value={formik.values.residentAddress}
                                    onChange={formik.handleChange}
                                    error={formik.touched.residentAddress && Boolean(formik.errors.residentAddress)}
                                    helperText={formik.touched.residentAddress && formik.errors.residentAddress}
                                />
                            </Col>
                            <Col lg={3}>
                                <TextField 
                                    className={classes.Input}
                                    name="MatricNo" 
                                    id="MatricNo" 
                                    label="Matric No" 
                                    placeholder="Matric No"
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
                                    value={formik.values.MatricNo}
                                    onChange={formik.handleChange}
                                    error={formik.touched.MatricNo && Boolean(formik.errors.MatricNo)}
                                    helperText={formik.touched.MatricNo && formik.errors.MatricNo}
                                />
                            </Col>
                            <Col lg={3}>
                                <div className="form-group">
                                    <TextField 
                                        select
                                        name="schoolId" 
                                        id="schoolId" 
                                        label="School" 
                                        placeholder="School"
                                        margin="normal"
                                        fullWidth
                                        size="small"
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
                            <Col lg={3}>
                                <TextField 
                                    select
                                    name="facultyId" 
                                    id="facultyId" 
                                    label="Faculty" 
                                    placeholder="Faculty"
                                    margin="normal"
                                    fullWidth
                                    size="small"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    variant="outlined"
                                    value={formik.values.facultyId}
                                    onChange={formik.handleChange}
                                    error={formik.touched.facultyId && Boolean(formik.errors.facultyId)}
                                    helperText={formik.touched.facultyId && formik.errors.facultyId}
                                >
                                    {faculty.map(data => (
                                            <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                                    ))}
                                </TextField>
                            </Col>
                            <Col lg={3}>
                            <div className="form-group">
                                    <TextField 
                                        select
                                        name="departmentId" 
                                        id="departmentId" 
                                        label="Department" 
                                        placeholder="Department"
                                        margin="normal"
                                        fullWidth
                                        size="small"
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
                            <Col lg={3}>
                            <div className="form-group">
                                    <TextField 
                                        select
                                        name="program" 
                                        id="program" 
                                        label="Program of Study" 
                                        placeholder="Program of Study"
                                        margin="normal"
                                        fullWidth
                                        size="small"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.program}
                                        onChange={formik.handleChange}
                                        error={formik.touched.program && Boolean(formik.errors.program)}
                                        helperText={formik.touched.program && formik.errors.program}
                                    >
                                        {program.map(data => (
                                            <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                                        ))}
                                    </TextField>
                                </div>
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

export default NewStudent