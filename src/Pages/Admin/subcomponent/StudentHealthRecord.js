import {Table, Row, Col} from 'react-bootstrap';
import PaginationComponent from './PaginationComponent';
import {useState} from 'react';
import {tableIndex, search} from '../../../utils/Functions';
import { Link } from 'react-router-dom';

const StudentHealthRecord = ({offset, 
    perPage, 
    setPerPage, 
    setOffset, 
    setStudentHealthRecord, 
    slicedData, 
    searchData, 
    studentHealthRecordData, 
    contentLength,
    pageCount,
    handleEdit,
    handleDelete
}) => {
    const [realIndex, setRealIndex] = useState(1)

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setRealIndex(offset * perPage + 1)
        setOffset(selectedPage)
    }
    
    const handleSearch = (array, searchText) => {
        if (searchText === ''){
            setStudentHealthRecord(slicedData)
        }
        else{
            setStudentHealthRecord(search(array, searchText, 'fullName'))
        } 
    }
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
                            <input type="search" placeholder='Full Name' className="search-box" id="search" onChange={(event) => handleSearch(searchData, event.target.value)}/>
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
                                <th>Full Name</th>
                                <th>Height</th>
                                <th>Weight</th>
                                <th>Blood Group</th>
                                <th>Genotype</th>
                                <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentHealthRecordData.map((data, index) => (
                                    <tr key={data.id}>
                                        <td>{tableIndex(index, realIndex)}</td>
                                        <td>{data.fullName}</td>
                                        <td>{data.height}</td>
                                        <td>{data.weight}</td>
                                        <td>{data.bloodGroup}</td>
                                        <td>{data.genotype}</td>
                                        <td>
                                        <span className="btns">
                                            <span>
                                                <Link to={`/medical-profile/${data.id}`}>
                                                    <span className="iconify edit-icon" data-icon="carbon:data-view-alt" data-inline="false"></span>
                                                </Link>
                                            </span>
                                            <span>
                                                <Link to={`/medical-history/${data.userId}`}>
                                                    <span className="iconify edit-icon" data-icon="icon-park:history-query" data-inline="false"></span>
                                                </Link>
                                            </span>
                                            <span
                                                onClick={() => handleEdit(data)}
                                            >
                                                <span className="iconify edit-icon" data-icon="akar-icons:edit" data-inline="false"></span>
                                            </span>
                                            <span
                                                onClick={() => handleDelete(data)}
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

export default StudentHealthRecord
