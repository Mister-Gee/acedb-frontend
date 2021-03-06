import Dashboardframe from './subcomponent/Dashboardframe';
import {Helmet} from 'react-helmet';
import {Container, Row, Col, Table} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import PaginationComponent from './subcomponent/PaginationComponent';
import {getSupervisorCourses} from '../../services/attendanceService';
import {search, tableIndex, dateConverter} from '../../utils/Functions';
import ContentLoader from '../components/ContentLoader';
import { Link } from 'react-router-dom';


const ExamAttendance = () => {
    const [TimeTableData, setTimeTableData] = useState([])
    
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
            setTimeTableData(slicedData)
        }
        else{
            setTimeTableData(search(array, searchText, 'course'))
        } 
    }

    useEffect(() => {
        setIsLoading(true)
        const fetchData = async() => {
            const res = await getSupervisorCourses()
            const data = res.data
            const slicedData = data.slice(offset * perPage, offset + perPage)
            setSlicedData(slicedData)
            setTimeTableData(slicedData)
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
        <Dashboardframe title="Exams And Records" subTitle="Exam Attendance">
            <Helmet>
                <title>Exam Attendance | Adeyemi College of Education</title>
            </Helmet>
            {isLoading ?
            <ContentLoader />
            :
            <div className="content-page">
                <div className="session-wrapper">
                    <Container>
                        <div className="session-title">Exam Attendance</div>
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
                                        <input type="search" className="search-box" id="search" placeholder='Course' onChange={(event) => handleSearch(searchData, event.target.value)}/>
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
                                            <th>Time</th>
                                            <th>Date</th>
                                            <th>Venue</th>
                                            <th>Duration</th>
                                            <th>Department</th>
                                            <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {TimeTableData.map((data, index) => (
                                            <tr key={data.id}>
                                                <td>{tableIndex(index, realIndex)}</td>
                                                <td>{data.course}</td>
                                                <td>{data.examStartTime}</td>
                                                <td>{dateConverter(data.examDateTime)}</td>
                                                <td>{data.venue}</td>
                                                <td>{data.examDuration}</td>
                                                <td>{data.department}</td>
                                                <td><Link to={`/course-exam-attendance/${data.courseID}`}>View Attendance</Link></td>
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

export default ExamAttendance
