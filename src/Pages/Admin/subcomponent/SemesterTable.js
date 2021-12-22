import {Table, Col, Row} from 'react-bootstrap';
import PaginationComponent from './PaginationComponent';
import {useEffect, useState} from 'react';
import {getSemester} from '../../../services/institutionAdminServices';
import {tableIndex, search, dateConverter} from '../../../utils/Functions';

const SemesterTable = ({sessionId, sessionName, handleSemesterEdit,  handleSemesterDelete, setSemesterEditData}) => {

    const [semesterData, setSemesterData] = useState([])

    const [slicedData, setSlicedData] = useState([])
    const [searchData, setSearchData] = useState([])

    const [offset, setOffset] = useState(0)
    const [perPage, setPerPage] = useState(5)
    const [pageCount, setPageCount] = useState(0)
    const [contentLength, setContentLength] = useState(0)
    const [realIndex, setRealIndex] = useState(1)

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setRealIndex(offset * perPage + 1)
        setOffset(selectedPage)
    }
    
    const handleSearch = (array, searchText) => {
        if (searchText === ''){
            setSemesterData(slicedData)
        }
        else{
            setSemesterData(search(array, searchText, 'name'))
        } 
    }
    
    useEffect(() => {
        const fetchData = async() => {
            try{
                const res = await getSemester(sessionId)
                const data = res.data
                const slicedData = data.slice(offset * perPage, offset + perPage)
                setSlicedData(slicedData)
                setSemesterData(slicedData)
                setSearchData(data)
                setContentLength(data.length)
                setPageCount(Math.ceil(data.length / perPage))
            }
            catch(err){
                console.log(err.message)
            }
        }
        fetchData()
    }, [offset, perPage, contentLength, sessionId])


    return (
        <>
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
                                <th>Session</th>
                                <th>Semester Name</th>
                                <th>Description</th>
                                <th>Fron</th>
                                <th>To</th>
                                <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {semesterData.map((data, index) => (
                                    <tr key={data.id}>
                                        <td>{tableIndex(index, realIndex)}</td>
                                        <td>{sessionName}</td>
                                        <td>{data.name}</td>
                                        <td>{data.name}</td>
                                        <td>{dateConverter(data.startDate)}</td>
                                        <td>{dateConverter(data.endDate)}</td>
                                        <td>
                                        <span className="btns">
                                            <span
                                                onClick={() => {
                                                    setSemesterEditData(data)
                                                    handleSemesterEdit()
                                                }}
                                            >
                                                <span className="iconify edit-icon" data-icon="akar-icons:edit" data-inline="false"></span>
                                            </span>
                                            <span
                                               onClick={() => {
                                                setSemesterEditData(data)
                                                handleSemesterDelete()
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
        </>
    )
}

export default SemesterTable
