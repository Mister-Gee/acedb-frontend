import Dashboardframe from './subcomponent/Dashboardframe';
import {Helmet} from 'react-helmet';
import NewUser from './subcomponent/NewUser';
import {Container, Row, Col, Tabs, Tab} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import PartiallyRegisterStaff from './subcomponent/PartiallyRegisterStaff';
import FullyRegisterStaff from './subcomponent/FullyRegisterStaff';
import { getPartiallyRegisteredStaff, getFullyRegisteredStaff } from '../../services/staffServices';
import ContentLoader from '../components/ContentLoader';
import UpdateStaffBiodata from './subcomponent/UpdateStaffBiodata';
import ChangeUserStatus from './subcomponent/ChangeUserStatus';
import UploadUsers from './subcomponent/UploadUsers';
import { useState as useStateHook } from '@hookstate/core';
import store from '../../store/store';
import { predefinedUserRole } from '../../utils/enums';


const StaffManagement = () => {
    const [addNew, setAddNew] = useState(false)
    const [addNewUsers, setAddNewUsers] = useState(false)
    const [addOldUsers, setAddOldUsers] = useState(false)
    const [addEdit, setAddEdit] = useState(false)
    const [deactivate, setDeactivate] = useState(false)

    const [contentLengthPS, setContentLengthPS] = useState(0)
    const [contentLengthFS, setContentLengthFS] = useState(0)

    const {role} = useStateHook(store)

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
    const [partialStaffData, setPartialStaffData] = useState([])
    const [fullStaffData, setFullStaffData] = useState([])
    const [editData, setEditData] = useState([])

    //Functions to open Add, Edit & Delete Session/Semester Modal 
    const handleAddEdit = () => {
        setAddEdit(true)
    }

   
    useEffect(() => {
        try{
            const fetch = async () => {
                setIsLoading(true)
                const res = await getPartiallyRegisteredStaff()
                const data = res.data
                const slicedData = data.slice(offsetPS * perPagePS, offsetPS + perPagePS)
                setSlicedPSData(slicedData)
                setPartialStaffData(slicedData)
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
                const res = await getFullyRegisteredStaff()
                const data = res.data
                const slicedData = data.slice(offsetFS * perPageFS, offsetFS + perPageFS)
                setSlicedFSData(slicedData)
                setFullStaffData(slicedData)
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
        <Dashboardframe title="Admin" subTitle="Staff Management">
            <Helmet>
                <title>Staff Management | Adekunle College Of Education</title>
            </Helmet>
            <NewUser  
                 show={addNew} 
                 onHide={() => setAddNew(false)}
                 contentLengt={contentLengthPS}
                 setContentLength={setContentLengthPS}
                 headerTitle="Staff"
                 formType={true}
            />
            <UploadUsers 
                show={addNewUsers} 
                onHide={() => setAddNewUsers(false)}
                contentLengt={contentLengthPS}
                setContentLength={setContentLengthPS}
                headerTitle="New Staffs"
                type="new-staff"
            />
            <UploadUsers 
                show={addOldUsers} 
                onHide={() => setAddOldUsers(false)}
                contentLengt={contentLengthPS}
                setContentLength={setContentLengthPS}
                headerTitle="Returning Staffs"
                type="old-staff"
            />
            <UpdateStaffBiodata 
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
                        <div className="session-title">Staff Management</div>
                        <Row className="mt-4">
                            <Col lg={12}>
                                <button className="addnew-btn" onClick={handleAddNew}> <span className="iconify" data-icon="fluent:add-16-filled" data-inline="false"></span>  Add New</button>
                                {role.get().includes(predefinedUserRole.mis) &&
                                <>
                                    <button className="importExport-btn" onClick={handleAddNewUsers}> <span className="iconify" data-icon="uil:import" data-inline="false"></span>  Import New Students</button>
                                    <button className="importExport-btn" onClick={handleAddOldUsers}> <span className="iconify" data-icon="uil:import" data-inline="false"></span>  Import Returning Students</button>
                                </>
                                }
                            </Col>
                        </Row>
                        <Tabs defaultActiveKey="partiallyRegistered" id="uncontrolled-tab-example" className="mt-4 session-tab">
                                <Tab eventKey="partiallyRegistered" title="Partially Registered Staff">
                                    <PartiallyRegisterStaff 
                                        offset={offsetPS} 
                                        perPage={perPagePS} 
                                        setPerPage={setPerPagePS} 
                                        setOffset={setOffsetPS} 
                                        setPartialStaffData={setPartialStaffData}
                                        slicedData={slicedPSData}
                                        searchData={searchPSData}
                                        partialStaffData={partialStaffData}
                                        setPartialStaffEditData={setEditData}
                                        handleAddEdit={handleAddEdit}
                                        handleAddDeactivate={handleAddDeactivate}
                                        contentLength={contentLengthPS}
                                        pageCount={pageCountPS}
                                    />
                                </Tab>
                                <Tab eventKey="fullyregistered" title="Fully Registered Staff">
                                    <FullyRegisterStaff
                                      offset={offsetFS} 
                                        perPage={perPageFS} 
                                        setPerPage={setPerPageFS} 
                                        setOffset={setOffsetFS} 
                                        setFullStaffData={setFullStaffData}
                                        slicedData={slicedFSData}
                                        searchData={searchFSData}
                                        fullStaffData={fullStaffData}
                                        setFullStaffEditData={setEditData}
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

export default StaffManagement
