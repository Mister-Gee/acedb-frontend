import DashboardFrame from './subcomponent/DashboardFrame';
import {Helmet} from 'react-helmet';
import {Table, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {StatusActive, StatusInactive} from './subcomponent/Status';
import PaginationComponent from './subcomponent/PaginationComponent';
import {useState, useEffect} from 'react';
import NewUserManagerModal from './subcomponent/NewUserManagerModal';
import {getInstitutionAdmin} from '../../services/institutionServices';
import {dateConverter, tableIndex, search} from '../../utils/Functions';
import EditUserManagerModal from './subcomponent/EditUserManagerModal';
import DeleteUserManagerModal from './subcomponent/DeleteUserManagerModal';
import ContentLoader from '../components/ContentLoader';


const UserManager = () => {

    const [showAddNew, setAddNew] = useState(false)
    const [institutionAdmin, setInstitutionAdmin] = useState([])
    const [showAddEdit, setAddEdit] = useState(false)
    const [showAddDelete, setAddDelete] = useState(false)
    const [content, setContent] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [offset, setOffset] = useState(0)
    const [perPage, setPerPage] = useState(5)
    const [pageCount, setPageCount] = useState(0)
    const [contentLength, setContentLength] = useState(0)
    const [realIndex, setRealIndex] = useState(1)
    
    const [searchObj, setSearchObj] = useState([])
    const [slicedData, setSlicedData] = useState([])

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setRealIndex(offset * perPage  + 1)
        setOffset(selectedPage)    
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await getInstitutionAdmin()
                const data = res.data
                const slicedData = data.slice(offset * perPage, offset + perPage)
                setSearchObj(data)
                setSlicedData(slicedData)
                setInstitutionAdmin(slicedData)
                setContentLength(data.length)
                setPageCount(Math.ceil(data.length / perPage))
                setIsLoading(false)
            }
            catch (err){
                console.log(err.message)
            }
        }
       fetchData()
    }, [offset, perPage, contentLength])

    const handleSearch = (array, searchText) => {
        if (searchText === ''){
            setInstitutionAdmin(slicedData)
        }
        else{
            setInstitutionAdmin(search(array, searchText, 'userName'))
        } 
    }


    return (
        <DashboardFrame title="Administrator" subTitle="User Manager">
            <Helmet>
                <title>User Manager | iEduCare</title>
            </Helmet> 
            <NewUserManagerModal show={showAddNew} onHide={() => setAddNew(false)} contentLength={contentLength} setContentLength={setContentLength}/>
            <EditUserManagerModal show={showAddEdit} onHide={() => setAddEdit(false)} data={content} contentLength={contentLength} setContentLength={setContentLength}/>
            <DeleteUserManagerModal show={showAddDelete} onHide={() => setAddDelete(false)} data={content} contentLength={contentLength} setContentLength={setContentLength}/>
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
                            <input type="search" className="search-box" id="search" onChange={(event) => handleSearch(searchObj, event.target.value)} />
                        </div>
                    </div>
                    <div className="institution-table">
                        <Table responsive bordered hover size="lg">
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>Username</th>
                                    <th>Assigned Institutions</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>Date Created</th>
                                    <th>Status</th>
                                    <th>Primary</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {institutionAdmin.map((data, index) => (
                                    <tr key={data.id}>
                                        <td className="id">{tableIndex(index, realIndex)}</td>
                                        <td className="uni-name"><span>{data.userName}</span></td>
                                        <td><Link to="/institutions">{data.institutionName}</Link></td>
                                        <td>{data.email}</td>
                                        <td>{data.phoneNumber}</td>
                                        <td>{dateConverter(data.createDate)}</td>
                                        <td>{ data.status.name === "Active"? <StatusActive /> : <StatusInactive /> }</td>
                                        <td> {data.isPrimary ? "Yes" : "No"} </td>
                                        <td> <span 
                                            className="edit-icon-section"
                                            onClick={() => {
                                            setAddEdit(true)
                                            setContent(data)
                                            }}
                                        > 
                                        <span className="iconify edit" data-icon="ls:edit" data-inline="false" >
                                        </span> 
                                        <span className="edittext">Edit</span>
                                        </span>
                                        <span
                                            className="delete-icon-section"
                                            onClick={() => {
                                            setAddDelete(true)
                                            setContent(data)
                                            }}
                                        >
                                        <span className="iconify delete" data-icon="ant-design:delete-filled" data-inline="false">
                                        </span> 
                                        <span className="deletetext">Delete</span>
                                        </span> <span className="iconify reset" data-icon="bx:bx-reset" data-inline="false"></span> </td>
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

export default UserManager
