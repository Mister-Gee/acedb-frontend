import Dashboardframe from './subcomponent/Dashboardframe';
import {Helmet} from 'react-helmet';
import {Container, Row, Col, Tabs, Tab} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import { getStudentHealthRecord, getStaffHealthRecord } from '../../services/healthService';
import ContentLoader from '../components/ContentLoader';
import StudentHealthRecord from './subcomponent/StudentHealthRecord';
import StaffHealthRecord from './subcomponent/StaffHealthRecord';
import NewMedCon from './subcomponent/NewMedCon';
import NewMedRecord from './subcomponent/NewMedRecord';
import EditMedRecord from './subcomponent/EditMedRecord';
import DeleteMedRecord from './subcomponent/DeleteMedRecord';


const HealthManagement = () => {
    const [addNew, setAddNew] = useState(false)
    const [addMedCon, setAddMedCon] = useState(false)
    const [addEdit, setAddEdit] = useState(false)
    const [addDelete, setAddDelete] = useState(false)

    const [contentLength, setContentLength] = useState(0)
    const [editMedData, setEditMedData] = useState({})

    const handleAddNew = () => {
        setAddNew(true)
    }

    const handleEdit = (data) => {
        setEditMedData(data)
        setAddEdit(true)
    }

    const handleMedCon = () => {
        setAddMedCon(true)
    }


    const handleAddDelete = (data) => {
        setEditMedData(data)
        setAddDelete(true)
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
    const [studentHealthRecordData, setStudentHealthRecord] = useState([])
    const [fullStudentData, setFullStudentData] = useState([])


    //Functions to open Add, Edit & Delete Session/Semester Modal 
    const handleAddEdit = () => {
        setAddEdit(true)
    }

   
    useEffect(() => {
        try{
            const fetch = async () => {
                setIsLoading(true)
                const res = await getStudentHealthRecord()
                const data = res.data
                const slicedData = data.slice(offsetPS * perPagePS, offsetPS + perPagePS)
                setSlicedPSData(slicedData)
                setStudentHealthRecord(slicedData)
                setSearchPSData(data)
                setPageCountPS(Math.ceil(data.length / perPagePS))
                setIsLoading(false)
            }
            fetch()
        }
        catch(err){
            console.log(err)
            setIsLoading(false)
        }
    },[contentLength, offsetPS, perPagePS])

    useEffect(() => {
        try{
            const fetch = async () => {
                const res = await getStaffHealthRecord()
                const data = res.data
                const slicedData = data.slice(offsetFS * perPageFS, offsetFS + perPageFS)
                setSlicedFSData(slicedData)
                setFullStudentData(slicedData)
                setSearchFSData(data)
                setPageCountFS(Math.ceil(data.length / perPageFS))
                setIsLoading(false)
            }
            fetch()
        }
        catch(err){
            console.log(err)
        }
    },[contentLength, offsetFS, perPageFS])

    return (
        <Dashboardframe title="Health Center" subTitle="Health Management">
            <Helmet>
                <title>Health Management | Adekunle College Of Education</title>
            </Helmet>
            <NewMedRecord 
                show={addNew}
                onHide={() => setAddNew(false)}
                contentLength={contentLength}
                setContentLength={setContentLength}
            />
            <NewMedCon 
                show={addMedCon}
                onHide={() => setAddMedCon(false)}
            />
            <EditMedRecord 
                show={addEdit}
                onHide={() => setAddEdit(false)}
                contentLength={contentLength}
                setContentLength={setContentLength}
                medRecData={editMedData}
            />
            <DeleteMedRecord 
                show={addDelete}
                onHide={() => setAddDelete(false)}
                contentLength={contentLength}
                setContentLength={setContentLength}
                medRecData={editMedData}
            />
            {isLoading ?
            <ContentLoader />
            :
            <div className="content-page">
                <div className="session-wrapper">
                    <Container>
                        <div className="session-title">Health Management</div>
                        <Row className="mt-4">
                            <Col lg={12}>
                                <button className="addnew-btn" onClick={handleAddNew}> <span className="iconify" data-icon="fluent:add-16-filled" data-inline="false"></span>Add Record</button>
                                <button className="importExport-btn" onClick={handleMedCon}> <span className="iconify" data-icon="fluent:add-16-filled" data-inline="false"></span>Add Medical Condition</button>
                             </Col>
                        </Row>
                        <Tabs defaultActiveKey="student" id="uncontrolled-tab-example" className="mt-4 session-tab">
                                <Tab eventKey="student" title="Student Health Record">
                                    <StudentHealthRecord 
                                        offset={offsetPS} 
                                        perPage={perPagePS} 
                                        setPerPage={setPerPagePS} 
                                        setOffset={setOffsetPS} 
                                        setStudentHealthRecord={setStudentHealthRecord}
                                        slicedData={slicedPSData}
                                        searchData={searchPSData}
                                        studentHealthRecordData={studentHealthRecordData}
                                        handleAddEdit={handleAddEdit}
                                        contentLength={contentLength}
                                        pageCount={pageCountPS}
                                        handleEdit={handleEdit}
                                        handleDelete={handleAddDelete}
                                    />
                                </Tab> 
                                <Tab eventKey="staff" title="Staff Health Record">
                                    <StaffHealthRecord 
                                      offset={offsetFS} 
                                        perPage={perPageFS} 
                                        setPerPage={setPerPageFS} 
                                        setOffset={setOffsetFS} 
                                        setStaffHealthRecord={setFullStudentData}
                                        slicedData={slicedFSData}
                                        searchData={searchFSData}
                                        staffHealthRecordData={fullStudentData}
                                        handleAddEdit={handleAddEdit}
                                        contentLength={contentLength}
                                        pageCount={pageCountFS}  
                                        handleEdit={handleEdit}
                                        handleDelete={handleAddDelete}
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

export default HealthManagement
