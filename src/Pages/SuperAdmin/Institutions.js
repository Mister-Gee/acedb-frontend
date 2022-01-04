import DashboardFrame from './subcomponent/DashboardFrame';
import { Helmet } from 'react-helmet';
import { Table, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {StatusActive, StatusInactive} from './subcomponent/Status';
import PaginationComponent from './subcomponent/PaginationComponent';
import {useState, useEffect} from 'react';
import NewInstitutionModal from './subcomponent/NewInstitutionModal';
import EditInstitutionModal from './subcomponent/EditInstitutionModal';
import DeleteInstitutionModal from './subcomponent/DeleteInstitutionModal';
import {dateConverter, tableIndex, search} from '../../utils/Functions';
import {getInstitution} from '../../services/institutionServices';
import ContentLoader from '../components/ContentLoader';

const Institutions = (props) => {

    const [showAddNew, setAddNew] = useState(false)
    const [showAddEdit, setAddEdit] = useState(false)
    const [showAddDelete, setAddDelete] = useState(false)

    const [offset, setOffset] = useState(0)
    const [content, setContent] = useState([])
    const [perPage, setPerPage] = useState(5)
    const [pageCount, setPageCount] = useState(0)
    const [contentLength, setContentLength] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [realIndex, setRealIndex] = useState(1)


    const [institutions, setInstitutions] = useState([])
    const [searchObj, setSearchObj] = useState([])
    const [slicedData, setSlicedData] = useState([])

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setRealIndex(offset * perPage + 1)
        setOffset(selectedPage)
    }

    const handleSearch = (array, searchText) => {
        if (searchText === ''){
            setInstitutions(slicedData)
        }
        else{
            setInstitutions(search(array, searchText, 'name'))
        } 
    }


    useEffect(()=>{
        const fetchData = async() => {
            try{
                const res = await getInstitution()
                const data = res.data
                const slicedData = data.slice(offset * perPage, offset + perPage)
                setSearchObj(data)
                setSlicedData(slicedData)
                setInstitutions(slicedData)
                setContentLength(data.length)
                setPageCount(Math.ceil(data.length / perPage))
                setIsLoading(false)
            }
            catch(err){
                console.log(err.message)
            }
        }
        fetchData()
    }, [offset, perPage, contentLength])

    return (
        <DashboardFrame title="Administrator" subTitle="Institutions">
            <Helmet>
                <title>Institutions | iEduCare</title>
            </Helmet> 
            <NewInstitutionModal show={showAddNew} onHide={() => setAddNew(false)} contentLength={contentLength} setContentLength={setContentLength}/>
            <EditInstitutionModal show={showAddEdit} onHide={() => setAddEdit(false)}  data={content}  contentLength={contentLength} setContentLength={setContentLength}/>
            <DeleteInstitutionModal show={showAddDelete} onHide={() => setAddDelete(false)} data={content} contentLength={contentLength} setContentLength={setContentLength}/>
            <div className="content-page">
            {isLoading ? 
                <ContentLoader />
                :
                <div className="institution-section">
                    <div className="header border-bottom">
                        <Button className="add-new-btn" onClick={() => setAddNew(true)}><span className="iconify" data-icon="fluent:add-16-filled" data-inline="false"></span> Add New </Button>
                    </div>
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

                            <label htmlFor="search" className="search-label">Search: </label>
                            <input type="search" className="search-box" id="search" onChange={(event) => handleSearch(searchObj, event.target.value)}/>
                        </div>
                    </div>
                    <div className="institution-table">
                        <Table responsive bordered hover size="lg">
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>Name of Institution</th>
                                    <th>Modules No.</th>
                                    <th>License Type</th>
                                    <th>Date Created</th>
                                    <th>Expiry Date</th>
                                    <th>Admin User</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {institutions.map((institution, index)=>(
                                   <tr key={institution.id}>
                                    <td className="id">{tableIndex(index, realIndex)}</td>
                                    <td className="uni-name"><span>{institution.name}</span></td>
                                    <td><Link to="/institutions">{institution.noOfModules}</Link></td>
                                    <td>{institution.license }</td>
                                    <td>{dateConverter(institution.address.createDate)}</td>
                                    <td>{institution.expiryDate}</td>
                                    <td>{institution.primaryAdminName }</td>
                                    <td> { institution.address.isDeleted ? <StatusInactive /> : <StatusActive /> }</td>
                                    <td>
                                        <span 
                                            className="edit-icon-section"
                                            onClick={() => {
                                            setAddEdit(true)
                                            setContent(institution)
                                            }}
                                        > 
                                        <span className="iconify edit" data-icon="ls:edit" data-inline="false" >
                                        </span> 
                                        <span class="edittext">Edit</span>
                                        </span>
                                        <span
                                            className="delete-icon-section"
                                            onClick={() => {
                                            setAddDelete(true)
                                            setContent(institution)
                                            }}
                                        >
                                        <span className="iconify delete" data-icon="ant-design:delete-filled" data-inline="false">
                                        </span> 
                                        <span class="deletetext">Delete</span>
                                        </span>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                            </Table>
                        </div>
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
                </div>
            }
            </div>
        </DashboardFrame>
    )
}

export default Institutions;