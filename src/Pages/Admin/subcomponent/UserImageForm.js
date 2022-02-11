import ImageUploading from "react-images-uploading";
import {useState} from 'react'
import {Container, Row, Col} from 'react-bootstrap';
import {imageUpload} from '../../../services/biodataService'
import {PopupAlert} from '../../components/Alert';


const UserImageForm = ({data}) => {
    const[showAlert, setShowAlert] = useState(false) 
    const[alertType, setAlertType] = useState("")
    const[message, setMessage] = useState("")
    const [isSubmit, setIsSubmit] = useState(false)

    const [images, setImages] = useState([]);
    const maxNumber = 1
    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
    };

    const { REACT_APP_ACE_URL } = process.env;

    const handleUpload = async() => {
        if(images.length < 1){
            setMessage("No Images Added for Upload")
            setAlertType("danger")
            setShowAlert(true)
        }
        else{
            setIsSubmit(true)
            try{
                let form = new FormData()
                form.append("image", images[0].file)
                const res = await imageUpload(data.id, form)
                if(res.status === 200){
                    setMessage(res.data.message)
                    setAlertType("success")
                    setShowAlert(true)
                }
            }
            catch(err){
                setMessage("Upload Failed")
                setAlertType("danger")
                setShowAlert(true)
            }
            setIsSubmit(false)
        }
    }

    return (
        <Container>
            {showAlert && <PopupAlert alertType={alertType} setShowAlert={setShowAlert} message={message}/>}  
            <Row>
                <Col lg={12} md={12} sm={12}>
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
                        <div className="upload__image-wrapper additional student-img-upload">
                            {images.length !== 0 ? imageList.map((image, index) => (
                            <div key={index} className="image-item add">
                                <img src={image.data_url} alt="" width="100" />
                                <div className="image-item__btn-wrapper">
                                <button type="button" className="updateBtn" onClick={() => onImageUpdate(index)}>Update <span className="iconify" data-icon="bx:bx-image-add" data-inline="false"></span></button>
                                <button type="button" className="deleteBtn" onClick={() => onImageRemove(index)}><span className="iconify" data-icon="fluent:delete-dismiss-24-regular" data-inline="false"></span></button>
                                </div>
                            </div>
                            )) 
                            :
                            <div className="user-image-item">
                                <img src={data.userImageURL ? `${REACT_APP_ACE_URL}/${data.userImageURL}` : "./assets/images/passportPhoto.png"} alt="User Placeholder" />
                            </div>
                            }
                            {images.length < 1 &&
                            <div className="imageUplaodLabel">
                               Add User Profile Image
                            </div>
                            }
                            {images.length === 0 && 
                                <button 
                                type="button"
                                className="uploadBtn"
                                style={isDragging ? { color: "red" } : null}
                                onClick={onImageUpload}
                                {...dragProps}
                                >
                                {isDragging ?
                                <span>Drop Image Here <span className="iconify" data-icon="bx:bx-image-add" data-inline="false"></span></span>
                                :
                                <span>Upload <span className="iconify" data-icon="bx:bx-image-add" data-inline="false"></span></span>
                                }
                                </button>
                            }
                            {/* &nbsp;
                            <button onClick={onImageRemoveAll}>Remove all image</button> */}
                        </div>
                        )}
                    </ImageUploading>
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col lg={12} md={12} sm={12}>
                    <button type="button" onClick={handleUpload} className="biodata-btn" disabled={isSubmit}>{isSubmit ? "Uploading" : "Upload" }<span className="iconify" data-icon="entypo:arrow-long-right" data-inline="false"></span></button>
                </Col>
            </Row>
        </Container>
    )
}

export default UserImageForm
