import {Container, Row, Col} from 'react-bootstrap';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useState, useEffect} from 'react';
import {PopupAlert} from '../../components/Alert';
import {getSchool, getDepartmentBySchool, getProgram, getProgramLevel} from '../../../services/institutionAdminServices';
import { getMaritalStatus, getReligion, getGender, getStudentCategory } from '../../../services/commonServices';
import { MenuItem, makeStyles } from '@material-ui/core';
import StyledTextField from '../../components/StyledTextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { dateToInputDate } from '../../../utils/Functions';
import { updateStudentBiodata } from '../../../services/biodataService';

const useStyles = makeStyles({
    field: {
        height: 40
    }
})

const BiodataForm = ({data}) => {


    const classes = useStyles()

    // Popup Alert State
    const[showAlert, setShowAlert] = useState(false) 
    const[alertType, setAlertType] = useState("")
    const[message, setMessage] = useState("")

    //Title data
    const [gender, setGender] = useState([])
    const [maritalStatus, setMaritalStatus] = useState([])
    const [religion, setReligion] = useState([])
    const [isDisabled, setIsDisabled] = useState(false)
    const [isIndigenous, setIsIndigenous] = useState(false)

    //School data State
    const [school, setSchool] = useState([])
    const [department, setDepartment] = useState([])
    const [program, setProgram] = useState([])
    const [programLevel, setProgramLevel] = useState([])
    const [studentCategory, setStudentCategory] = useState([])


    //Submit State
    const[isSubmit, setIsSubmit] = useState(false)
    
    const onSubmit = async(editData) => {
        setIsSubmit(true)
        try{
            editData.isIndigenous = isIndigenous
            editData.isDisabled = isDisabled
            const res = await updateStudentBiodata(data.id, editData)
            if (res.status === 200 || res.status === 204){
                setAlertType("success")
                setMessage("Student Biodata Updated")
                setShowAlert(true)
                setIsSubmit(false)
            }
            else{
                setAlertType("danger")
                setMessage("Fail to Update Student Biodata")
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
        otherName: data.otherName ? data.otherName : '',
        formerName: data.formerName ? data.formerName : '',
        nin: data.nin ? data.nin : '',
        schoolID: data.schoolID ? data.schoolID : '',
        departmentID: data.departmentID ? data.departmentID : '',
        maritalStatusID: data.maritalStatusID ? data.maritalStatusID : '',
        religionID: data.religionID ? data.religionID : '',
        dateOfBirth: data.dateOfBirth ? dateToInputDate(data.dateOfBirth) : '',
        genderID: data.genderID ? data.genderID : '',
        disability: data.disability ? data.disability : '',
        alternatePhoneNumber: data.alternatePhoneNumber ? data.alternatePhoneNumber : '',
        nationality: data.nationality ? data.nationality : '',
        stateOfOrigin: data.stateOfOrigin ? data.stateOfOrigin : '',
        lg: data.lg ? data.lg : '',
        hometown: data.hometown ? data.hometown : '',
        zipPostalCode: data.zipPostalCode ? data.zipPostalCode : '',
        address: data.address ? data.address : '',
        twitterID: data.twitterID ? data.twitterID : '',
        facebookID: data.facebookID ? data.facebookID : '',
        instagramID: data.instagramID ? data.instagramID : '',
        linkedInID: data.linkedInID ? data.linkedInID : '',
        jambRegNumber: data.jambRegNumber ? data.jambRegNumber : '',
        matricNumber: data.matricNumber ? data.matricNumber : '',
        admissionDate: data.admissionDate ? dateToInputDate(data.admissionDate) : '',
        modeOfAdmission: data.modeOfAdmission ? data.modeOfAdmission : '',
        studentCategoryID: data.studentCategoryID ? data.studentCategoryID : '',
        programmeID: data.programmeID ? data.programmeID : '',
        entryLevelID: data.entryLevelID ? data.entryLevelID : '',
        currentLevelID: data.currentLevelID ? data.currentLevelID : ''
    }

    //Form Validation Schema
    const validationSchema = Yup.object({
        otherName: Yup.string(),
        formerName: Yup.string(),
        nin: Yup.string().required("NIN is Required"),
        schoolID: Yup.string().required("School is Required"),
        departmentID: Yup.string().required("Department is Required"),
        maritalStatusID: Yup.string().required("Marital Status is Required"),
        religionID: Yup.string().min(10).required("Religion is Required"),
        dateOfBirth: Yup.string().min(10).required("Date of Birth is Required"),
        genderID: Yup.string().required("Gender is Required"),
        disability: Yup.string(),
        alternatePhoneNumber: Yup.string(),
        nationality: Yup.string().required("Nationality is Required"),
        stateOfOrigin: Yup.string().required("State Of Origin is Required"),
        lg: Yup.string().min(10).required("Local Government is Required"),
        hometown: Yup.string().required("Hometown is Required"),
        zipPostalCode: Yup.string(),
        address: Yup.string().required("Address is required"),
        twitterID: Yup.string(),
        facebookID: Yup.string(),
        instagramID: Yup.string(),
        linkedInID: Yup.string(),
        jambRegNumber: Yup.string().required("Jamb Registeration Number is required"),
        matricNumber: Yup.string().required("Matric Number is required"),
        admissionDate: Yup.string().required("Admission Date is required"),
        modeOfAdmission: Yup.string().required("Mode of Admission is required"),
        studentCategoryID: Yup.string().required("Student Category is required"),
        programmeID: Yup.string().required("Program is required"),
        entryLevelID: Yup.string().required("Entry Level is required"),
        currentLevelID: Yup.string().required("Current Level is required"),
    })

    //Formik Hook
    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        onSubmit,
        validationSchema
    })

    const handleDisabledCheck = (event) => {
        setIsDisabled(event.target.checked)
    }

    const handleIndigenousCheck = (event) => {
        if(event.target.checked){
            formik.values.nationality = "Nigeria"
        }
        else{
            formik.values.nationality = ""
        }
        setIsIndigenous(event.target.checked)
    }

    useEffect(() => {
        const fetchData = async() => {
            try{
               const res = await getSchool()
               setSchool(res.data)
            }
            catch(err){
                console.log(err.message)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async() => {
            try{
               if(formik.values.schoolID !== ''){
                    const res = await getDepartmentBySchool(formik.values.schoolID)
                    if(Array.isArray(res.data)){
                        setDepartment(res.data)
                    }
                    else{
                        setDepartment([])
                    }
               }
            }
            catch(err){
                console.log(err.message)
            }
        }
        fetchData()
    }, [formik.values.schoolID])

    useEffect(() => {
        const fetchData = async() => {
            try{
                const res = await getMaritalStatus()
                setMaritalStatus(res.data)
            }
            catch(err){
                console.log(err.message)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async() => {
            try{
                const res = await getReligion()
                setReligion(res.data)
            }
            catch(err){
                console.log(err.message)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async() => {
            try{
                const res = await getGender()
                setGender(res.data)
            }
            catch(err){
                console.log(err.message)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async() => {
            try{
                const res = await getProgram()
                setProgram(res.data)
            }
            catch(err){
                console.log(err.message)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async() => {
            try{
                const res = await getStudentCategory()
                setStudentCategory(res.data)
            }
            catch(err){
                console.log(err.message)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async() => {
            try{
                const res = await getProgramLevel()
                setProgramLevel(res.data)
            }
            catch(err){
                console.log(err.message)
            }
        }
        fetchData()
    }, [])

    return (
        <form onSubmit={formik.handleSubmit} className='mt-3'>
        <Container>        
            {showAlert && <PopupAlert alertType={alertType} setShowAlert={setShowAlert} message={message}/>}   
            <Row>
                <Col lg={3}>
                <div className="form-group">
                        <StyledTextField 
                            name="otherName" 
                            id="otherName" 
                            label="Other Name" 
                            placeholder="Other Name"
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
                            value={formik.values.otherName}
                            onChange={formik.handleChange}
                            error={formik.touched.otherName && Boolean(formik.errors.otherName)}
                            helperText={formik.touched.otherName && formik.errors.otherName}
                        />
                    </div>
                </Col>
                <Col lg={3}>
                    <StyledTextField 
                        className={classes.Input}
                        name="formerName" 
                        id="formerName" 
                        label="Former Name" 
                        placeholder="Former Name"
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
                        value={formik.values.formerName}
                        onChange={formik.handleChange}
                        error={formik.touched.formerName && Boolean(formik.errors.formerName)}
                        helperText={formik.touched.formerName && formik.errors.formerName}
                    />
                </Col>
                <Col lg={3}>
                    <StyledTextField 
                        className={classes.Input}
                        name="nin" 
                        id="nin" 
                        label="NIN" 
                        placeholder="National Identification Number"
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
                        value={formik.values.nin}
                        onChange={formik.handleChange}
                        error={formik.touched.nin && Boolean(formik.errors.nin)}
                        helperText={formik.touched.nin && formik.errors.nin}
                    />
                </Col>
                <Col lg={3}>
                    <StyledTextField 
                        select
                        name="schoolID" 
                        id="schoolID" 
                        label="School" 
                        placeholder="School"
                        margin="normal"
                        fullWidth
                        InputLabelProps={{
                        shrink: true,
                        }}
                        size='small'
                        variant="outlined"
                        value={formik.values.schoolID}
                        onChange={formik.handleChange}
                        error={formik.touched.schoolID && Boolean(formik.errors.schoolID)}
                        helperText={formik.touched.schoolID && formik.errors.schoolID}
                    >
                        <MenuItem>Select School</MenuItem>
                        {school.map(data => (
                                <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                            ))}
                    </StyledTextField>
                </Col>
                <Col lg={3}>
                <div className="form-group">
                        <StyledTextField 
                            select
                            name="departmentID" 
                            id="departmentID" 
                            label="Department" 
                            placeholder="Department"
                            margin="normal"
                            fullWidth
                            size="small" 
                            InputLabelProps={{
                            shrink: true,
                            }}
                            variant="outlined"
                            value={formik.values.departmentID}
                            onChange={formik.handleChange}
                            error={formik.touched.departmentID && Boolean(formik.errors.departmentID)}
                            helperText={formik.touched.departmentID && formik.errors.departmentID}
                        >
                            {department.map(data => (
                                <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                            ))}
                        </StyledTextField>
                    </div>
                </Col>
                <Col lg={3}>
                    <StyledTextField 
                        select
                        name="maritalStatusID" 
                        id="maritalStatusID" 
                        label="Marital Status" 
                        placeholder="Marital Status"
                        margin="normal"
                        fullWidth
                        size="small"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        variant="outlined"
                        value={formik.values.maritalStatusID}
                        onChange={formik.handleChange}
                        error={formik.touched.maritalStatusID && Boolean(formik.errors.maritalStatusID)}
                        helperText={formik.touched.maritalStatusID && formik.errors.maritalStatusID}
                    >
                        {maritalStatus.map(data => (
                            <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                        ))}
                    </StyledTextField>
                </Col>
                <Col lg={3}>
                    <StyledTextField 
                        select
                        name="religionID" 
                        id="religionID" 
                        label="Religion" 
                        placeholder="Religion"
                        margin="normal"
                        fullWidth
                        size="small"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        variant="outlined"
                        value={formik.values.religionID}
                        onChange={formik.handleChange}
                        error={formik.touched.religionID && Boolean(formik.errors.religionID)}
                        helperText={formik.touched.religionID && formik.errors.religionID}
                    >
                        {religion.map(data => (
                            <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                        ))}
                    </StyledTextField>
                </Col>
                <Col lg={3}>
                    <StyledTextField 
                        type="date"
                        className={classes.Input}
                        name="dateOfBirth" 
                        id="dateOfBirth" 
                        label="Date Of Birth" 
                        placeholder="Date Of Birth"
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
                        value={formik.values.dateOfBirth}
                        onChange={formik.handleChange}
                        error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
                        helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                    />
                </Col>
                <Col lg={3}>
                    <StyledTextField 
                        select
                        name="genderID" 
                        id="genderID" 
                        label="Gender" 
                        placeholder="Gender"
                        margin="normal"
                        fullWidth
                        size="small"
                        InputLabelProps={{
                        shrink: true,
                        }}
                        variant="outlined"
                        value={formik.values.genderID}
                        onChange={formik.handleChange}
                        error={formik.touched.genderID && Boolean(formik.errors.genderID)}
                        helperText={formik.touched.genderID && formik.errors.genderID}
                    >
                        {gender.map(data => (
                            <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                        ))}
                    </StyledTextField>
                </Col>
                <Col lg={3} className="mt-3">
                    <FormControlLabel control={
                        <Checkbox 
                            color="success"
                            checked={isDisabled}
                            onChange={handleDisabledCheck}
                        />
                    } label="Is Student Disabled?" />
                    
                </Col>
                {isDisabled &&
                    <Col lg={3}>
                    <StyledTextField 
                        className={classes.Input}
                        name="disability" 
                        id="disability" 
                        label="Disability" 
                        placeholder="Disability"
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
                        value={formik.values.disability}
                        onChange={formik.handleChange}
                        error={formik.touched.disability && Boolean(formik.errors.disability)}
                        helperText={formik.touched.disability && formik.errors.disability}
                    />
                </Col>
                }
                <Col lg={3}>
                    <StyledTextField 
                        className={classes.Input}
                        name="alternatePhoneNumber" 
                        id="alternatePhoneNumber" 
                        label="Alternative Phone Number" 
                        placeholder="Alternative Phone Number"
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
                        value={formik.values.alternatePhoneNumber}
                        onChange={formik.handleChange}
                        error={formik.touched.alternatePhoneNumber && Boolean(formik.errors.alternatePhoneNumber)}
                        helperText={formik.touched.alternatePhoneNumber && formik.errors.alternatePhoneNumber}
                    />
                </Col>
                <Col lg={3} className="mt-3">
                    <FormControlLabel control={
                        <Checkbox 
                            color="success"
                            checked={isIndigenous}
                            onChange={handleIndigenousCheck}
                        />
                    } label="Is Student Indigenous?" />
                </Col>
                <Col lg={3}>
                    <StyledTextField 
                        className={classes.Input}
                        name="nationality" 
                        id="nationality" 
                        label="Nationality" 
                        placeholder="Nationality"
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
                        disabled={isIndigenous}
                        variant="outlined"
                        value={formik.values.nationality}
                        onChange={formik.handleChange}
                        error={formik.touched.nationality && Boolean(formik.errors.nationality)}
                        helperText={formik.touched.nationality && formik.errors.nationality}
                    />
                </Col>
                <Col lg={3}>
                    <div className="form-group">
                        <StyledTextField 
                            className={classes.Input}
                            name="stateOfOrigin" 
                            id="stateOfOrigin" 
                            label="State Of Origin" 
                            placeholder="State Of Origin"
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
                            value={formik.values.stateOfOrigin}
                            onChange={formik.handleChange}
                            error={formik.touched.stateOfOrigin && Boolean(formik.errors.stateOfOrigin)}
                            helperText={formik.touched.stateOfOrigin && formik.errors.stateOfOrigin}
                        />
                    </div>
                </Col>
                <Col lg={3}>
                    <StyledTextField 
                        name="lg" 
                        id="lg" 
                        label="Local Government" 
                        placeholder="Local Government"
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
                        value={formik.values.lg}
                        onChange={formik.handleChange}
                        error={formik.touched.lg && Boolean(formik.errors.lg)}
                        helperText={formik.touched.lg && formik.errors.lg}
                    />
                </Col>
                <Col lg={3}>
                    <StyledTextField 
                        className={classes.Input}
                        name="hometown" 
                        id="hometown" 
                        label="Hometown" 
                        placeholder="Hometown"
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
                        value={formik.values.hometown}
                        onChange={formik.handleChange}
                        error={formik.touched.hometown && Boolean(formik.errors.hometown)}
                        helperText={formik.touched.hometown && formik.errors.hometown}
                    />
                </Col>
                <Col lg={3}>
                    <StyledTextField 
                        className={classes.Input}
                        name="zipPostalCode" 
                        id="zipPostalCode" 
                        label="Postal Code" 
                        placeholder="Postal Code"
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
                        value={formik.values.zipPostalCode}
                        onChange={formik.handleChange}
                        error={formik.touched.zipPostalCode && Boolean(formik.errors.zipPostalCode)}
                        helperText={formik.touched.zipPostalCode && formik.errors.zipPostalCode}
                    />
                </Col>
                <Col lg={3}>
                    <StyledTextField 
                        className={classes.Input}
                        name="address" 
                        id="address" 
                        label="Address" 
                        placeholder="Address"
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
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        error={formik.touched.address && Boolean(formik.errors.address)}
                        helperText={formik.touched.address && formik.errors.address}
                    />
                </Col>
                <Col lg={3}>
                    <StyledTextField 
                        className={classes.Input}
                        name="twitterID" 
                        id="twitterID" 
                        label="Twitter ID" 
                        placeholder="Twitter ID"
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
                        value={formik.values.twitterID}
                        onChange={formik.handleChange}
                        error={formik.touched.twitterID && Boolean(formik.errors.twitterID)}
                        helperText={formik.touched.twitterID && formik.errors.twitterID}
                    />
                </Col>
                <Col lg={3}>
                    <StyledTextField 
                        className={classes.Input}
                        name="facebookID" 
                        id="facebookID" 
                        label="Facebook ID" 
                        placeholder="Facebook ID"
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
                        value={formik.values.facebookID}
                        onChange={formik.handleChange}
                        error={formik.touched.facebookID && Boolean(formik.errors.facebookID)}
                        helperText={formik.touched.facebookID && formik.errors.facebookID}
                    />
                </Col>
                <Col lg={3}>
                    <StyledTextField 
                        className={classes.Input}
                        name="instagramID" 
                        id="instagramID" 
                        label="Instagram ID" 
                        placeholder="Instagram ID"
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
                        value={formik.values.instagramID}
                        onChange={formik.handleChange}
                        error={formik.touched.instagramID && Boolean(formik.errors.instagramID)}
                        helperText={formik.touched.instagramID && formik.errors.instagramID}
                    />
                </Col>
                <Col lg={3}>
                    <StyledTextField 
                        className={classes.Input}
                        name="linkedInID" 
                        id="linkedInID" 
                        label="LinkedIn ID" 
                        placeholder="LinkedIn ID"
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
                        value={formik.values.linkedInID}
                        onChange={formik.handleChange}
                        error={formik.touched.linkedInID && Boolean(formik.errors.linkedInID)}
                        helperText={formik.touched.linkedInID && formik.errors.linkedInID}
                    />
                </Col>
                <Col lg={3}>
                    <StyledTextField 
                        className={classes.Input}
                        name="jambRegNumber" 
                        id="jambRegNumber" 
                        label="Jamb Reg Number" 
                        placeholder="Jamb Registeration Number"
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
                        value={formik.values.jambRegNumber}
                        onChange={formik.handleChange}
                        error={formik.touched.jambRegNumber && Boolean(formik.errors.jambRegNumber)}
                        helperText={formik.touched.jambRegNumber && formik.errors.jambRegNumber}
                    />
                </Col>
                <Col lg={3}>
                    <StyledTextField 
                        className={classes.Input}
                        name="matricNumber" 
                        id="matricNumber" 
                        label="Matric Number" 
                        placeholder="Matric Number"
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
                        value={formik.values.matricNumber}
                        onChange={formik.handleChange}
                        error={formik.touched.matricNumber && Boolean(formik.errors.matricNumber)}
                        helperText={formik.touched.matricNumber && formik.errors.matricNumber}
                    />
                </Col>
                <Col lg={3}>
                    <StyledTextField 
                        type="date"
                        className={classes.Input}
                        name="admissionDate" 
                        id="admissionDate" 
                        label="Admission Date" 
                        placeholder="Admission Date"
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
                        value={formik.values.admissionDate}
                        onChange={formik.handleChange}
                        error={formik.touched.admissionDate && Boolean(formik.errors.admissionDate)}
                        helperText={formik.touched.admissionDate && formik.errors.admissionDate}
                    />
                </Col>
                <Col lg={3}>
                    <StyledTextField 
                        className={classes.Input}
                        name="modeOfAdmission" 
                        id="modeOfAdmission" 
                        label="Mode of Admission" 
                        placeholder="Mode of Admission"
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
                        value={formik.values.modeOfAdmission}
                        onChange={formik.handleChange}
                        error={formik.touched.modeOfAdmission && Boolean(formik.errors.modeOfAdmission)}
                        helperText={formik.touched.modeOfAdmission && formik.errors.modeOfAdmission}
                    />
                </Col>
                <Col lg={3}>
                    <StyledTextField 
                        select
                        name="studentCategoryID" 
                        id="studentCategoryID" 
                        label="Student Category" 
                        placeholder="Student Category"
                        margin="normal"
                        fullWidth
                        InputLabelProps={{
                        shrink: true,
                        }}
                        size='small'
                        variant="outlined"
                        value={formik.values.studentCategoryID}
                        onChange={formik.handleChange}
                        error={formik.touched.studentCategoryID && Boolean(formik.errors.studentCategoryID)}
                        helperText={formik.touched.studentCategoryID && formik.errors.studentCategoryID}
                    >
                        <MenuItem>Select Student Category</MenuItem>
                        {studentCategory.map(data => (
                                <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                            ))}
                    </StyledTextField>
                </Col>
                <Col lg={3}>
                    <StyledTextField 
                        select
                        name="programmeID" 
                        id="programmeID" 
                        label="Programme" 
                        placeholder="Programme"
                        margin="normal"
                        fullWidth
                        InputLabelProps={{
                        shrink: true,
                        }}
                        size='small'
                        variant="outlined"
                        value={formik.values.programmeID}
                        onChange={formik.handleChange}
                        error={formik.touched.programmeID && Boolean(formik.errors.programmeID)}
                        helperText={formik.touched.programmeID && formik.errors.programmeID}
                    >
                        <MenuItem>Select Programme</MenuItem>
                        {program.map(data => (
                                <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                            ))}
                    </StyledTextField> 
                </Col>
                <Col lg={3}>
                    <StyledTextField 
                        select
                        name="entryLevelID" 
                        id="entryLevelID" 
                        label="Entry Level" 
                        placeholder="Entry Level"
                        margin="normal"
                        fullWidth
                        InputLabelProps={{
                        shrink: true,
                        }}
                        size='small'
                        variant="outlined"
                        value={formik.values.entryLevelID}
                        onChange={formik.handleChange}
                        error={formik.touched.entryLevelID && Boolean(formik.errors.entryLevelID)}
                        helperText={formik.touched.entryLevelID && formik.errors.entryLevelID}
                    >
                        <MenuItem>Select Entry Level</MenuItem>
                        {programLevel.map(data => (
                                <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                            ))}
                    </StyledTextField> 
                    </Col>
                    <Col lg={3}>
                    <StyledTextField 
                        select
                        name="currentLevelID" 
                        id="currentLevelID" 
                        label="Current Level" 
                        placeholder="Current Level"
                        margin="normal"
                        fullWidth
                        InputLabelProps={{
                        shrink: true,
                        }}
                        size='small'
                        variant="outlined"
                        value={formik.values.currentLevelID}
                        onChange={formik.handleChange}
                        error={formik.touched.currentLevelID && Boolean(formik.errors.currentLevelID)}
                        helperText={formik.touched.currentLevelID && formik.errors.currentLevelID}
                    >
                        <MenuItem>Select Current Level</MenuItem>
                        {programLevel.map(data => (
                                <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                            ))}
                    </StyledTextField> 
                </Col>
            </Row>  
            <Row className='mt-3'>
                <Col lg={12} md={12} sm={12}>
                    <button type="submit" className="biodata-btn" disabled={isSubmit}>{isSubmit ? "Submitting" : "Submit" }<span className="iconify" data-icon="entypo:arrow-long-right" data-inline="false"></span></button>
                </Col>
            </Row>
        </Container>
        </form>
    )
}

export default BiodataForm
