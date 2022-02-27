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
import {getBloodGroup, getGenotype} from '../../../services/commonServices';
import { getAllMedicalConditions } from '../../../services/institutionAdminServices';
import StyledTextField from '../../components/StyledTextField';
import StyledFormControl from '../../components/StyledFormControl';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import {addAllRecord} from '../../../services/healthService';


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

  function getStyles(name, medicalConditions, theme) {
    return {
      fontWeight:
        medicalConditions.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

const NewMedRecord = (props) => {
    const theme = useTheme();
    const[showAlert, setShowAlert] = useState(false) 
    const[alertType, setAlertType] = useState("")
    const[message, setMessage] = useState("")
    const [isSubmit, setIsSubmit] = useState(false)
    const [bloodGroup, setBloodGroup] = useState([]);
    const [genotype, setGenotype] = useState([]);
    const [medicalConditionsList, setMedicalConditionsList] = useState([]);
    const [medicalConditions, setMedicalConditions] = useState([]);


  
    const handleChange = (event) => {
        const { target: { value }, } = event;

        setMedicalConditions( typeof value === 'string' ? value.split(',') : value,  );
      };

    useEffect(() => {
        const fetchData = async() => {
            const res = await getBloodGroup()
            const data = res.data
            if(Array.isArray(data)){
                setBloodGroup(data)
            }
            else{
                setBloodGroup([])
            }
        } 
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async() => {
            const res = await getGenotype()
            const data = res.data
            if(Array.isArray(data)){
                setGenotype(data)
            }
            else{
                setGenotype([])
            }
        } 
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async() => {
            const res = await getAllMedicalConditions()
            const data = res.data
            if(Array.isArray(data)){
                setMedicalConditionsList(data)
            }
            else{
                setMedicalConditionsList([])
            }
        } 
        fetchData()
    }, [])


    const onSubmit = async(data) => {
        setIsSubmit(true)
        try {
            data.medicalConditions = medicalConditions
            const res = await addAllRecord(data)
            if (res.status === 200 || res.status === 204){
                setIsSubmit(false)
                setAlertType("success")
                setMessage("Medical Record Created Successfully")
                setShowAlert(true)
                props.setContentLength(props.contentLength + 1)
            }
            else{
                setIsSubmit(false)
                setAlertType("danger")
                setMessage("Failed to Create Medical Record")
                setShowAlert(true)
            }
            setIsSubmit(false)
        }
        catch(err){
            setIsSubmit(false)
            setAlertType("danger")
            setMessage(err.response.data.message)
            setShowAlert(true)
            setIsSubmit(false)
        }
    }

    const initialValues = {
        userId: '',
        bloodGroupID: '',
        genotypeID: '',
        weight: 0,
        height: 0,
        familyDoctorName: '',
        familyDoctorPhoneNumber: '',
        additionalNote: '',
        otherMedicalConditions: ''
    }

    const validationSchema = Yup.object({
        userId: Yup.string().required("User is Required"),
        bloodGroupID: Yup.string().required("Blood Group is Required"),
        genotypeID: Yup.string().required("Genotype is Required"),
        weight: Yup.number().required("Weight is Required"),
        height: Yup.number().required("Height is Required"),
        familyDoctorName: Yup.string(),
        familyDoctorPhoneNumber: Yup.string(),
        additionalNote: Yup.string().required("Additional Note is Required"),
        otherMedicalConditions: Yup.string(),
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
                Add New Medical Record
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
                                        name="userId" 
                                        id="userId" 
                                        label="Email/Matric Number/Staff ID"
                                        placeholder='Email/Matric Number/Staff ID' 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.userId}
                                        onChange={formik.handleChange}
                                        error={formik.touched.userId && Boolean(formik.errors.userId)}
                                        helperText={formik.touched.userId && formik.errors.userId}
                                    />
                                </div>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                    <div className="form-group" id="select-input">
                                    <StyledTextField 
                                        select
                                        name="bloodGroupID" 
                                        id="bloodGroupID"
                                        label="Blood Group"
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.bloodGroupID}
                                        onChange={formik.handleChange}
                                        error={formik.touched.bloodGroupID && Boolean(formik.errors.bloodGroupID)}
                                        helperText={formik.touched.bloodGroupID && formik.errors.bloodGroupID}
                                    >
                                        <MenuItem value=''>Select Blood Group</MenuItem>
                                        {bloodGroup.map(data => (
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
                                        name="genotypeID" 
                                        id="genotypeID" 
                                        label="Genotype" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.genotypeID}
                                        onChange={formik.handleChange}
                                        error={formik.touched.genotypeID && Boolean(formik.errors.genotypeID)}
                                        helperText={formik.touched.genotypeID && formik.errors.genotypeID}
                                    >
                                        <MenuItem value=''>Select Genotype</MenuItem>
                                        {genotype.map(data => (
                                            <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                                        ))}
                                    </StyledTextField>
                                </div>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                    <div className="form-group" id="select-input">
                                    <StyledTextField 
                                        type="number"
                                        name="weight" 
                                        id="weight"
                                        label="Weight"
                                        placeholder='Weight'
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.weight}
                                        onChange={formik.handleChange}
                                        error={formik.touched.weight && Boolean(formik.errors.weight)}
                                        helperText={formik.touched.weight && formik.errors.weight}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6} md={6} sm={12}>
                                    <div className="form-group" id="customSelect-input">
                                    <StyledTextField 
                                        type="number"
                                        name="height" 
                                        id="height" 
                                        label="Height"
                                        placeholder='Height' 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.height}
                                        onChange={formik.handleChange}
                                        error={formik.touched.height && Boolean(formik.errors.height)}
                                        helperText={formik.touched.height && formik.errors.height}
                                    />
                                </div>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                    <div className="form-group" id="select-input">
                                    <StyledTextField 
                                        name="additionalNote" 
                                        id="additionalNote"
                                        label="Additional Note"
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.additionalNote}
                                        onChange={formik.handleChange}
                                        error={formik.touched.additionalNote && Boolean(formik.errors.additionalNote)}
                                        helperText={formik.touched.additionalNote && formik.errors.additionalNote}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6} md={6} sm={12}>
                                    <div className="form-group" id="select-input">
                                    <StyledTextField 
                                        name="familyDoctorName" 
                                        id="familyDoctorName"
                                        label="Family Doctor Name"
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.familyDoctorName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.familyDoctorName && Boolean(formik.errors.familyDoctorName)}
                                        helperText={formik.touched.familyDoctorName && formik.errors.familyDoctorName}
                                    />
                                </div>
                            </Col>       
                            <Col lg={6} md={6} sm={12}>
                                    <div className="form-group" id="customSelect-input">
                                    <StyledTextField 
                                        name="familyDoctorPhoneNumber" 
                                        id="familyDoctorPhoneNumber" 
                                        label="Family Doctor Phone Number"
                                        placeholder="Family Doctor Phone Number" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.familyDoctorPhoneNumber}
                                        onChange={formik.handleChange}
                                        error={formik.touched.familyDoctorPhoneNumber && Boolean(formik.errors.familyDoctorPhoneNumber)}
                                        helperText={formik.touched.familyDoctorPhoneNumber && formik.errors.familyDoctorPhoneNumber}
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
                                            Medical Conditions
                                        </InputLabel>
                                            <Select
                                                labelId="demo-multiple-name-label"
                                                id="demo-multiple-name"
                                                multiple
                                                value={medicalConditions}
                                                onChange={handleChange}
                                                label="Medical Conditions"
                                                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                                renderValue={(selected) => (
                                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {selected.map((id) => {
                                                       let name = medicalConditionsList.find(x => x.id === id).name
                                                        return (
                                                            <Chip key={id} label={name} /> 
                                                        )
                                                    })}
                                                    </Box>
                                                )}
                                                MenuProps={MenuProps}
                                            >
                                            {medicalConditionsList.map((data) => (
                                                <MenuItem
                                                key={data.id}
                                                value={data.id}
                                                name={data.name}
                                                style={getStyles(data.name, medicalConditions, theme)}
                                                >
                                                {data.name}
                                                </MenuItem>
                                            ))}
                                            </Select>
                                    </StyledFormControl>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12} md={12} sm={12}>
                                    <div className="form-group" id="customText-area">
                                    <StyledTextField 
                                        name="otherMedicalConditions" 
                                        id="otherMedicalConditions" 
                                        label="Other Medical Conditions" 
                                        placeholder="Other Medical Conditions" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        multiline
                                        rows={2}
                                        maxRows={4}
                                        variant="outlined"
                                        value={formik.values.otherMedicalConditions}
                                        onChange={formik.handleChange}
                                        error={formik.touched.otherMedicalConditions && Boolean(formik.errors.otherMedicalConditions)}
                                        helperText={formik.touched.otherMedicalConditions && formik.errors.otherMedicalConditions}
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

export default NewMedRecord