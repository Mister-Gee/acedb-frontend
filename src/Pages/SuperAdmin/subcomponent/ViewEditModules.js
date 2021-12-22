import {Modal, Container, Row, Col, Button} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import {PopupAlert} from '../../components/Alert';
import {getModules, editModules} from '../../../services/institutionServices';
import { AllCheckerCheckbox, Checkbox, CheckboxGroup } from '@createnl/grouped-checkboxes';


const ViewEditModules = (props) => {
    const [modules, setModules] = useState([])

    const [modulesArray, setModulesArray] = useState([])
    

    const[showAlert, setShowAlert] = useState(false) 
    const[alertType, setAlertType] = useState("")
    const[message, setMessage] = useState("")
    const [isSubmit, setIsSubmit] = useState(false)

    const onCheckboxChange = (checkboxes) => {
        checkboxes.map(id => {
            if (id.checked){
                let newArray = [...modulesArray, id.value];
                if (modulesArray.includes(id.value)) {
                  newArray = newArray.filter(modules => modules !== id.value);
                }
                setModulesArray(newArray)
                console.log(modulesArray)
            }
        })
    } 

    const onSubmit = async(event) => {
        event.preventDefault();
        let data = {
            institutionId: props.editInstitutionId,
            moduleIds: modulesArray,
            isDeleted: true
        }
        setIsSubmit(true)
        try{
            const res = await editModules(data)
            if (res.status === 200 || res.status === 204){
                setAlertType("success")
                setMessage("Modules successfully Unlinked From Institution")
                setShowAlert(true)
                setIsSubmit(false)
                props.setContentLength(props.contentLength - 1)
            }
            else{
                setAlertType("danger")
                setMessage("Failed to unlink Modules to Institution")
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


    // const handleCheckboxChange = event => {
    //     let newArray = [...modulesArray, event.target.id];
    //     if (modulesArray.includes(event.target.id)) {
    //       newArray = newArray.filter(modules => modules !== event.target.id);
    //     }
    //     setModulesArray(newArray)
    //   };

    useEffect(() => {
        const fetchData = async() => {
            try{
                const res = await getModules()
                setModules(res.data)
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
                    Edit Institution Modules
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                        {showAlert && <PopupAlert alertType={alertType} setShowAlert={setShowAlert} message={message}/>}  
                    <Row>
                        <Col lg={12}>
                            <div className="add-module-section">
                                <div className="table-header">
                                   <strong> Select the modules/features to be deleted for {props.editInstitutionName}</strong>
                                </div>
                            </div> 
                        </Col>
                    </Row>
                    <Row  className="border" id="checkboxes">
                        <CheckboxGroup onChange={onCheckboxChange}>
                            <Col lg={12}  className="module-head">
                                <label>
                                    <AllCheckerCheckbox />
                                        Select All Modules
                                </label>
                            </Col>
                        
                        {modules.map((data) => (
                            <Col lg={3} md={6} sm={12} key={data.id} className="form-group pt-2">
                                <label> <Checkbox value={data.id}/> {data.name}</label>
                            </Col>
                        ))}
                        </CheckboxGroup>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} className="cancel-btn">Close</Button>
                <button type="submit" className="submit-btn" onClick={(event) => onSubmit(event)} disabled={isSubmit ? true : false}>{
                        isSubmit ? "Unlinking..." : "Unlink"
                }</button>
            </Modal.Footer>
    </Modal>
    )
}

export default ViewEditModules
