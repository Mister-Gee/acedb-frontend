import {Modal, Tabs, Tab} from 'react-bootstrap';
import BiodataFormStaff from './BiodataFormStaff';
import UserImageForm from './UserImageForm';

const UpdateStaffBiodata = (props) => {

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
            <Tabs defaultActiveKey="staffBiodata" id="uncontrolled-tab-example" className="mt-4 session-tab">
                <Tab eventKey="staffBiodata" title="Update Staff Biodata">  
                    <BiodataFormStaff 
                        data={props.data}
                    />
                </Tab>
                <Tab eventKey="staffImage" title="Upload Staff Image">  
                    <UserImageForm 
                        data={props.data}
                    />
                </Tab>
            </Tabs>            
        </Modal.Body>
        <Modal.Footer>
            <button onClick={props.onHide} className="cancel-btn">Close</button>
        </Modal.Footer>
    </Modal>
    )
}

export default UpdateStaffBiodata