import {Modal, Container, Row, Col, Button} from 'react-bootstrap';
import {useFormik} from 'formik';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import * as Yup from 'yup';
import {useState, useEffect} from 'react';
import {PopupAlert} from '../../components/Alert';
import {getInstitution, getLicenseType, generateLicenseKey, createLicense} from '../../../services/institutionServices';

const AddLicenseManagerModal = (props) => {
    const [institution, setInstitution] = useState([])
    const [licenseType, setLicenseType] = useState([])
    const [licenseKey, setLicenseKey] = useState("")
    const[showAlert, setShowAlert] = useState(false) 
    const[alertType, setAlertType] = useState("")
    const[message, setMessage] = useState("")
    const [isSubmit, setIsSubmit] = useState(false)

    useEffect(() => {
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

    useEffect(() => {
        const fetchData = async() => {
            try{
                const res = await getLicenseType()
                setLicenseType(res.data)
            }
            catch(err){
                console.log(err.message)
            }
        }
        fetchData()
    }, [])

    const onSubmit = async(data) => {
        setIsSubmit(true)
        data.license = licenseKey
        console.log(data)
        try{
            const res = await createLicense(data)
            if (res.status === 200 || res.status === 204){
                setAlertType("success")
                setMessage("License Created Successfully")
                setShowAlert(true)
                setIsSubmit(false)
                props.setContentLength(props.contentLength + 1)
            }
            else{
                setAlertType("danger")
                setMessage("Fail to create Lcense")
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
        institutionId: '',
        lisenceTypeId: '',
        expiryDate: ''
    }

    const validationSchema = Yup.object({
        institutionId: Yup.string().required("Institution Name is Required"),
        lisenceTypeId: Yup.string().required(" Type of License is Required "),
        expiryDate: Yup.string()
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        onSubmit: onSubmit,
        validationSchema
    })

    const generateLicense = async() => {
        try{
            const res = await generateLicenseKey()
            setLicenseKey(res.data)
        }
        catch(err){
            console.log(err.message)
        }
    
    }

    return (
        <Modal {...props} 
            aria-labelledby="contained-modal-title-vcenter"
            size="lg"
            centered
            className="add-new-modal"
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Create New License
            </Modal.Title>
        </Modal.Header>
                <form onSubmit={formik.handleSubmit} >
                    <Modal.Body className="">
                        <Container>        
                        {showAlert && <PopupAlert alertType={alertType} setShowAlert={setShowAlert} message={message}/>}   
                        <Row>
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
                                        <MenuItem value="">Select Institution</MenuItem>
                                        {institution.map((data) => (
                                            <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                            </Col>
                            <Col lg={6} md={6} sm={12}>
                                    <div className="form-group" id="select-input">
                                    <TextField 
                                        select 
                                        name="lisenceTypeId" 
                                        id="lisenceTypeId"
                                        label="License Type" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.lisenceTypeId}
                                        onChange={formik.handleChange}
                                        error={formik.touched.lisenceTypeId && Boolean(formik.errors.lisenceTypeId)}
                                        helperText={formik.touched.lisenceTypeId && formik.errors.lisenceTypeId}
                                    >
                                        <MenuItem value="">Choose License Type</MenuItem>
                                        {licenseType.map(data => (
                                            <MenuItem value={data.id} key={data.id}> {data.name} </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            {formik.values.lisenceTypeId === "494aae4e-ae84-4568-a79c-3a38b7946b20" &&
                            <Col lg={6} md={6} sm={12}>
                                    <div className="form-group">
                                    <TextField 
                                        type="date" 
                                        name="expiryDate" 
                                        id="expiryDate" 
                                        placeholder="Set License Expiring Date"
                                        label="Expiring Date" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.expiryDate}
                                        onChange={formik.handleChange}
                                        error={formik.touched.expiryDate && Boolean(formik.errors.expiryDate)}
                                        helperText={formik.touched.expiryDate && formik.errors.expiryDate}
                                    />
                                    </div>
                            </Col>
                            }
                            <Col lg={6} md={6} sm={12}>
                                    <div className="form-group">
                                    <TextField 
                                        type="text" 
                                        name="license" 
                                        id="license"
                                        placeholder="License"
                                        label="License"
                                        disabled={true} 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={licenseKey}
                                        onChange={formik.handleChange}
                                        error={formik.touched.license && Boolean(formik.errors.license)}
                                        helperText={formik.touched.license && formik.errors.license}
                                    />
                                </div>
                                <button type="button" className="generate-btn" onClick={generateLicense}>Generate License Key</button>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide} className="cancel-btn">Close</Button>
                    <button type="submit" className="submit-btn" disabled={isSubmit ? true : false}>
                        {isSubmit ? "Submitting..." : "Submit"}
                    </button>
                    
                </Modal.Footer>
            </form>
    </Modal>
    )
}

export default AddLicenseManagerModal