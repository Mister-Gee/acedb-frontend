import {Modal, Container, Row, Col, Button} from 'react-bootstrap';
import {useFormik} from 'formik';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import { Select } from '@material-ui/core';
import { useTheme } from '@mui/material/styles';
import * as Yup from 'yup';
import {useState, useEffect} from 'react';
import {PopupAlert} from '../../components/Alert';
import {getSchool, getDepartmentBySchool, getDepartment} from '../../../services/institutionAdminServices';
import StyledTextField from '../../components/StyledTextField';
import StyledFormControl from '../../components/StyledFormControl';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { getStaffByDept } from '../../../services/staffServices';
import { editCourse } from '../../../services/courseServices';

const ITEM_HEIGHT = 58;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

  function getStyles(name, eligibleDepartments, theme) {
    return {
      fontWeight:
        eligibleDepartments.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

const EditCourse = (props) => {
    const {data} = props
    const theme = useTheme();
    const[showAlert, setShowAlert] = useState(false) 
    const[alertType, setAlertType] = useState("")
    const[message, setMessage] = useState("")
    const [isSubmit, setIsSubmit] = useState(false)
    const [school, setSchool] = useState([])
    const [schoolDept, setSchoolDept] = useState([])
    const [dept, setDept] = useState([])
    const [lecturers, setLecturers] = useState([])
    const [eligibleDepartments, setEligibleDepartments] = useState([]);
    const [checked, setChecked] = useState([true, false]);
    const [isOptional, setIsOptional] = useState(false)

  const handleCheck1 = (event) => {
    setChecked([event.target.checked, !event.target.checked]);
  };

  const handleCheck2 = (event) => {
    setChecked([!event.target.checked, event.target.checked]);
    setEligibleDepartments([])
  };

  const handleCheck3 = (event) => {
    setIsOptional(event.target.checked);
  };

    const handleChange = (event) => {
        const { target: { value }, } = event;

        setEligibleDepartments( typeof value === 'string' ? value.split(',') : value,  );
    };

    useEffect(() => {
        try{
            const fetchData = async() => {
                const res = await getSchool()
                const data = res.data
                if(Array.isArray(data)){
                    setSchool(data)
                }
                else{
                    setSchool([])
                }
            } 
            fetchData()
        }
        catch(err){
            console.log(err)
        }
    }, [])

    const onSubmit = async(editData) => {
        setIsSubmit(true)
        try {
            data.isGeneral = checked[0]
            data.isDepartmental = checked[1]
            data.isOptional = isOptional
            data.eligibleDepartments = eligibleDepartments
            const res = await editCourse(data.id, editData)
            if (res.status === 200 || res.status === 204){
                setIsSubmit(false)
                setAlertType("success")
                setMessage("Course Created Successfully")
                setShowAlert(true)
                props.setContentLength(props.contentLength + 1)
            }
            else{
                setIsSubmit(false)
                setAlertType("danger")
                setMessage("Failed to Create Course")
                setShowAlert(true)
            }
            setIsSubmit(false)
        }
        catch(err){
            console.log(err.message)
            setIsSubmit(false)
            setAlertType("danger")
            setMessage(err.message)
            setShowAlert(true)
            setIsSubmit(false)
        }
    }

    const initialValues = {
        courseTitle: data.courseTitle,
        courseCode: data.courseCode,
        courseDescription: data.courseDescription,
        courseUnit: data.courseUnit,
        leadLecturerID: data.leadLecturerID,
        assistantLecturerID: data.assistantLecturerID,
        schoolID: data.schoolID,
        departmentID: data.departmentID,
        otherCourseLecturer: data.otherCourseLecturerID
    }

    const validationSchema = Yup.object({
        courseTitle: Yup.string().required("Course Title is Required"),
        courseCode: Yup.string().required("Course Code is Required"),
        courseDescription: Yup.string().required("Course Description is Required"),
        courseUnit: Yup.number().required("Course Code is Required"),
        leadLecturerID: Yup.string().required("Lead Lecturer is Required"),
        assistantLecturerID: Yup.string(),
        schoolID: Yup.string().required("School is Required"),
        departmentID: Yup.string().required("Department is Required"),
        otherCourseLecturer: Yup.string(),
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        onSubmit,
        validationSchema
    })

    useEffect(() => {
        try{
            if(formik.values.schoolID){
                const fetchData = async() => {
                    const res = await getDepartmentBySchool(formik.values.schoolID)
                    const data = res.data
                    if(Array.isArray(data)){
                        setSchoolDept(data)
                    }
                    else{
                        setSchoolDept([])
                    }
                }
                fetchData()
            } 
        }
        catch(err){
            console.log(err)
        }
    }, [formik.values.schoolID])

    useEffect(() => {
        try{
            if(formik.values.departmentID){
                const fetchData = async() => {
                    const res = await getStaffByDept(formik.values.departmentID)
                    const data = res.data
                    if(Array.isArray(data)){
                        setLecturers(data)
                    }
                    else{
                        setLecturers([])
                    }
                } 
                fetchData()
            }
        }
        catch(err){
            console.log(err)
        }
    }, [formik.values.departmentID])

    useEffect(() => {
        try{
            const fetchData = async() => {
                const res = await getDepartment()
                const data = res.data
                if(Array.isArray(data)){
                    setDept(data)
                    setEligibleDepartments(JSON.parse(data.eligibleDepartments))
                }
                else{
                    setDept([])
                }
            } 
            fetchData()
        }
        catch(err){
            console.log(err)
        }
    }, [])

    // useEffect(() => {
    //     if(dept.length > 0){
    //         setEligibleDepartments(JSON.parse(data.eligibleDepartments))
    //     }
    // }, [dept.length, data.eligibleDepartments])

    return (
        <Modal {...props} 
            aria-labelledby="contained-modal-title-vcenter"
            size="lg"
            centered
            className="add-new-modal"
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Edit Course
            </Modal.Title>
        </Modal.Header>
                <form onSubmit={formik.handleSubmit} >
                    <Modal.Body className="">
                        <Container>        
                        {showAlert && <PopupAlert alertType={alertType} setShowAlert={setShowAlert} message={message}/>}   
                        <Row>
                            <Col lg={6} md={6} sm={12}>
                                    <div className="form-group" id="customSelect-input">
                                    <StyledTextField 
                                        name="courseTitle" 
                                        id="courseTitle" 
                                        label="Course Title" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.courseTitle}
                                        onChange={formik.handleChange}
                                        error={formik.touched.courseTitle && Boolean(formik.errors.courseTitle)}
                                        helperText={formik.touched.courseTitle && formik.errors.courseTitle}
                                    />
                                </div>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                    <div className="form-group" id="select-input">
                                    <StyledTextField 
                                        name="courseCode" 
                                        id="courseCode"
                                        label="Course Code"
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.courseCode}
                                        onChange={formik.handleChange}
                                        error={formik.touched.courseCode && Boolean(formik.errors.courseCode)}
                                        helperText={formik.touched.courseCode && formik.errors.courseCode}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6} md={6} sm={12}>
                                    <div className="form-group" id="customSelect-input">
                                    <StyledTextField 
                                        name="courseDescription" 
                                        id="courseDescription" 
                                        label="Course Description" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.courseDescription}
                                        onChange={formik.handleChange}
                                        error={formik.touched.courseDescription && Boolean(formik.errors.courseDescription)}
                                        helperText={formik.touched.courseDescription && formik.errors.courseDescription}
                                    />
                                </div>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                    <div className="form-group" id="select-input">
                                    <StyledTextField 
                                        name="courseUnit" 
                                        id="courseUnit"
                                        label="Course Unit"
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.courseUnit}
                                        onChange={formik.handleChange}
                                        error={formik.touched.courseUnit && Boolean(formik.errors.courseUnit)}
                                        helperText={formik.touched.courseUnit && formik.errors.courseUnit}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6} md={6} sm={12}>
                                    <div className="form-group" id="customSelect-input">
                                    <StyledTextField 
                                        select
                                        name="schoolID" 
                                        id="schoolID" 
                                        label="School" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.schoolID}
                                        onChange={formik.handleChange}
                                        error={formik.touched.schoolID && Boolean(formik.errors.schoolID)}
                                        helperText={formik.touched.schoolID && formik.errors.schoolID}
                                    >
                                        {school.map(data => (
                                            <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                                        ))}
                                    </StyledTextField>
                                </div>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                    <div className="form-group" id="select-input">
                                    <StyledTextField 
                                        select
                                        name="departmentID" 
                                        id="departmentID"
                                        label="Department"
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.departmentID}
                                        onChange={formik.handleChange}
                                        error={formik.touched.departmentID && Boolean(formik.errors.departmentID)}
                                        helperText={formik.touched.departmentID && formik.errors.departmentID}
                                    >
                                        {schoolDept.map(data => (
                                            <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                                        ))}
                                    </StyledTextField>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6} md={6} sm={12}>
                                    <div className="form-group" id="customSelect-input">
                                    <StyledTextField 
                                        select
                                        name="leadLecturerID" 
                                        id="leadLecturerID" 
                                        label="Lead Lecturer" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.leadLecturerID}
                                        onChange={formik.handleChange}
                                        error={formik.touched.leadLecturerID && Boolean(formik.errors.leadLecturerID)}
                                        helperText={formik.touched.leadLecturerID && formik.errors.leadLecturerID}
                                    >
                                        {lecturers.map(data => (
                                            <MenuItem key={data.id} value={data.id}>{data.firstName} {data.lastName}({data.staffID})</MenuItem>
                                        ))}
                                    </StyledTextField>
                                </div>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                    <div className="form-group" id="select-input">
                                    <StyledTextField 
                                        select
                                        name="assistantLecturerID" 
                                        id="assistantLecturerID"
                                        label="Assistant Lecturer"
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.assistantLecturerID}
                                        onChange={formik.handleChange}
                                        error={formik.touched.assistantLecturerID && Boolean(formik.errors.assistantLecturerID)}
                                        helperText={formik.touched.assistantLecturerID && formik.errors.assistantLecturerID}
                                    >
                                        {lecturers.map(data => (
                                            <MenuItem key={data.id} value={data.id}>{data.firstName} {data.lastName}({data.staffID})</MenuItem>
                                        ))}
                                    </StyledTextField>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6} md={6} sm={12}>
                                    <div className="form-group" id="customSelect-input">
                                    <StyledTextField 
                                        select
                                        name="otherCourseLecturer" 
                                        id="otherCourseLecturer" 
                                        label="Other Course Lecturer" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.otherCourseLecturer}
                                        onChange={formik.handleChange}
                                        error={formik.touched.otherCourseLecturer && Boolean(formik.errors.otherCourseLecturer)}
                                        helperText={formik.touched.otherCourseLecturer && formik.errors.otherCourseLecturer}
                                    >
                                        {lecturers.map(data => (
                                            <MenuItem key={data.id} value={data.id}>{data.firstName} {data.lastName}({data.staffID})</MenuItem>
                                        ))}
                                    </StyledTextField>
                                </div>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                <div className="form-group" id="checkboxes">
                                    <FormControlLabel control={
                                        <Checkbox 
                                            defaultChecked 
                                            color="success"
                                            checked={checked[0]}
                                            onChange={handleCheck1}
                                        />
                                    } label="General" />
                                    <FormControlLabel control={
                                        <Checkbox 
                                            color="success"
                                            checked={checked[1]}
                                            onChange={handleCheck2}
                                        />
                                    } label="Departmental" />
                                    <FormControlLabel control={
                                        <Checkbox 
                                            color="success"
                                            checked={isOptional}
                                            onChange={handleCheck3}
                                        />
                                    } label="Optional" />
                                </div>
                            </Col>
                        </Row>
                        {checked[0] &&
                        <Row>
                            <Col lg={12} md={12} sm={12}>
                                    <div className="form-group" id="multi-select-input">
                                    <StyledFormControl sx={{ m: 1,  marginTop: 2 }}>
                                        <InputLabel 
                                            id="demo-multiple-name-label" 
                                            shrink={true} 
                                            style={{background: '#FFFFFF', padding: 0}}
                                        >
                                            Eligible Departments
                                        </InputLabel>
                                            <Select
                                                labelId="demo-multiple-name-label"
                                                id="demo-multiple-name"
                                                multiple
                                                value={eligibleDepartments}
                                                onChange={handleChange}
                                                label="School"
                                                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                                renderValue={(selected) => (
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {selected.map((id) => {
                                                       let name = dept.find(x => x.id === id).name
                                                        return (
                                                            <Chip key={id} label={name} /> 
                                                        )
                                                    })}
                                                    </Box>
                                                )}
                                                MenuProps={MenuProps}
                                            >
                                            {dept.map((data) => (
                                                <MenuItem
                                                key={data.id}
                                                value={data.id}
                                                name={data.name}
                                                style={getStyles(data.name, eligibleDepartments, theme)}
                                                >
                                                {data.name}
                                                </MenuItem>
                                            ))}
                                            </Select>
                                    </StyledFormControl>
                                </div>
                            </Col>
                        </Row>
                        }
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

export default EditCourse