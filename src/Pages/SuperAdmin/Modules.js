import DashboardFrame from './subcomponent/DashboardFrame';
import {Helmet} from 'react-helmet';
import {Table, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {StatusActive, StatusInactive} from './subcomponent/Status';
import PaginationComponent from './subcomponent/PaginationComponent';
import {useState, useEffect} from 'react';
import LinkInstitutionModal from './subcomponent/LinkInstitutionModal';
import AddModuleModal from './subcomponent/AddModuleModal';
import ViewEditModules from './subcomponent/ViewEditModules';
import {getInstitution} from '../../services/institutionServices';
import {tableIndex, search} from '../../utils/Functions';
import ContentLoader from '../components/ContentLoader';

const Modules = () => {

    const [showAddNew, setAddNew] = useState(false)
    const [showAddModule, setAddModule] = useState(false)
    const [showEditModule, setEditModule] = useState(false)
    const [editInstitutionName, setEditInstitutionName] = useState("")
    const [editInstitutionId, setEditInstitutionId] = useState("")
    const [modulesTable, setModulesTable] = useState([])
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
            setModulesTable(slicedData)
        }
        else{
            setModulesTable(search(array, searchText, 'name'))
        } 
    }

    useEffect(() => {
        const fetchData = async() => {
            try{
                const res = await getInstitution()
                const data = res.data
                const slicedData = data.slice(offset * perPage, offset + perPage)
                setModulesTable(slicedData)
                setSearchObj(data)
                setSlicedData(slicedData)
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
        <DashboardFrame title="Administrator" subTitle="Modules">
            <Helmet>
                <title>Modules | iEduCare</title>
            </Helmet> 
            <LinkInstitutionModal show={showAddNew} onHide={() => setAddNew(false)} contentLength={contentLength} setContentLength={setContentLength} />
            <AddModuleModal show={showAddModule} onHide={() => setAddModule(false)} />
            <ViewEditModules show={showEditModule} onHide={() => setEditModule(false)} editInstitutionName={editInstitutionName} editInstitutionId={editInstitutionId} contentLength={contentLength} setContentLength={setContentLength}/>
            <div className="content-page">
            {isLoading ? 
                <ContentLoader />
                :
                <div className="institution-section">
                    <div className="header border-bottom">
                        <Button className="add-new-btn" onClick={() => setAddNew(true)}><span className="iconify" data-icon="bx:bx-link" data-inline="false"></span> Link New Institution </Button>
                        {/* <Button className="add-new-btn" onClick={() => setAddModule(true)}><span className="iconify" data-icon="fluent:add-12-filled" data-inline="false"></span> Create Module </Button> */}
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
                        <Table responsive hover size="lg">
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>Assigned Institutions</th>
                                    <th>Active Modules</th>
                                    <th>Status</th>
                                    <th>Last Edited</th>
                                </tr>
                            </thead>
                            <tbody>
                                {modulesTable.map((data, index) => (
                                    <tr key={data.id}>
                                        <td className="id">{tableIndex(index, realIndex)}</td>
                                        <td className="uni-name">{data.name}</td>
                                        <td><Link 
                                                to="/modules"
                                                onClick={() => {
                                                    setEditModule(true)
                                                    setEditInstitutionName(data.name)
                                                    setEditInstitutionId(data.id)
                                                }}
                                            >
                                                {data.noOfModules}
                                            </Link></td>
                                        <td> {data.isDeleted ? <StatusInactive /> : <StatusActive /> } </td>
                                        <td>{data.updateDate}</td>
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

export default Modules
