import {Table, Row, Col} from 'react-bootstrap';
import PaginationComponent from './PaginationComponent';
import {useState} from 'react';
import {tableIndex, search, dateConverter} from '../../../utils/Functions';

const FullyRegisterStudent = ({offset, 
    perPage, 
    setPerPage, 
    setOffset, 
    setFullStudentData, 
    slicedData, 
    searchData, 
    fullStudentData, 
    setFullStudentEditData,
    handleAddEdit,
    handleAddDeactivate,
    contentLength,
    pageCount
}) => {
    const [realIndex, setRealIndex] = useState(1)

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setRealIndex(offset * perPage + 1)
        setOffset(selectedPage)
    }
    
    const handleSearch = (array, searchText) => {
        if (searchText === ''){
            setFullStudentData(slicedData)
        }
        else{
            setFullStudentData(search(array, searchText, 'email'))
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
                            <input type="search" placeholder='Email' className="search-box" id="search" onChange={(event) => handleSearch(searchData, event.target.value)}/>
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
                                <th>Matric No</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Department</th>
                                <th>School</th>
                                <th>Gender</th>
                                <th>Admission Date</th>
                                <th>Date of Birth</th>
                                <th>Level</th>
                                <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fullStudentData.map((data, index) => (
                                    <tr key={data.id}>
                                        <td>{tableIndex(index, realIndex)}</td>
                                        <td>{data.firstName} {data.lastName}</td>
                                        <td>{data.matricNumber}</td>
                                        <td>{data.email}</td>
                                        <td>{data.phoneNumber}</td>
                                        <td>{data.department}</td>
                                        <td>{data.school}</td>
                                        <td>{data.gender}</td>
                                        <td>{dateConverter(data.admissionDate)}</td>
                                        <td>{dateConverter(data.dateOfBirth)}</td>
                                        <td>{data.currentLevel}</td>
                                        <td>
                                        <span className="btns">
                                            <span
                                                onClick={() => {
                                                    setFullStudentEditData(data)
                                                    handleAddEdit()
                                                }}
                                            >
                                                <span className="iconify edit-icon" data-icon="akar-icons:edit" data-inline="false"></span>
                                            </span>
                                            <span
                                                onClick={() => {
                                                    setFullStudentEditData(data)
                                                    handleAddDeactivate()
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

export default FullyRegisterStudent
