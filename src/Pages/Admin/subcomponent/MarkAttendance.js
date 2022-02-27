import {Modal, Container, Row, Col, Button} from 'react-bootstrap';
import {useFormik} from 'formik';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import { Select } from '@material-ui/core';
import { useTheme } from '@mui/material/styles';
import * as Yup from 'yup';
import {useState} from 'react';
import {PopupAlert} from '../../components/Alert';
import StyledTextField from '../../components/StyledTextField';
import StyledFormControl from '../../components/StyledFormControl';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { createClassAttendance } from '../../../services/attendanceService';

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

  function getStyles(name, students, theme) {
    return {
      fontWeight:
      students.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

const MarkAttendance = (props) => {
    const theme = useTheme();
    const[showAlert, setShowAlert] = useState(false) 
    const[alertType, setAlertType] = useState("")
    const[message, setMessage] = useState("")
    const [isSubmit, setIsSubmit] = useState(false)
    const [dept, setDept] = useState([])
    const [students, setStudents] = useState([]);
  

    const handleChange = (event) => {
        const { target: { value }, } = event;

        setStudents( typeof value === 'string' ? value.split(',') : value,  );
      };

    

    const onSubmit = async(data) => {
        setIsSubmit(true)
        try {
            data.presentStudent = students
            const res = await createClassAttendance(data)
            if (res.status === 200 || res.status === 204){
                setIsSubmit(false)
                setAlertType("success")
                setMessage("Attendance Marked")
                setShowAlert(true)
                setIsSubmit(false)
            }
            else{
                setIsSubmit(false)
                setAlertType("danger")
                setMessage("Failed to Mark Attendance")
                setShowAlert(true)
                setIsSubmit(false)
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
        courseID: props.courseID,
        classWeek: 0
    }

    const validationSchema = Yup.object({
        classWeek: Yup.number().required("Class Week is Required")
    })

    const formik = useFormik({
        // enableReinitialize: true,
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
                Student Attendance for {props.attData.department} Department
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
                                        name="Department" 
                                        id="courseTitle" 
                                        label="Department" 
                                        disabled={true}
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={props.attData.department}
                                    />
                                </div>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                    <div className="form-group" id="select-input">
                                    <StyledTextField 
                                        type='number'
                                        name="classWeek" 
                                        id="classWeek"
                                        label="Class Week"
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.classWeek}
                                        onChange={formik.handleChange}
                                        error={formik.touched.classWeek && Boolean(formik.errors.classWeek)}
                                        helperText={formik.touched.classWeek && formik.errors.classWeek}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12} md={12} sm={12}>
                                    <div className="form-group" id="multi-select-input">
                                    <StyledFormControl sx={{ m: 1,  marginTop: 2 }}>
                                        <InputLabel 
                                            id="demo-multiple-name-label" 
                                            shrink={true} 
                                            style={{background: '#FFFFFF', padding: 0}}
                                        >
                                            Students
                                        </InputLabel>
                                            <Select
                                                labelId="demo-multiple-name-label"
                                                id="demo-multiple-name"
                                                multiple
                                                value={students}
                                                onChange={handleChange}
                                                label="Students"
                                                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                                renderValue={(selected) => (
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {selected.map((id) => {
                                                       let name = props.attData?.students?.find(x => x.id === id).name
                                                        return (
                                                            <Chip key={id} label={name} /> 
                                                        )
                                                    })}
                                                    </Box>
                                                )}
                                                MenuProps={MenuProps}
                                            >
                                            {props.attData?.students?.map((data) => (
                                                <MenuItem
                                                key={data.id}
                                                value={data.id}
                                                name={data.name}
                                                style={getStyles(data.name, students, theme)}
                                                >
                                                {data.name}
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

export default MarkAttendance