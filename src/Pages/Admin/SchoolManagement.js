import Dashboardframe from './subcomponent/Dashboardframe';
import {Helmet} from 'react-helmet';
import {Container, Row, Col, Table} from 'react-bootstrap';
import NewSchool from './subcomponent/NewSchool';
import EditSchool from './subcomponent/EditSchool';
import DeleteSchool from './subcomponent/DeleteSchool';
import {useState, useEffect} from 'react';
import PaginationComponent from './subcomponent/PaginationComponent';
import ContentLoader from '../components/ContentLoader';
import {getSchool} from '../../services/institutionAdminServices';
import {getInstitutionId, search, tableIndex} from '../../utils/Functions';

const SchoolManagement = () => {
    const [addNew, setAddNew] = useState(false)
    const [addEdit, setAddEdit] = useState(false)
    const [addDelete, setAddDelete] = useState(false)
    const [schoolData, setSchoolData] = useState([])
    const [schoolEditData, setSchoolEditData] = useState([])
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

    useEffect(() => {
        setIsLoading(true)
        const fetchData = async() => {
            const res = await getSchool(institutionId)
            const data = res.data
            const slicedData = data.slice(offset * perPage, offset + perPage)
            setSlicedData(slicedData)
            setSchoolData(slicedData)
            setSearchData(data)
            setContentLength(data.length)
            setPageCount(Math.ceil(data.length / perPage))
            setIsLoading(false)
        } 
        fetchData()
    }, [offset, perPage, contentLength, institutionId])

    const handleSearch = (array, searchText) => {
        if (searchText === ''){
            setSchoolData(slicedData)
        }
        else{
            setSchoolData(search(array, searchText, 'name'))
        } 
    }

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setRealIndex(offset * perPage + 1)
        setOffset(selectedPage)
    }

    return (
        <Dashboardframe title="Admin" subTitle="School Management">
            <Helmet>
                <title>School Management | iEduCare</title>
            </Helmet>
            <NewSchool show={addNew} onHide={() => setAddNew(false)} contentLength={contentLength} setContentLength={setContentLength}/>
            <EditSchool show={addEdit} onHide={() => setAddEdit(false)} data={schoolEditData} contentLength={contentLength} setContentLength={setContentLength}/>
            <DeleteSchool show={addDelete} onHide={() => setAddDelete(false)} data={schoolEditData} contentLength={contentLength} setContentLength={setContentLength}/>
            {isLoading ?
            <ContentLoader />
            :
            <div className="content-page">
                <div className="session-wrapper">
                    <Container>
                        <div className="session-title">School Management</div>
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
                                            <th>School Name</th>
                                            <th>School Head Name</th>
                                            <th>Designation</th>
                                            <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {schoolData.map((data, index) => (
                                                <tr key={data.id}>
                                                    <td>{tableIndex(index, realIndex)}</td>
                                                    <td>{data.name}</td>
                                                    <td>{data.headId}</td>
                                                    <td>{data.name}</td>
                                                    <td>
                                                    <span className="btns">
                                                        <span
                                                            onClick={() => {
                                                                setSchoolEditData(data)
                                                                setAddEdit(true)
                                                            }}
                                                        >
                                                            <span className="iconify edit-icon" data-icon="akar-icons:edit" data-inline="false"></span>
                                                        </span>
                                                        <span
                                                            onClick={() => {
                                                                setSchoolEditData(data)
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

export default SchoolManagement
