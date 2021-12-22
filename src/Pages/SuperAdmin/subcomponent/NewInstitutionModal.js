import {Modal, Container, Row, Col, Button} from 'react-bootstrap';
import {useFormik} from 'formik';
import {useState, useEffect} from 'react';
import * as Yup from 'yup';
import {addNewInstitution, getInstitutionType} from '../../../services/institutionServices';
import {getState, getCountry} from '../../../services/commonServices';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import ImageUploading from "react-images-uploading";
import {PopupAlert} from '../../components/Alert';


const NewInstitutionModal = (props) => {
    const webUser = localStorage.getItem("webUserId")
    const[showAlert, setShowAlert] = useState(false) 
    const[alertType, setAlertType] = useState("")
    const[message, setMessage] = useState("")
    const [isSubmit, setIsSubmit] = useState(false) 

    const [institutionType, setInstitutionType] = useState([])
    const [stateId, setStateId] = useState([])
    const [countryId, setCountryId] = useState([])

    const [images, setImages] = useState([]);
    
    const onSubmit = async (data) => {
        if(images.length > 0){
            data.append("file", images)
        }
        setIsSubmit(true)

        try{
            const res = await addNewInstitution(data)
            if (res.status === 204 || res.status === 200){
                setAlertType("success")
                setMessage(`${data.name} successfully Added`)
                setShowAlert(true)
                setIsSubmit(false)
                props.setContentLength(props.contentLength + 1)
            }
            else{
                setAlertType("danger")
                setMessage(`Failed to add ${data.name}`)
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
        name: '',
        institutionTypeId: '',
        instituionEmail: '',
        principalName: '',
        principalPhoneNumber: '0',
        addressLine1: '',
        addressLine2: 'null',
        city: '',
        countryId: '',
        stateId: '',
        createdBy: webUser
    }

    const validationSchema = Yup.object({
        name: Yup.string().required("Institution Name is Required"),
        institutionTypeId: Yup.string().required("Type of Institution is Required "),
        instituionEmail: Yup.string().email("Invalid Email Entered").required("Principal Email is Required"),
        principalName: Yup.string().required("Principal Name is Required"),
        principalPhoneNumber: Yup.string().min(11).required('A phone number is required'),
        addressLine1: Yup.string().required("Institution Address Required"),
        addressLine2: Yup.string(),
        city: Yup.string().required("City is Required"),
        countryId: Yup.string().required("Country is Required"),
        stateId: Yup.string().required("State is Required"),
        createdBy: Yup.string()
    })

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })
    const maxNumber = 1;
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    useEffect(()=> {
        const fetchData = async () => {
            try{
                let res = await getState(formik.values.countryId)
                setStateId(res.data)
            }
            catch(err){
                console.log(err.message)
            }  
        }
        fetchData()
    }, [formik.values.countryId])

    useEffect(()=> {
        const fetchData = async () => {
            try{
                let res = await getCountry()
                setCountryId(res.data.countries)
            }
            catch(err){
                console.log(err.message)
            }  
        }
        fetchData()
    }, [])

    useEffect(()=> {
        const fetchData = async () => {
            try{
                let res = await getInstitutionType()
                setInstitutionType(res.data)
            }
            catch(err){
                console.log(err.message)
            }  
        }
        fetchData()
    }, [])

    return (
        <Modal {...props} 
            aria-labelledby="contained-modal-title-vcenter"
            size="lg"
            centered
            className="add-new-modal"
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Add New Institutions
            </Modal.Title>
        </Modal.Header>
                <form onSubmit={formik.handleSubmit}>
                    <Modal.Body className="">
                        <Container> 
                        {showAlert && <PopupAlert alertType={alertType} setShowAlert={setShowAlert} message={message}/>}   
                        <Row>
                            <Col lg={6}>
                                <Row>
                                    <TextField 
                                        type="text" 
                                        name="name" 
                                        id="name" 
                                        placeholder="Name of Institution" 
                                        label="Name of Institution" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                    />
                                </Row>
                                <Row>
                                    <TextField 
                                        label="Institution Type" 
                                        select 
                                        name="institutionTypeId"
                                        placeholder="Name of Institution" 
                                        id="institutionTypeId" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.institutionTypeId}
                                        onChange={formik.handleChange}
                                        error={formik.touched.institutionTypeId && Boolean(formik.errors.institutionTypeId)}
                                        helperText={formik.touched.institutionTypeId && formik.errors.institutionTypeId} 
                                    >
                                        <MenuItem value=""> Type of Institution </MenuItem>
                                        {institutionType.map((data)=>(
                                            <MenuItem key={data.id} value={data.id}>{data.name} </MenuItem>
                                        ))}
                                    </TextField>
                                </Row>
                                <Row>
                                <TextField 
                                    type="text" 
                                    name="addressLine1" 
                                    id="addressLine1"
                                    placeholder="Address of Institution"
                                    label="Address of Institution" 
                                    margin="normal"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    variant="outlined"
                                    value={formik.values.addressLine1}
                                    onChange={formik.handleChange}
                                    error={formik.touched.addressLine1 && Boolean(formik.errors.addressLine1)}
                                    helperText={formik.touched.addressLine1 && formik.errors.addressLine1}
                                />
                                </Row>
                                <Row id="select-input">
                                    <TextField 
                                        label="State" 
                                        select 
                                        name="stateId"
                                        id="stateId" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.stateId}
                                        onChange={formik.handleChange}
                                        error={formik.touched.stateId && Boolean(formik.errors.stateId)}
                                        helperText={formik.touched.stateId && formik.errors.stateId} 
                                    >
                                         <MenuItem value=""> Select State </MenuItem>
                                        {stateId.map((data)=>(
                                            <MenuItem key={data.id} value={data.id}>{data.name} </MenuItem>
                                        ))}
                                    </TextField>
                                </Row>
                                <Row>
                                    <TextField  
                                        type="text" 
                                        name="principalName" 
                                        id="principalName"
                                        placeholder="Name of Principal"
                                        label="Name of Principal" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.principalName}
                                        onChange={formik.handleChange}
                                        error={formik.touched.principalName && Boolean(formik.errors.principalName)}
                                        helperText={formik.touched.principalName && formik.errors.principalName}
                                    />
                                </Row>
                            </Col> 
                            <Col lg={6}>
                                <Row>
                                    <ImageUploading
                                        multiple
                                        value={images}
                                        onChange={onChange}
                                        maxNumber={maxNumber}
                                        dataURLKey="data_url"
                                    >
                                        {({
                                        imageList,
                                        onImageUpload,
                                        onImageRemoveAll,
                                        onImageUpdate,
                                        onImageRemove,
                                        isDragging,
                                        dragProps
                                        }) => (
                                        // write your building UI
                                        <div className="upload__image-wrapper additional">
                                            {images.length !== 0 ? imageList.map((image, index) => (
                                            <div key={index} className="image-item add">
                                                <img src={image.data_url} alt="" width="100" />
                                                <div className="image-item__btn-wrapper">
                                                <button type="button" className="updateBtn" onClick={() => onImageUpdate(index)}>Update <span className="iconify" data-icon="bx:bx-image-add" data-inline="false"></span></button>
                                                <button type="button" className="deleteBtn" onClick={() => onImageRemove(index)}><span className="iconify" data-icon="fluent:delete-24-filled" data-inline="false"></span></button>
                                                </div>
                                            </div>
                                            ))
                                            :
                                            <div className="image-item">
                                                <img src="./assets/images/placeholder.png" alt="School Placeholder" />
                                            </div>
                                            }
                                            <div className="uploadLabel">
                                                You can change your profile picture
                                            </div>
                                            {images.length === 0 && 
                                                <button 
                                                type="button"
                                                className="uploadBtn"
                                                style={isDragging ? { color: "red" } : null}
                                                onClick={onImageUpload}
                                                {...dragProps}
                                                >
                                                Upload <span className="iconify" data-icon="bx:bx-image-add" data-inline="false"></span>
                                                </button>
                                            }
                                            {/* &nbsp;
                                            <button onClick={onImageRemoveAll}>Remove all image</button> */}
                                        </div>
                                        )}
                                    </ImageUploading>
                                </Row>
                                <Row>
                                    <TextField 
                                        type="text" 
                                        name="city" 
                                        id="city"
                                        placeholder="City"
                                        label="City" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.city}
                                        onChange={formik.handleChange}
                                        error={formik.touched.city && Boolean(formik.errors.city)}
                                        helperText={formik.touched.city && formik.errors.city}
                                    />
                                </Row>
                                <Row id="select-input">
                                <TextField 
                                        label="Country" 
                                        select 
                                        name="countryId"
                                        id="countryId" 
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.countryId}
                                        onChange={formik.handleChange}
                                        error={formik.touched.countryId && Boolean(formik.errors.countryId)}
                                        helperText={formik.touched.countryId && formik.errors.countryId} 
                                    >
                                         <MenuItem value=""> Select Country </MenuItem>
                                        {countryId.map((data)=>(
                                            <MenuItem key={data.id} value={data.id}>{data.name} </MenuItem>
                                        ))}
                                    </TextField>
                                </Row>
                                <Row>
                                    <TextField 
                                        type="email" 
                                        name="instituionEmail" 
                                        id="instituionEmail" 
                                        placeholder="Institution  Email"
                                        label="Institution  Email"
                                        margin="normal"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                        value={formik.values.instituionEmail}
                                        onChange={formik.handleChange}
                                        error={formik.touched.instituionEmail && Boolean(formik.errors.instituionEmail)}
                                        helperText={formik.touched.instituionEmail && formik.errors.instituionEmail}    
                                    />
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            {/* <   Col lg={6} md={12} sm={12}>
                                    <label htmlFor="file">Upload School Profile Picture</label>
                                    <TextField type="file" name="file" id="file" className="form-control" />
                                    <small id="passwordHelpBlock" className="form-text text-danger">
                                       
                                    </small>
                            </Col> */}
                            {/* <Col lg={6} md={6} sm={12}>
                                    <div className="custom-file">
                                        <input type="file" className="custom-file-input" id="validatedCustomFile" required />
                                        <label className="custom-file-label" htmlFor="validatedCustomFile">Upload ...</label>
                                        <small id="passwordHelpBlock" className="form-text text-danger">
                                            
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

export default NewInstitutionModal
