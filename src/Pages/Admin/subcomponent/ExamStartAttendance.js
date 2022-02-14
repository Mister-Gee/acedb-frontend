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
import StyledFormControl from '../../components/StyledFormControl';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { getAllRegStudentCourseByDept } from '../../../services/courseServices';
import { examStartAttendance } from '../../../services/attendanceService';

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

const ExamStartAttendance = (props) => {
    const theme = useTheme();
    const[showAlert, setShowAlert] = useState(false) 
    const[alertType, setAlertType] = useState("")
    const[message, setMessage] = useState("")
    const [isSubmit, setIsSubmit] = useState(false)
    const [students, setStudent] = useState([])
    const [selectedStudent, setSelectedStudent] = useState([]);


    const handleChange = (event) => {
        const { target: { value }, } = event;

        setSelectedStudent( typeof value === 'string' ? value.split(',') : value,  );
      };

    useEffect(() => {
        const fetchData = async() => {
            const res = await getAllRegStudentCourseByDept(props.courseId)
            const data = res.data
            if(Array.isArray(data)){
                setStudent(data)
            }
            else{
                setStudent([])
            }
        } 
        fetchData()
    }, [props.courseId])

    const onSubmit = async(data) => {
        setIsSubmit(true)
        try {
            data.examStartingStudents = selectedStudent
            const res = await examStartAttendance(data)
            if (res.status === 200 || res.status === 204){
                setIsSubmit(false)
                setAlertType("success")
                setMessage("Start Attendance Marked")
                setShowAlert(true)
                props.setContentLength(props.contentLength + 1)
            }
            else{
                setIsSubmit(false)
                setAlertType("danger")
                setMessage("Failed to Mark Attendance")
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
        courseID: props.courseId,
        supervisorID: props.supervisorId,
    }

    
    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        onSubmit
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
                Exam Start Attendance
            </Modal.Title>
        </Modal.Header>
                <form onSubmit={formik.handleSubmit} >
                    <Modal.Body className="">
                        <Container>        
                        {showAlert && <PopupAlert alertType={alertType} setShowAlert={setShowAlert} message={message}/>}   
                        <Row>
                            <Col lg={12} md={12} sm={12}>
                                    <div className="form-group" id="multi-select-input">
                                    <StyledFormControl sx={{ m: 1,  marginTop: 2 }}>
                                        <InputLabel 
                                            id="demo-multiple-name-label" 
                                            shrink={true} 
                                            style={{background: '#FFFFFF', padding: 0}}
                                        >
                                            Attending Student
                                        </InputLabel> 
                                            <Select
                                                labelId="demo-multiple-name-label"
                                                id="demo-multiple-name"
                                                multiple
                                                value={selectedStudent}
                                                onChange={handleChange}
                                                label="School"
                                                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                                renderValue={(selected) => (
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {selected.map((id) => {
                                                       let name = students.find(x => x.id === id).name
                                                        return (
                                                            <Chip key={id} label={name} /> 
                                                        )
                                                    })}
                                                    </Box>
                                                )}
                                                MenuProps={MenuProps}
                                            >
                                            {students.map((data) => (
                                                <MenuItem
                                                key={data.id}
                                                value={data.id}
                                                name={data.name}
                                                style={getStyles(data.name, selectedStudent, theme)}
                                                >
                                                {data.name} ({data.matricNumber})
                                                </MenuItem>
                                            ))}
                                            </Select>
                                    </StyledFormControl>
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

export default ExamStartAttendance