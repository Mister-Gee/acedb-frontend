import Dashboardframe from './subcomponent/Dashboardframe';
import {Helmet} from 'react-helmet';
import {Container, Row, Col, Table} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import PaginationComponent from './subcomponent/PaginationComponent';
import { getCourse } from '../../services/courseServices';
import {search, tableIndex} from '../../utils/Functions';
import ContentLoader from '../components/ContentLoader';
import DeleteCourse from './subcomponent/DeleteCourse';
import NewCourse from './subcomponent/NewCourse';
import EditCourse from './subcomponent/EditCourse';

const CourseManagement = () => {
    const [addNew, setAddNew] = useState(false)
    const [addEdit, setAddEdit] = useState(false)
    const [addDelete, setAddDelete] = useState(false)
    const [CourseData, setCourseData] = useState([])
    const [CourseEditData, setCourseEditData] = useState([])
    
    const [slicedData, setSlicedData] = useState([])
    const [searchData, setSearchData] = useState([])

    const [offset, setOffset] = useState(0)
    const [perPage, setPerPage] = useState(5)
    const [pageCount, setPageCount] = useState(0)
    const [contentLength, setContentLength] = useState(0)
    const [isLoading, setIsLoading] = useState(0)
    const [realIndex, setRealIndex] = useState(1)

    const handleAddNew = () => {
        setAddNew(true)
    }

    const handleSearch = (array, searchText) => {
        if (searchText === ''){
            setCourseData(slicedData)
        }
        else{
            setCourseData(search(array, searchText, 'courseCode'))
        } 
    }

    useEffect(() => {
        setIsLoading(true)
        const fetchData = async() => {
            const res = await getCourse()
            const data = res.data
            const slicedData = data.slice(offset * perPage, offset + perPage)
            setSlicedData(slicedData)
            setCourseData(slicedData)
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
        <Dashboardframe title="MIS" subTitle="Course Management">
            <Helmet>
                <title>Course Management | Adeyemi College of Education</title>
            </Helmet>
            <NewCourse  show={addNew} onHide={() => setAddNew(false)} contentLength={contentLength} setContentLength={setContentLength} />
            <EditCourse show={addEdit} onHide={() => setAddEdit(false)} contentLength={contentLength} setContentLength={setContentLength} data={CourseEditData}/>
            <DeleteCourse show={addDelete} onHide={() => setAddDelete(false)} contentLength={contentLength} setContentLength={setContentLength} data={CourseEditData}/>
            {isLoading ?
            <ContentLoader />
            :
            <div className="content-page">
                <div className="session-wrapper">
                    <Container>
                        <div className="session-title">Course Management</div>
                        <Row className="mt-4">
                            <Col lg={12}>
                                <button className="addnew-btn" onClick={handleAddNew}> <span className="iconify" data-icon="fluent:add-16-filled" data-inline="false"></span>  Add New</button>
                                {/* <button className="importExport-btn"> <span className="iconify" data-icon="uil:import" data-inline="false"></span>  Import Users</button> */}
                                {/* <button className="importExport-btn"> <span className="iconify" data-icon="uil:export" data-inline="false"></span>  Export Users</button> */}
                            </Col>
                        </Row>
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
                                        <input type="search" className="search-box" id="search" placeholder='Course Code' onChange={(event) => handleSearch(searchData, event.target.value)}/>
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
                                            <th>Course</th>
                                            <th>Course Code</th>
                                            <th>Course Description</th>
                                            <th>Department</th>
                                            <th>School</th>
                                            <th>Lead Lecturer</th>
                                            <th>Assistant Lecturer</th>
                                            <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {CourseData.map((data, index) => (
                                            <tr key={data.id}>
                                                <td>{tableIndex(index, realIndex)}</td>
                                                <td>{data.courseTitle}</td>
                                                <td>{data.courseCode}</td>
                                                <td>{data.courseDescription}</td>
                                                <td>{data.department}</td>
                                                <td>{data.school}</td>
                                                <td>{data.leadLecturer}</td>
                                                <td>{data.assistantLecturer}</td>
                                                <td>
                                                    <span className="btns">
                                                        <span
                                                            onClick={() => {
                                                                setCourseEditData(data)
                                                                setAddEdit(true)
                                                            }}
                                                        >
                                                            <span className="iconify edit-icon" data-icon="akar-icons:edit" data-inline="false"></span>
                                                        </span>
                                                        <span
                                                            onClick={() => {
                                                                setCourseEditData(data)
                                                                setAddDelete(true)
                                                            }}
                                                        >
                                                            <span className="iconify del-icon" data-icon="fluent:delete-dismiss-24-regular" data-inline="false"></span>
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

export default CourseManagement
