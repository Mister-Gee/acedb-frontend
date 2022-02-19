import Dashboardframe from './subcomponent/Dashboardframe';
import {Helmet} from 'react-helmet';
import {Container, Row, Col, Table} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import PaginationComponent from './subcomponent/PaginationComponent';
import ContentLoader from '../components/ContentLoader';
import {search, tableIndex, dateConverter} from '../../utils/Functions';
import { useParams } from 'react-router-dom';
import { getMedicalHistory } from '../../services/healthService';
import NewDiagnosis from './subcomponent/NewDiagnosis';
import EditDiagnosis from './subcomponent/EditDiagnosis';
import DeleteDiagnosis from './subcomponent/DeleteDiagnosis';


const MedicalHistory = () => {
    const [history, setHistory] = useState([])
    const [contentLength, setContentLength] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [slicedData, setSlicedData] = useState([])
    const [searchData, setSearchData] = useState([])
    const [offset, setOffset] = useState(0)
    const [perPage, setPerPage] = useState(5)
    const [pageCount, setPageCount] = useState(0)
    const [realIndex, setRealIndex] = useState(1)
    const [editData, setEditData] = useState([])


    const [addNew, setAddNew] = useState(false)
    const [addEdit, setAddEdit] = useState(false)
    const [addDelete, setAddDelete] = useState(false)


    const handleAddNew = () => {
        setAddNew(true)
    }

    const handleAddEdit = (data) => {
        setEditData(data)
        setAddEdit(true)
    }

    const handleAddDelete = (data) => {
        setEditData(data)
        setAddDelete(true)
    }


    const {userId} = useParams()


    useEffect(() => {
        try{
            const fetch = async () => {
                setIsLoading(true)
                const res = await getMedicalHistory(userId)
                const data = res.data
                const slicedData = data.slice(offset * perPage, offset + perPage)
                setSlicedData(slicedData)
                setHistory(slicedData)
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
    }, [offset, perPage, contentLength, userId])

    const handleSearch = (array, searchText) => {
        if (searchText === ''){
            setHistory(slicedData)
        }
        else{
            setHistory(search(array, searchText, 'date')) 
        } 
    }

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setRealIndex(offset * perPage + 1)
        setOffset(selectedPage)
    }

    return (
        <Dashboardframe title="Health" subTitle="Medical History">
            <Helmet>
                <title>Medical History | Adekunle College Of Education</title>
            </Helmet>
            <NewDiagnosis 
                show={addNew}
                onHide={() => setAddNew(false)}
                contentLength={contentLength}
                setContentLength={setContentLength}
                userId={userId}
            />
            <EditDiagnosis 
                show={addEdit}
                onHide={() => setAddEdit(false)}
                contentLength={contentLength}
                setContentLength={setContentLength}
                data={editData}
            />
            <DeleteDiagnosis 
                show={addDelete}
                onHide={() => setAddDelete(false)}
                contentLength={contentLength}
                setContentLength={setContentLength}
                data={editData}
            />
            {isLoading ?
            <ContentLoader />
            :
            <div className="content-page">
                <div className="session-wrapper">
                    <Container>
                        <div className="session-title">Medical History</div>
                        <Row className="mt-4">
                            <Col lg={12}>
                                <button className="addnew-btn" onClick={handleAddNew}> <span className="iconify" data-icon="fluent:add-16-filled" data-inline="false"></span>Add New</button>
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
                                        <input type="search" className="search-box" id="search" placeholder='Date' onChange={(event) => handleSearch(searchData, event.target.value)}/>
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
                                            <th>Date</th>
                                            <th>Initial Diagnosis</th>
                                            <th>Final Diagnosis</th>
                                            <th>Description</th>
                                            <th>Treatment Plan</th>
                                            <th>Vital Sign</th>
                                            <th>Note</th>
                                            <th>Doctor</th>
                                            <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {history.map((data, index) => (
                                            <tr key={data.id}>
                                                <td>{tableIndex(index, realIndex)}</td>
                                                <td>{dateConverter(data.date)}</td>
                                                <td>{data.initialDiagnosis}</td>
                                                <td>{data.finalDiagnosis}</td>
                                                <td>{data.description}</td>
                                                <td>{data.treatmentPlan}</td>
                                                <td>{data.vitalSign}</td>
                                                <td>{data.additionDoctorsNote}</td>
                                                <td>{data.doctor}</td>
                                                <td>
                                                    <span className="btns">
                                                        <span
                                                            onClick={() => handleAddEdit(data)}
                                                        >
                                                            <span className="iconify edit-icon" data-icon="akar-icons:edit" data-inline="false"></span>
                                                        </span>
                                                        <span
                                                            onClick={() => handleAddDelete(data)}
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

export default MedicalHistory
