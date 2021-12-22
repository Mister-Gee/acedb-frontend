import {Modal, Container, Row, Col, Button} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import {PopupAlert} from '../../components/Alert';
import {getModules, getInstitution, linkModules} from '../../../services/institutionServices';
import {Selected, NoneSelected} from './SelectedSchool';
import MultiselectCheckbox from "react-multiselect-checkbox";
import { AllCheckerCheckbox, Checkbox, CheckboxGroup } from '@createnl/grouped-checkboxes';

const LinkInstitutionModal = (props) => {
    const [addedInstitution, setAddedInstitution] = useState([])
    const [institution, setInstitution] = useState("")
    const [add, setAdd] = useState(false)
    const [modules, setModules] = useState([])

    const[showAlert, setShowAlert] = useState(false) 
    const[alertType, setAlertType] = useState("")
    const[message, setMessage] = useState("")
    const [isSubmit, setIsSubmit] = useState(false)
  

    const [modulesArray, setModulesArray] = useState([])

    const onCheckboxChange = (checkboxes) => {
        console.log(checkboxes)
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
    
    const onSubmit = async (event) => {
        event.preventDefault();
        let data = {
            institutionId: institution,
            moduleIds: modulesArray
        }
        setIsSubmit(true)
        try{
            const res = await linkModules(data)
            if (res.status === 200 || res.status === 204){
                setAlertType("success")
                setMessage("Modules successfully Linked to Institution")
                setShowAlert(true)
                setIsSubmit(false)
                props.setContentLength(props.contentLength + 1)
            }
            else{
                setAlertType("danger")
                setMessage("Fail to link Modules to Institution")
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
    //     console.log(modulesArray)
    //   };

    useEffect(() => {
        const fetchData = async() => {
            try{
                const res = await getInstitution()
                setAddedInstitution(res.data)
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
                const res = await getModules()
                setModules(res.data)
            }
            catch(err){
                console.log(err.message)
            }
        }
        fetchData()
    }, [])

    const addSchool = () => {
        setAdd(true)
    }

    const removeSchool = () => {
        setAdd(false)
        setInstitution("")
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
                    Add New Institution Link
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>   
                        {showAlert && <PopupAlert alertType={alertType} setShowAlert={setShowAlert} message={message}/>}  
                    <Row>
                        <Col lg={12}>
                            <div className="link-select-section">
                                <div className="link-select">
                                    <select name="institution" value={institution} onChange={e => setInstitution(e.target.value)}>
                                        <option value="">---- Select Institution ----</option>
                                        {addedInstitution.map((data) => (
                                            <option id={data.value} value={data.id} key={data.id}>{data.name}</option>
                                        ))}
                                    </select>
                                    <Button className="add-btn" onClick={addSchool}>Add</Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <div className="selected-school-section mt-4 border-bottom pb-3">
                            {add ? <Selected schoolProp={institution} /> : <NoneSelected />}
                            <Button className="selected-btn" onClick={removeSchool}>Remove</Button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12} md={12} sm={12}>
                            <div className="add-module-section">
                                <div className="table-header">
                                    Select the modules/features to be activated for the selected Institution
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
                        isSubmit ? "Linking..." : "Link"
                    }</button>
            </Modal.Footer>
    </Modal>
    )
}

export default LinkInstitutionModal
