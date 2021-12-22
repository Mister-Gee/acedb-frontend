import Dashboardframe from './subcomponent/Dashboardframe';
import {Helmet} from 'react-helmet';
import {Container, Row, Col, Table} from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import {useState, useEffect} from 'react';
import NewCourseGrade from './subcomponent/NewCourseGrade';
import EditCourseGrade from './subcomponent/EditCourseGrade';
import DeleteCourseGrade from './subcomponent/DeleteCourseGrade';
import PaginationComponent from './subcomponent/PaginationComponent';
import ContentLoader from '../components/ContentLoader';
import {getCourseGrade} from '../../services/institutionAdminServices';
import {getInstitutionId, search, tableIndex} from '../../utils/Functions';

const CourseGrade = () => {
    const [addNew, setAddNew] = useState(false)
    const [addEdit, setAddEdit] = useState(false)
    const [addDelete, setAddDelete] = useState(false)
    const [courseGradeData, setCourseGradeData] = useState([])
    const [courseGradeEditData, setCourseGradeEditData] = useState([])
    const institutionId = getInstitutionId()
    
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
            setCourseGradeData(slicedData)
        }
        else{
            setCourseGradeData(search(array, searchText, 'name'))
        } 
    }

    useEffect(() => {
        setIsLoading(true)
        const fetchData = async() => {
            const res = await getCourseGrade(institutionId)
            const data = res.data
            const slicedData = data.slice(offset * perPage, offset + perPage)
            setSlicedData(slicedData)
            setCourseGradeData(slicedData)
            setSearchData(data)
            setContentLength(data.length)
            setPageCount(Math.ceil(data.length / perPage))
            setIsLoading(false)
        } 
        fetchData()
    }, [offset, perPage, contentLength, institutionId])

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setRealIndex(offset * perPage + 1)
        setOffset(selectedPage)
    }

    return (
        <Dashboardframe title="Admin" subTitle="Course Grades">
            <Helmet>
                <title>Course Grades | iEduCare</title>
            </Helmet>
            <NewCourseGrade show={addNew} onHide={() => setAddNew(false)} contentLength={contentLength} setContentLength={setContentLength}/>
            <EditCourseGrade show={addEdit} onHide={() => setAddEdit(false)} contentLength={contentLength} setContentLength={setContentLength} data={courseGradeEditData}/>
            <DeleteCourseGrade show={addDelete} onHide={() => setAddDelete(false)} contentLength={contentLength} setContentLength={setContentLength} data={courseGradeEditData}/>
            {isLoading ?
            <ContentLoader />
            :
            <div className="content-page">
                <div className="session-wrapper">
                    <Container>
                        <div className="session-title">Course Grades</div>
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
                                        <input type="search" className="search-box" id="search" onChange={(event) => handleSearch(searchData, event.target.value)}/>
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
                                            <th>Grade Code</th>
                                            <th>Remark</th>
                                            <th>Grade Score</th>
                                            <th>Minimum Score</th>
                                            <th>Maximum Score</th>
                                            <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {courseGradeData.map((data, index) => (
                                                <tr key={data.id}>
                                                    <td>{tableIndex(index, realIndex)}</td>
                                                    <td>{data.code}</td>
                                                    <td>{data.remark}</td>
                                                    <td>{data.gradeScore}</td>
                                                    <td>{data.minimumScore}</td>
                                                    <td>{data.maximumScore}</td>
                                                    <td>
                                                    <span className="btns">
                                                        <span
                                                            onClick={() => {
                                                                setCourseGradeEditData(data)
                                                                setAddEdit(true)
                                                            }}
                                                        >
                                                            <span className="iconify edit-icon" data-icon="akar-icons:edit" data-inline="false"></span>
                                                        </span>
                                                        <span
                                                            onClick={() => {
                                                                setCourseGradeEditData(data)
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
                        <Row>
                            <Col>
                                <div className="form-group" id="gradepoint-textfield">
                                    <TextField 
                                        name="maxGradePoint" 
                                        id="maxGradePoint" 
                                        label="Max Grade Point" 
                                        margin="normal"
                                        placeholder="Max Grade Point"
                                        InputLabelProps={{
                                        shrink: true,
                                        }}
                                        variant="outlined"
                                    />
                                    <button className="save-mgp-btn mt-3">Save</button>
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

export default CourseGrade
