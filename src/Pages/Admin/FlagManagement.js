import Dashboardframe from './subcomponent/Dashboardframe';
import {Helmet} from 'react-helmet';
import {Container, Row, Col, Table} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import FlagStudent from './subcomponent/FlagStudent';
import PaginationComponent from './subcomponent/PaginationComponent';
import ContentLoader from '../components/ContentLoader';
import {getAllFlags} from '../../services/flagServices';
import {search, dateConverter} from '../../utils/Functions';
import NewFlagLevel from './subcomponent/NewFlagLevel';
import { useState as useStateHook } from '@hookstate/core';
import store from '../../store/store';

const FlagManagement = () => {
    const [addNew, setAddNew] = useState(false)
    const [addFlags, setAddFlags] = useState(false)

    const [flagData, setFlagData] = useState([])
    
    const [slicedData, setSlicedData] = useState([])
    const [searchData, setSearchData] = useState([])

    const [offset, setOffset] = useState(0)
    const [perPage, setPerPage] = useState(5)
    const [pageCount, setPageCount] = useState(0)
    const [contentLength, setContentLength] = useState(0)
    const [isLoading, setIsLoading] = useState(0)
    const [realIndex, setRealIndex] = useState(1)

    const {role} = useStateHook(store)

    const handleAddNew = () => {
        setAddNew(true)
    }

    const handleAddFlags = () => {
        setAddFlags(true)
    }

    useEffect(() => {
        setIsLoading(true)
        const fetchData = async() => {
            const res = await getAllFlags()
            const data = res.data
            const slicedData = data.slice(offset * perPage, offset + perPage)
            setSlicedData(slicedData)
            setFlagData(slicedData)
            setSearchData(data)
            setContentLength(data.length)
            setPageCount(Math.ceil(data.length / perPage))
            setIsLoading(false)
        } 
        fetchData()
    }, [offset, perPage, contentLength])

    const handleSearch = (array, searchText) => {
        if (searchText === ''){
            setFlagData(slicedData)
        }
        else{
            setFlagData(search(array, searchText, 'studentName'))
        } 
    }

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setRealIndex(offset * perPage + 1)
        setOffset(selectedPage)
    }

    return (
        <Dashboardframe title="Security" subTitle="Flag Management">
            <Helmet>
                <title>Flag Management | Adeyemi College of Education</title>
            </Helmet>
            <FlagStudent show={addNew} onHide={() => setAddNew(false)} contentLength={contentLength} setContentLength={setContentLength}/>
            <NewFlagLevel show={addFlags} onHide={() => setAddFlags(false)}/>
            {isLoading ?
            <ContentLoader />
            :
            <div className="content-page">
                <div className="session-wrapper">
                    <Container>
                        <div className="session-title">Flag Management</div>
                        <Row className="mt-4">
                            <Col lg={12}>
                                {role.get().includes("Security") &&
                                <button className="addnew-btn" onClick={handleAddNew}> <span className="iconify" data-icon="fluent:add-16-filled" data-inline="false"></span>Flag Student</button>
                                }
                                {role.get().includes("MIS") &&
                                <button className="addnew-btn ml-2" onClick={handleAddFlags}> <span className="iconify" data-icon="fluent:add-16-filled" data-inline="false"></span>Add Flag level</button>
                                }
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
                                            <th>Student Name</th>
                                            <th>Flag Level</th>
                                            <th>Flagged By</th>
                                            <th>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {flagData.map((data, index) => (
                                                <tr key={data.id}>
                                                    <td>{index + realIndex}</td>
                                                    <td>{data.studentName}</td>
                                                    <td>{data.flagLevel}</td>
                                                    <td>{data.security}</td>
                                                    <td>{dateConverter(data.date)}</td>
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

export default FlagManagement
