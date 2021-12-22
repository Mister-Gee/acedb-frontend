import DashboardFrame from './subcomponent/DashboardFrame';
import {Helmet} from 'react-helmet';
import {Table, Button} from 'react-bootstrap';
import PaginationComponent from './subcomponent/PaginationComponent';
import {useState, useEffect} from 'react';
import {getInstitutionLicense} from '../../services/institutionServices';
import AddLicenseManagerModal from './subcomponent/AddLicenseManagerModal';
import {dateConverter, tableIndex, search} from '../../utils/Functions';
import DeleteLicenseModal from './subcomponent/DeleteLicenseModal';
import ContentLoader from '../components/ContentLoader';

const LicenseManager = () => {

    const [showAddNew, setAddNew] = useState(false)
    const [licenseState, setLicenseState] = useState([])
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
        setRealIndex(offset * perPage + 1)
        setOffset(selectedPage)
    }

    const handleSearch = (array, searchText) => {
        if (searchText === ''){
            setLicenseState(slicedData)
        }
        else{
            setLicenseState(search(array, searchText, 'institutionName'))
        } 
    }

    useEffect(()=>{
        const fetchData = async() => {
            try{
                const res = await getInstitutionLicense()
                const data = res.data
                const slicedData = data.slice(offset * perPage, offset + perPage)
                setSearchObj(data)
                setSlicedData(slicedData)
                setLicenseState(slicedData)
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
        <DashboardFrame title="Administrator" subTitle="License Manager">
            <Helmet>
                <title>License Manager | iEduCare</title>
            </Helmet> 
            <AddLicenseManagerModal show={showAddNew} onHide={() => setAddNew(false)} contentLength={contentLength} setContentLength={setContentLength} />
            <DeleteLicenseModal show={showAddDelete} onHide={() => setAddDelete(false)} data={content} contentLength={contentLength} setContentLength={setContentLength}/>
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
                                    <th>License Type</th>
                                    <th>Date Created</th>
                                    <th>Expiry Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {licenseState.map((data, index)=>(
                                    <tr key={data.id}>
                                        <td className="id">{tableIndex(index, realIndex)}</td>
                                        <td className="uni-name"><span>{data.institutionName}</span></td>
                                        <td>{data.licenseTypeName}</td>
                                        <td>{dateConverter(data.dateCreated)}</td>
                                        <td>{dateConverter(data.expiryDate)}</td>
                                        <td> 
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

export default LicenseManager
