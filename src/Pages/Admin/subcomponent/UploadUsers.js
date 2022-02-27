import {Modal, Container, Row, Col, Button} from 'react-bootstrap';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useState, useRef, useEffect} from 'react';
import {PopupAlert} from '../../components/Alert';
import StyledTextField from '../../components/StyledTextField';
import {InputAdornment, makeStyles, MenuItem } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {getProgram, getProgramLevel, getDepartment} from '../../../services/institutionAdminServices';
import { uploadStaff, uploadReturningStudents, uploadNewStudents } from '../../../services/fileUploadServices';

const useStyles = makeStyles({
    field: {
        height: 40
    }
})

const UploadUsers = (props) => {
    const handleFileInput = useRef()

    const handleClick = (event) => {
        handleFileInput.current.click();
    }

    const classes = useStyles()
    const[showAlert, setShowAlert] = useState(false) 
    const[alertType, setAlertType] = useState("")
    const[message, setMessage] = useState("")
    const [isSubmit, setIsSubmit] = useState(false)

    const [program, setProgram] = useState([])
    const [level, setLevel] = useState([])
    const [dept, setDept] = useState([])
    const [file, setFile] = useState("")
    const [fileName, setFileName] = useState("")

    const onChange = (e) => {
        setFile(e.target.files[0])
        setFileName(e.target.files[0].name)
    }

    const onSubmit = async(data) => {        
        try {
           if(file !== ""){
                var form = new FormData()
                form.append("ExcelSheet", file)
                if(props.type === "new-student"){
                    setIsSubmit(true)
                    const res = await uploadNewStudents(data.ProgrammeID, data.LevelID, data.DepartmentID, form)
                    if (res.status === 200 || res.status === 204){
                        setIsSubmit(false)
                        setAlertType("success")
                        setMessage(res.data.message)
                        setShowAlert(true)
                        props.setContentLength(props.contentLength + 1)
                    }
                    else{
                        setIsSubmit(false)
                        setAlertType("danger")
                        setMessage(res.data.message)
                        setShowAlert(true)
                    }
            }
            else if(props.type === "old-student"){
                    setIsSubmit(true)
                    const res = await uploadReturningStudents(data.ProgrammeID, data.LevelID, data.DepartmentID, form)
                    if (res.status === 200 || res.status === 204){
                        setIsSubmit(false)
                        setAlertType("success")
                        setMessage("Student Upload Successful")
                        setShowAlert(true)
                        props.setContentLength(props.contentLength + 1)
                    }
                    else{
                        setIsSubmit(false)
                        setAlertType("danger")
                        setMessage("An Error Occured")
                        setShowAlert(true)
                    }
            }
            else if(props.type === "staff"){
                    setIsSubmit(true)
                    const res = await uploadStaff(data.ProgrammeID, data.LevelID, data.DepartmentID, form)
                    if (res.status === 200 || res.status === 204){
                        setIsSubmit(false)
                        setAlertType("success")
                        setMessage(res.data.message)
                        setShowAlert(true)
                        props.setContentLength(props.contentLength + 1)
                    }
                    else{
                        setIsSubmit(false)
                        setAlertType("danger")
                        setMessage(res.data.message)
                        setShowAlert(true)
                    }
            }
           }
           else{
                setIsSubmit(false)
                setAlertType("danger")
                setMessage("File Upload Empty")
                setShowAlert(true)
           }
        }
        catch(err){
            setIsSubmit(false)
            setAlertType("danger")
            setMessage(err.response.data.message)
            setShowAlert(true)
        }
    }

    const initialValues = {
        ProgrammeID : '',
        LevelID : '',
        DepartmentID : '',
        ExcelSheet: ''

    }

    const validationSchema = Yup.object({
        ProgrammeID : Yup.string().required("Program is Required"),
        LevelID : Yup.string().required("Level is Required"),
        DepartmentID : Yup.string().required("Department is Required"),
        ExcelSheet: ''
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        onSubmit,
        validationSchema
    })

    useEffect(() => {
        const fetchData = async() => {
            const res = await getProgram()
            const data = res.data
            if(Array.isArray(data)){
                setProgram(data)
            }
            else{
                setProgram([])
            }
        } 
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async() => {
            const res = await getDepartment()
            const data = res.data
            if(Array.isArray(data)){
                setDept(data)
            }
            else{
                setDept([])
            }
        } 
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async() => {
            const res = await getProgramLevel()
            const data = res.data
            if(Array.isArray(data)){
                setLevel(data)
            }
            else{
                setLevel([])
            }
        } 
        fetchData()
    }, [])


    return (
        <Modal {...props} 
            aria-labelledby="contained-modal-title-vcenter"
            size="sm"
            centered
            className="add-new-modal"
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Upload {props.headerTitle}
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
                                        select
                                        name="ProgrammeID" 
                                        id="ProgrammeID"
                                        label="Program"
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.ProgrammeID}
                                        onChange={formik.handleChange}
                                        error={formik.touched.ProgrammeID && Boolean(formik.errors.ProgrammeID)}
                                        helperText={formik.touched.ProgrammeID && formik.errors.ProgrammeID}
                                    >
                                        {program.map(data => (
                                            <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                                        ))}
                                    </StyledTextField>
                                </div>
                            </Col>
                        </Row>  
                        <Row>
                            <Col lg={12} md={12} sm={12}>
                            <div className="form-group" id="new-session-textfield">
                                    <StyledTextField 
                                        select
                                        name="DepartmentID" 
                                        id="DepartmentID"
                                        label="Department"
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.DepartmentID}
                                        onChange={formik.handleChange}
                                        error={formik.touched.DepartmentID && Boolean(formik.errors.DepartmentID)}
                                        helperText={formik.touched.DepartmentID && formik.errors.DepartmentID}
                                    >
                                        {dept.map(data => (
                                            <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                                        ))}
                                    </StyledTextField>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12} md={12} sm={12}>
                            <div className="form-group" id="new-session-textfield">
                                    <StyledTextField 
                                        select
                                        name="LevelID" 
                                        id="LevelID"
                                        label="Level"
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.LevelID }
                                        onChange={formik.handleChange}
                                        error={formik.touched.LevelID  && Boolean(formik.errors.LevelID )}
                                        helperText={formik.touched.LevelID  && formik.errors.LevelID }
                                    >
                                        {level.map(data => (
                                            <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                                        ))}
                                    </StyledTextField>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12} md={12} sm={12}>
                                    <div className="form-group" id="new-session-textfield">
                                    <StyledTextField 
                                        type="file"
                                        className={classes.Input}
                                        name="ExcelSheet" 
                                        id="ExcelSheet" 
                                        label="ExcelSheet" 
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
                                            accept:".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel", 
                                            multiple: false
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
                                                        {fileName ? fileName : "Drag and Drop a file here or click"}
                                                    </div>
                                                </InputAdornment>
                                            )
                                        }}
                                        variant="outlined"
                                        value={formik.values.ExcelSheet}
                                        onChange={onChange}
                                        error={formik.touched.ExcelSheet && Boolean(formik.errors.ExcelSheet)}
                                        helperText={formik.touched.ExcelSheet && formik.errors.ExcelSheet}
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

export default UploadUsers
