import { useState } from 'react'
import Modal from 'react-modal';
import AcademicsModal from './AcademicsModal';
import StudentTable from './StudentTable';
import {Semester} from "./Data"
import ReadMore from "./Truncate";


function EduTable() {
    
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div className="EdutableContainer">
            <div className="EdutableModalContainer">
                <Modal
                    
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={
                        {
                            overlay: {
                                background: "rgba(255, 255, 255, 0.5)",
                                backdropFilter: "blur(5px)",
                                border: "none",
                            },
                            content: {
                                backgroundColor: "#FFFFFF",
                                top: '10%',
                                left: '20%',
                                width: "75%",
                                padding: "0",
                                right: 'auto',
                                bottom: 'auto',
                                marginRight: '-50%',
                            }
                        }
                    }
                >
                    <AcademicsModal closeModal={closeModal }/>
                </Modal>
            </div>
            
            <div className="EdutableWrapper">
                <div className="Edutable-button-select-Wrapper">
                    <span className="EdutableButtonRC" onClick={openModal}>Register Courses</span>
                    <span className="EdutableButtonRCA">Register Courses Approval</span>
                </div>

                <>
                    {Semester.map((D) => (
                        <div>
                       <div className="EdutableDateNdUnit">
                                <div>{D.Semester} - {D.session} Academic Session</div>
                                <div>Maximum Credit Unit Allowed: {D.MaximumCreditUnitAllowed}</div>
                    </div>
                    <div className="EdutableBodyContainer">
                        <ReadMore header="My Registered Courses" subHeader={D.NoOfRegisteredCourses}>
                        <div>
                            <div>
                                <StudentTable/>
                            </div>
                        </div>
                        </ReadMore>
                                <div className="EdutableBodyTotal">Total Unit({D.totalUnit})</div>
                     </div> 
                    </div>
                    ))}
                </>
            </div>
        </div>
    )
}

export default EduTable
