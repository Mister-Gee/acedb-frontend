import {Modal, Tabs, Tab} from 'react-bootstrap';
import BiodataForm from './BiodataForm';
import UserImageForm from './UserImageForm';

const UpdateStudentBiodata = (props) => {

    return (
        <Modal {...props} 
            aria-labelledby="contained-modal-title-vcenter"
            size="xl"
            centered
            className="add-new-modal"
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Biodata ({props.data.fullName ? props.data.fullName : `${props.data.firstName} ${props.data.lastName}`})
            </Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
            <Tabs defaultActiveKey="studentBiodata" id="uncontrolled-tab-example" className="mt-4 session-tab">
                <Tab eventKey="studentBiodata" title="Update Student Biodata">  
                    <BiodataForm 
                        data={props.data}
                    />
                </Tab>
                <Tab eventKey="studentImage" title="Upload Student Image">  
                    <UserImageForm />
                </Tab>
            </Tabs>            
        </Modal.Body>
        <Modal.Footer>
            <button onClick={props.onHide} className="cancel-btn">Close</button>
        </Modal.Footer>
    </Modal>
    )
}

export default UpdateStudentBiodata