import Dashboardframe from './subcomponent/Dashboardframe';
import {Helmet} from 'react-helmet';
import NewUser from './subcomponent/NewUser';
import {Container, Row, Col, Tabs, Tab} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import PartiallyRegisterStudent from './subcomponent/PartiallyRegisterStudent';
import FullyRegisterStudent from './subcomponent/FullyRegisterStudent';
import { getPartiallyRegisteredStudent, getFullyRegisteredStudent } from '../../services/StudentServices';
import ContentLoader from '../components/ContentLoader';
import UpdateStudentBiodata from './subcomponent/UpdateStudentBiodata';
import ChangeUserStatus from './subcomponent/ChangeUserStatus';
import UploadUsers from './subcomponent/UploadUsers';


const StudentManagement = () => {
    const [addNew, setAddNew] = useState(false)
    const [addNewUsers, setAddNewUsers] = useState(false)
    const [addOldUsers, setAddOldUsers] = useState(false)
    const [addEdit, setAddEdit] = useState(false)
    const [deactivate, setDeactivate] = useState(false)

    const [contentLengthPS, setContentLengthPS] = useState(0)
    const [contentLengthFS, setContentLengthFS] = useState(0)

    const handleAddNew = () => {
        setAddNew(true)
    }

    const handleAddNewUsers = () => {
        setAddNewUsers(true)
    }

    const handleAddOldUsers = () => {
        setAddOldUsers(true)
    }

    const handleAddDeactivate = () => {
        setDeactivate(true)
    }

    //Page Loading State
    const [isLoading, setIsLoading] = useState(true)

    //Sliced Data and Search data state for search bar
    const [slicedPSData, setSlicedPSData] = useState([])
    const [searchPSData, setSearchPSData] = useState([])

    const [slicedFSData, setSlicedFSData] = useState([])
    const [searchFSData, setSearchFSData] = useState([])

    //Pagination state data
    const [offsetPS, setOffsetPS] = useState(0)
    const [perPagePS, setPerPagePS] = useState(5)
    const [pageCountPS, setPageCountPS] = useState(0)

    const [offsetFS, setOffsetFS] = useState(0)
    const [perPageFS, setPerPageFS] = useState(5)
    const [pageCountFS, setPageCountFS] = useState(0)

    //Displayed Session State
    const [partialStudentData, setPartialStudentData] = useState([])
    const [fullStudentData, setFullStudentData] = useState([])
    const [editData, setEditData] = useState([])

    //Functions to open Add, Edit & Delete Session/Semester Modal 
    const handleAddEdit = () => {
        setAddEdit(true)
    }

   
    useEffect(() => {
        try{
            const fetch = async () => {
                setIsLoading(true)
                const res = await getPartiallyRegisteredStudent()
                const data = res.data
                const slicedData = data.slice(offsetPS * perPagePS, offsetPS + perPagePS)
                setSlicedPSData(slicedData)
                setPartialStudentData(slicedData)
                setSearchPSData(data)
                setContentLengthPS(data.length)
                setPageCountPS(Math.ceil(data.length / perPagePS))
                setIsLoading(false)
            }
            fetch()
        }
        catch(err){
            console.log(err)
            setIsLoading(false)
        }
    },[contentLengthPS, offsetPS, perPagePS])

    useEffect(() => {
        try{
            const fetch = async () => {
                const res = await getFullyRegisteredStudent()
                const data = res.data
                const slicedData = data.slice(offsetFS * perPageFS, offsetFS + perPageFS)
                setSlicedFSData(slicedData)
                setFullStudentData(slicedData)
                setSearchFSData(data)
                setContentLengthFS(data.length)
                setPageCountFS(Math.ceil(data.length / perPageFS))
                setIsLoading(false)
            }
            fetch()
        }
        catch(err){
            console.log(err)
        }
    },[contentLengthFS, offsetFS, perPageFS])

    return (
        <Dashboardframe title="Admin" subTitle="Student Management">
            <Helmet>
                <title>Student Management | Adekunle College Of Education</title>
            </Helmet>
            <NewUser  
                 show={addNew} 
                 onHide={() => setAddNew(false)}
                 contentLengt={contentLengthPS}
                 setContentLength={setContentLengthPS}
                 headerTitle="Student"
                 formType={false}
            />
            <UploadUsers 
                show={addNewUsers} 
                onHide={() => setAddNewUsers(false)}
                contentLengt={contentLengthPS}
                setContentLength={setContentLengthPS}
                headerTitle="New Students"
                type="new-student"
            />
            <UploadUsers 
                show={addOldUsers} 
                onHide={() => setAddOldUsers(false)}
                contentLengt={contentLengthPS}
                setContentLength={setContentLengthPS}
                headerTitle="Returning Students"
                type="old-student"
            />
            <UpdateStudentBiodata 
                show={addEdit} 
                onHide={() => setAddEdit(false)}
                data={editData}
                contentLengt={contentLengthPS}
                setContentLength={setContentLengthPS}
            />
            <ChangeUserStatus 
                show={deactivate}
                onHide={() => setDeactivate(false)}
                data={editData}
                contentLengt={contentLengthPS}
                setContentLength={setContentLengthPS}
            />
            {isLoading ?
            <ContentLoader />
            :
            <div className="content-page">
                <div className="session-wrapper">
                    <Container>
                        <div className="session-title">Student Management</div>
                        <Row className="mt-4">
                            <Col lg={12}>
                                <button className="addnew-btn" onClick={handleAddNew}> <span className="iconify" data-icon="fluent:add-16-filled" data-inline="false"></span>  Add New</button>
                                <button className="importExport-btn" onClick={handleAddNewUsers}> <span className="iconify" data-icon="uil:import" data-inline="false"></span>  Import New Students</button>
                                <button className="importExport-btn" onClick={handleAddOldUsers}> <span className="iconify" data-icon="uil:import" data-inline="false"></span>  Import Returning Students</button>
                            </Col>
                        </Row>
                        <Tabs defaultActiveKey="partiallyRegistered" id="uncontrolled-tab-example" className="mt-4 session-tab">
                                <Tab eventKey="partiallyRegistered" title="Partially Registered Student">
                                    <PartiallyRegisterStudent 
                                        offset={offsetPS} 
                                        perPage={perPagePS} 
                                        setPerPage={setPerPagePS} 
                                        setOffset={setOffsetPS} 
                                        setPartialStudentData={setPartialStudentData}
                                        slicedData={slicedPSData}
                                        searchData={searchPSData}
                                        partialStudentData={partialStudentData}
                                        setPartialStudentEditData={setEditData}
                                        handleAddEdit={handleAddEdit}
                                        handleAddDeactivate={handleAddDeactivate}
                                        contentLength={contentLengthPS}
                                        pageCount={pageCountPS}
                                    />
                                </Tab>
                                <Tab eventKey="fullyregistered" title="Fully Registered Student">
                                    <FullyRegisterStudent 
                                      offset={offsetFS} 
                                        perPage={perPageFS} 
                                        setPerPage={setPerPageFS} 
                                        setOffset={setOffsetFS} 
                                        setFullStudentData={setFullStudentData}
                                        slicedData={slicedFSData}
                                        searchData={searchFSData}
                                        fullStudentData={fullStudentData}
                                        setFullStudentEditData={setEditData}
                                        handleAddEdit={handleAddEdit}
                                        handleAddDeactivate={handleAddDeactivate}
                                        contentLength={contentLengthFS}
                                        pageCount={pageCountFS}         
                                    />
                                </Tab>
                            </Tabs>  
                    </Container>
                </div>
            </div>
            }
        </Dashboardframe>
    )
}

export default StudentManagement
