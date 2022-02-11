import Dashboardframe from './subcomponent/Dashboardframe';
import {Helmet} from 'react-helmet';
import {Container, Row, Col, Table} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import PaginationComponent from './subcomponent/PaginationComponent';
import {search, tableIndex} from '../../utils/Functions';
import { getStaffRoles, addStaffToRole, removeStaffFromRole } from '../../services/roleServices';
import ContentLoader from '../components/ContentLoader';
import AddStaffToRole from './subcomponent/AddStaffToRole';
import RemoveStaffFromRole from './subcomponent/RemoveStaffFromRole';

const StaffRoles = () => {
    const [staffRoles, setStaffRoles] = useState([])
    const [staffData, setStaffData] = useState("")


    const [addRole, setAddRole] = useState(false)
    const [removeRole, setRemoveRole] = useState(false)

    const handleAddRole = (data) => {
        setStaffData(data)
        setAddRole(true)
    }

    const handleRemoveRole = (data) => {
        setStaffData(data)
        setRemoveRole(true)
    }

    const [slicedData, setSlicedData] = useState([])
    const [searchData, setSearchData] = useState([])

    const [offset, setOffset] = useState(0)
    const [perPage, setPerPage] = useState(5)
    const [pageCount, setPageCount] = useState(0)
    const [contentLength, setContentLength] = useState(0)
    const [isLoading, setIsLoading] = useState(0)
    const [realIndex, setRealIndex] = useState(1)

    const handleSearch = (array, searchText) => {
        if (searchText === ''){
            setStaffRoles(slicedData)
        }
        else{
            setStaffRoles(search(array, searchText, 'staffID'))
        } 
    }

    useEffect(() => {
        setIsLoading(true)
        const fetchData = async() => {
            const res = await getStaffRoles()
            const data = res.data
            const slicedData = data.slice(offset * perPage, offset + perPage)
            setSlicedData(slicedData)
            setStaffRoles(slicedData)
            setSearchData(data)
            setContentLength(data.length)
            setPageCount(Math.ceil(data.length / perPage))
            setIsLoading(false)
        } 
        fetchData()
    }, [offset, perPage, contentLength])

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setRealIndex(offset * perPage + 1)
        setOffset(selectedPage)
    }

    return (
        <Dashboardframe title="MIS" subTitle="Staff Roles">
            <Helmet>
                <title>Staff Roles  | Adekunle College Of Education</title>
            </Helmet>
            <AddStaffToRole 
                show={addRole} 
                data={staffData}
                onHide={() => setAddRole(false)} 
                contentLength={contentLength} 
                setContentLength={setContentLength} 
            />
            <RemoveStaffFromRole 
                show={removeRole} 
                data={staffData}
                onHide={() => setRemoveRole(false)} 
                contentLength={contentLength} 
                setContentLength={setContentLength} 
            />
            {isLoading ?
            <ContentLoader />
            :
            <div className="content-page">
                <div className="session-wrapper">
                    <Container>
                        <div className="session-title">Staff Roles</div>
                        {/* <Row className="mt-4">
                            <Col lg={12}>
                                <button className="addnew-btn" onClick={handleAddNew}> <span className="iconify" data-icon="fluent:add-16-filled" data-inline="false"></span>  Add New</button>
                            </Col>
                        </Row> */}
                        <Row>
                            <Col lg={12}>
                                <div className="table-header">
                                    <div className="entries">
                                        <label htmlFor="entries" className="entries-label">Show</label>
                                        <div className="entries-input">
                                            <select className="entries-box" id="entries" onChange={(e) => setPerPage(e.target.value)}>
                                                {[5, 10, 15, 20, 25, 30].map((value) => (
                                                    <option value={value} key={value}>{value}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="entries-label"> entries </div>
                                    </div>
                                    <div className="search">
                                        <label htmlFor="search" className="search-label">Filter: </label>
                                        <input type="search" className="search-box" id="search" placeholder='Staff ID'  onChange={(event) => handleSearch(searchData, event.target.value)}/>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col lg={12}>
                                <div className="session-table">
                                    <Table bordered hover responsive>
                                        <thead>
                                            <tr>
                                                <th>S/N</th>
                                                <th>Staff Name</th>
                                                <th>Staff ID</th>
                                                <th>Email</th>
                                                <th>Role</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {staffRoles.map((data, index) => (
                                                <tr key={data.userId}>
                                                    <td>{tableIndex(index, realIndex)}</td>
                                                    <td>{data.firstName} {data.lastName}</td>
                                                    <td>{data.email}</td>
                                                    <td>{data.staffID}</td>
                                                    <td>{data.role}</td>
                                                    <td>
                                                        <span className="btns">
                                                            <span
                                                                onClick={() => handleAddRole(data)}
                                                            >
                                                                <span className="iconify edit-icon" data-icon="carbon:add" data-inline="false"></span>
                                                            </span>
                                                            <span
                                                                onClick={() => handleRemoveRole(data)}
                                                            >
                                                                <span className="iconify del-icon" data-icon="bx:bx-minus" data-inline="false"></span>
                                                            </span>
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12}>
                            <div className="pagination-section">
                                    <div className="page-entry">
                                        Showing {offset * perPage + 1} to {offset + perPage} of {contentLength} entries
                                    </div>
                                    <div className="page-nav">
                                        <PaginationComponent 
                                            pageCount={pageCount} 
                                            handlePageClick={handlePageClick} 
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
            }
        </Dashboardframe>
    )
}

export default StaffRoles
