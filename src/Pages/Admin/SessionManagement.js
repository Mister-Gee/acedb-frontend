import Dashboardframe from './subcomponent/Dashboardframe';
import {Helmet} from 'react-helmet';
import {Container, Row, Col, Tabs, Tab} from 'react-bootstrap';
import NewSession from './subcomponent/NewSession';
import EditSession from './subcomponent/EditSession';
import DeleteSession from './subcomponent/DeleteSession';
import NewSemester from './subcomponent/NewSemester';
import EditSemester from './subcomponent/EditSemester';
import DeleteSemester from './subcomponent/DeleteSemester';
import SemesterTable from './subcomponent/SemesterTable';
import SessionTable from './subcomponent/SessionTable';
import {useState, useEffect} from 'react';
import {getInstitutionId} from '../../utils/Functions';
import ContentLoader from '../components/ContentLoader';
import {getSession} from '../../services/institutionAdminServices';


const SessionManagement = () => {
    // Modal State: Add, Edit & Delete Session/Semester Modal State
    const [addNew, setAddNew] = useState(false)
    const [addEdit, setAddEdit] = useState(false)
    const [addDelete, setAddDelete] = useState(false)
    const [addNewSemester, setAddNewSemester] = useState(false)
    const [addEditSemester, setAddEditSemester] = useState(false)
    const [addDeleteSemester, setAddDeleteSemester] = useState(false)

    // Session ID and Name State
    const [recentSessionId, setRecentSessionId] = useState("")
    const [recentSessionName, setRecentSessionName] = useState("")

    //Temporary session and semester data/state for Edit and delete modal
    const [sessionEditData, setSessionEditData] = useState([])
    const [semesterEditData, setSemesterEditData] = useState([])

    //Page Loading State
    const [isLoading, setIsLoading] = useState(false)

    //Get Institution ID from Local Storage
    const institutionId = getInstitutionId()

    //Sliced Data and Search data state for search bar
    const [slicedData, setSlicedData] = useState([])
    const [searchData, setSearchData] = useState([])

    //Pagination state data
    const [offset, setOffset] = useState(0)
    const [perPage, setPerPage] = useState(5)
    const [pageCount, setPageCount] = useState(0)
    const [contentLength, setContentLength] = useState(0)

    //Displayed Session State
    const [sessionData, setSessionData] = useState([])

    //Functions to open Add, Edit & Delete Session/Semester Modal 
    const handleAddNew = () => {
        setAddNew(true)
    }

    const handleAddEdit = () => {
        setAddEdit(true)
    }

    const handleSemesterEdit = () => {
        setAddEditSemester(true)
    }

    const handleAddDelete = () => {
        setAddDelete(true)
    }

    const handleAddNewSemester = () => {
        setAddNewSemester(true)
    }

    const handleSemesterDelete = () => {
        setAddDeleteSemester(true)
    }

    // Fetch data from the Institution Session Endpoint on page Render
    useEffect(() => {
        setIsLoading(true)
        const fetchData = async() => {
            try{
                const res = await getSession(institutionId)
                const data = res.data
                const slicedData = data.slice(offset * perPage, offset + perPage)
                const reversedData = data.reverse()
                const recentSessionId = reversedData[0].id
                const recentSessionName = reversedData[0].name
                setRecentSessionId(recentSessionId)
                setRecentSessionName(recentSessionName)
                setSlicedData(slicedData)
                setSessionData(slicedData)
                setSearchData(data)
                setContentLength(data.length)
                setPageCount(Math.ceil(data.length / perPage))
                setIsLoading(false)
            }
            catch(err){
                console.log(err.message)
            }
        }
        fetchData()
    }, [offset, perPage, contentLength, institutionId, setRecentSessionId, setRecentSessionName])
    
    return (
        <Dashboardframe title="Admin" subTitle="Semester/Session">
            {/* page title header */}
            <Helmet>
                <title>Session/Semester | iEduCare</title>
            </Helmet>
            {/* Add New, Edit, Delete Session/Semester Modal Components */}
            <NewSession 
                show={addNew} 
                onHide={() => setAddNew(false)} 
                setContentLength={setContentLength} 
                contentLength={contentLength}
            />
            <EditSession 
                show={addEdit} 
                onHide={() => setAddEdit(false)} 
                data={sessionEditData} 
                setContentLength={setContentLength} 
                contentLength={contentLength}
            />
            <DeleteSession 
                show={addDelete} 
                onHide={() => setAddDelete(false)} 
                data={sessionEditData}
                setContentLength={setContentLength} 
                contentLength={contentLength}
            />
            <NewSemester 
                show={addNewSemester} 
                onHide={() => setAddNewSemester(false)} 
                sessionId={recentSessionId}
            />
            <EditSemester 
                show={addEditSemester} 
                onHide={() => setAddEditSemester(false)} 
                sessionId={recentSessionId} 
                data={semesterEditData}
            />
            <DeleteSemester 
                show={addDeleteSemester} 
                onHide={() => setAddDeleteSemester(false)} 
                data={semesterEditData}
            />
            { isLoading ?
            <ContentLoader />
            :    
            <div className="content-page">
                <div className="session-wrapper">
                    <Container>
                        <div className="session-title">Session/Semester Management</div>
                        <Row className="mt-4">
                            <Col>
                                <button className="newSession-btn" onClick={handleAddNew}> <span className="iconify" data-icon="fluent:add-16-filled" data-inline="false"></span>  Add New Session</button>
                                <button className="newSemester-btn" onClick={handleAddNewSemester}> <span className="iconify" data-icon="fluent:add-16-filled" data-inline="false"></span>  Add New Semester</button>
                            </Col>
                        </Row>
                        {/* Tab Component for Session and Semester Table */}
                            <Tabs defaultActiveKey="session" id="uncontrolled-tab-example" className="mt-4 session-tab">
                                <Tab eventKey="session" title="Session">
                                    {/* Session Table Component */}
                                    <SessionTable 
                                        offset={offset} 
                                        perPage={perPage} 
                                        setPerPage={setPerPage} 
                                        setOffset={setOffset} 
                                        setSessionData={setSessionData}
                                        slicedData={slicedData}
                                        searchData={searchData}
                                        sessionData={sessionData}
                                        setSessionEditData={setSessionEditData}
                                        handleAddEdit={handleAddEdit}
                                        handleAddDelete={handleAddDelete}
                                        contentLength={contentLength}
                                        pageCount={pageCount}
                                    />
                                </Tab>
                                <Tab eventKey="semester" title="Semester">
                                    {/* Semester Table Component */}
                                    <SemesterTable 
                                        sessionId={recentSessionId} 
                                        sessionName={recentSessionName} 
                                        setIsLoading={setIsLoading}
                                        setSemesterEditData={setSemesterEditData}
                                        handleSemesterDelete={handleSemesterDelete}
                                        handleSemesterEdit={handleSemesterEdit}             
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

export default SessionManagement
