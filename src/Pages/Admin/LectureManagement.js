import Dashboardframe from './subcomponent/Dashboardframe';
import {Helmet} from 'react-helmet';
import {Container, Row, Col, Table} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import PaginationComponent from './subcomponent/PaginationComponent';
import { getCourseByLoggedInLecturer } from '../../services/courseServices';
import ContentLoader from '../components/ContentLoader';
import {search, tableIndex} from '../../utils/Functions';
import { Link } from 'react-router-dom';


const LectureManagement = () => {
    const [courses, setCourses] = useState([])
    const [contentLength, setContentLength] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [slicedData, setSlicedData] = useState([])
    const [searchData, setSearchData] = useState([])
    const [offset, setOffset] = useState(0)
    const [perPage, setPerPage] = useState(5)
    const [pageCount, setPageCount] = useState(0)
    const [realIndex, setRealIndex] = useState(1)



    useEffect(() => {
        try{
            const fetch = async () => {
                setIsLoading(true)
                const res = await getCourseByLoggedInLecturer()
                const data = res.data
                const slicedData = data.slice(offset * perPage, offset + perPage)
                setSlicedData(slicedData)
                setCourses(slicedData)
                setSearchData(data)
                setContentLength(data.length)
                setPageCount(Math.ceil(data.length / perPage))
                setIsLoading(false)
            }
            fetch()
        }
        catch(err){
            console.log(err)
            setIsLoading(false)
        }
    }, [offset, perPage, contentLength])

    const handleSearch = (array, searchText) => {
        if (searchText === ''){
            setCourses(slicedData)
        }
        else{
            setCourses(search(array, searchText, 'courseCode')) 
        } 
    }

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setRealIndex(offset * perPage + 1)
        setOffset(selectedPage)
    }

    return (
        <Dashboardframe title="Lecturer" subTitle="Lecture Management">
            <Helmet>
                <title>Lecture Management | Adekunle College Of Education</title>
            </Helmet>
            {isLoading ?
            <ContentLoader />
            :
            <div className="content-page">
                <div className="session-wrapper">
                    <Container>
                        <div className="session-title">Lecture Management</div>
                        {/* <Row className="mt-4">
                            <Col lg={12}>
                                <button className="addnew-btn" onClick={handleAddNew}> <span className="iconify" data-icon="fluent:add-16-filled" data-inline="false"></span>  Add New</button>
                                <button className="importExport-btn"> <span className="iconify" data-icon="uil:import" data-inline="false"></span>  Import Users</button>
                                <button className="importExport-btn"> <span className="iconify" data-icon="uil:export" data-inline="false"></span>  Export Users</button>
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
                                            <th>Course Title</th>
                                            <th>Course Code</th>
                                            <th>Course Description</th>
                                            <th>Course Unit</th>
                                            <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {courses.map((data, index) => (
                                            <tr key={data.id}>
                                                <td>{tableIndex(index, realIndex)}</td>
                                                <td>{data.courseTitle}</td>
                                                <td>{data.courseCode}</td>
                                                <td>{data.courseDescription}</td>
                                                <td>{data.courseUnit}</td>
                                                <td>
                                                    <span className="btns">
                                                        <Link to={`/student-course-management/${data.id}`} className='link-color'>
                                                            <span className="iconify edit-icon" data-icon="ph:student-thin" data-inline="false"></span>
                                                        </Link>
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

export default LectureManagement
