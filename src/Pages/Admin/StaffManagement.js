import Dashboardframe from './subcomponent/Dashboardframe';
import {Helmet} from 'react-helmet';
import NewStaff from './subcomponent/NewStaff';
import {Container, Row, Col, Table} from 'react-bootstrap';
import {useState} from 'react';
import PaginationComponent from './subcomponent/PaginationComponent';

const StaffManagement = () => {
    const [addNew, setAddNew] = useState(false)

    const handleAddNew = () => {
        setAddNew(true)
    }

    return (
        <Dashboardframe title="Admin" subTitle="Staff Management">
            <Helmet>
                <title>Staff Management | iEduCare</title>
            </Helmet>
            <div className="content-page">
                <NewStaff  
                    show={addNew} 
                    onHide={() => setAddNew(false)}
                />
                <div className="session-wrapper">
                    <Container>
                        <div className="session-title">Staff Management</div>
                        <Row className="mt-4">
                            <Col lg={12}>
                                <button className="addnew-btn" onClick={handleAddNew}> <span className="iconify" data-icon="fluent:add-16-filled" data-inline="false"></span>  Add New</button>
                                <button className="importExport-btn"> <span className="iconify" data-icon="uil:import" data-inline="false"></span>  Import Staff</button>
                                <button className="importExport-btn"> <span className="iconify" data-icon="uil:export" data-inline="false"></span>  Export Staff</button>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12}>
                                <div className="table-header">
                                    <div className="entries">
                                        <label htmlFor="entries" className="entries-label">Show</label>
                                        <div className="entries-input">
                                            <select className="entries-box" id="entries">
                                                {[5, 10, 15, 20, 25, 30].map((value) => (
                                                    <option value={value} key={value}>{value}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="entries-label"> entries </div>
                                    </div>
                                    <div className="search">
                                        <label htmlFor="search" className="search-label">Filter: </label>
                                        <input type="search" className="search-box" id="search" />
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
                                            <th> <input type="checkbox" /> </th>
                                            <th>S/N</th>
                                            <th>Staff ID</th>
                                            <th>First Name</th>
                                            <th>Middle Name</th>
                                            <th>Last Name</th>
                                            <th>Gender</th>
                                            <th>Designation</th>
                                            <th>Department</th>
                                            <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                            <td><input type="checkbox" /></td>
                                            <td>1</td>
                                            <td>UL-10010</td>
                                            <td>Oladapo</td>
                                            <td>Frank</td>
                                            <td>Babajide</td>
                                            <td>Male</td>
                                            <td>H.O.D</td>
                                            <td>Computing and IT</td>
                                            <td>
                                                <span className="btns">
                                                    <span>
                                                        <span className="iconify edit-icon" data-icon="akar-icons:edit" data-inline="false"></span>
                                                    </span>
                                                    <span>
                                                        <span className="iconify del-icon" data-icon="fluent:delete-dismiss-24-regular" data-inline="false"></span>
                                                    </span>
                                                </span>
                                            </td>
                                            </tr>
                                            <tr>
                                            <td><input type="checkbox" /></td>
                                            <td>2</td>
                                            <td>UL-10015</td>
                                            <td>Precious</td>
                                            <td>Jones</td>
                                            <td>Paul</td>
                                            <td>Female</td>
                                            <td>Burser</td>
                                            <td>Accounting</td>
                                            <td>
                                                <span className="btns">
                                                    <span>
                                                        <span className="iconify edit-icon" data-icon="akar-icons:edit" data-inline="false"></span>
                                                    </span>
                                                    <span>
                                                        <span className="iconify del-icon" data-icon="fluent:delete-dismiss-24-regular" data-inline="false"></span>
                                                    </span>
                                                </span>
                                            </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12}>
                                <div className="pagination-section">
                                    <div className="page-entry">
                                        Showing 1 to 2 of 2 entries
                                    </div>
                                    <div className="page-nav">
                                        <PaginationComponent />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </Dashboardframe>
    )
}

export default StaffManagement
