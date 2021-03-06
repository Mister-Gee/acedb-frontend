import Dashboardframe from './subcomponent/Dashboardframe';
import {Helmet} from 'react-helmet';
import {Container, Row, Col, Table} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import PaginationComponent from './subcomponent/PaginationComponent';
import {getAllExamTimetable} from '../../services/examTimetableService';
import {search, tableIndex, dateConverter} from '../../utils/Functions';
import ContentLoader from '../components/ContentLoader';
import NewTimeTable from './subcomponent/NewTimeTable';
import EditTimeTable from './subcomponent/EditTimeTable';
import DeleteTimeTable from './subcomponent/DeleteTimeTable';


const ExamManagement = () => {
    const [addNew, setAddNew] = useState(false)
    const [addEdit, setAddEdit] = useState(false)
    const [addDelete, setAddDelete] = useState(false)
    const [TimeTableData, setTimeTableData] = useState([])
    const [TimeTableEditData, setTimeTableEditData] = useState([])
    
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
            setTimeTableData(slicedData)
        }
        else{
            setTimeTableData(search(array, searchText, 'course'))
        } 
    }

    useEffect(() => {
        setIsLoading(true)
        const fetchData = async() => {
            const res = await getAllExamTimetable()
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
        <Dashboardframe title="Exams And Records" subTitle="Exam Timetable Management">
            <Helmet>
                <title>Exam Timetable Management | Adeyemi College of Education</title>
            </Helmet>
            <NewTimeTable  show={addNew} onHide={() => setAddNew(false)} contentLength={contentLength} setContentLength={setContentLength} />
            <EditTimeTable show={addEdit} onHide={() => setAddEdit(false)} contentLength={contentLength} setContentLength={setContentLength} data={TimeTableEditData}/>
            <DeleteTimeTable show={addDelete} onHide={() => setAddDelete(false)} contentLength={contentLength} setContentLength={setContentLength} data={TimeTableEditData}/>
            {isLoading ?
            <ContentLoader />
            :
            <div className="content-page">
                <div className="session-wrapper">
                    <Container>
                        <div className="session-title">Exam Timetable Management</div>
                        <Row className="mt-4">
                            <Col lg={12}>
                                <button className="addnew-btn" onClick={handleAddNew}> <span className="iconify" data-icon="fluent:add-16-filled" data-inline="false"></span>  Add New</button>
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
                                            <th>Semester</th>
                                            <th>Academic Year</th>
                                            <th>Supervisor</th>
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
                                                <td>{data.semester}</td>
                                                <td>{data.academicYear}</td>
                                                <td>{data.supervisor}</td>
                                                <td>
                                                    <span className="btns">
                                                        <span
                                                            onClick={() => {
                                                                setTimeTableEditData(data)
                                                                setAddEdit(true)
                                                            }}
                                                        >
                                                            <span className="iconify edit-icon" data-icon="akar-icons:edit" data-inline="false"></span>
                                                        </span>
                                                        <span
                                                            onClick={() => {
                                                                setTimeTableEditData(data)
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

export default ExamManagement
