import Dashboardframe from './subcomponent/Dashboardframe';
import {Helmet} from 'react-helmet';
import {Container, Row, Col, Table} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import { getStudentClassAttendanceByDept } from '../../services/attendanceService';
import ContentLoader from '../components/ContentLoader';
import {search, tableIndex} from '../../utils/Functions';
import { Link, useParams } from 'react-router-dom';


const StudentClassAttendance = () => {
    const [attendance, setAttendance] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchData, setSearchData] = useState([])

    let {courseId} = useParams()
    let {deptId} = useParams()


    useEffect(() => {
        try{
            const fetch = async () => {
                setIsLoading(true)
                const res = await getStudentClassAttendanceByDept(courseId, deptId)
                const data = res.data
                setAttendance(data)
                setSearchData(data)
                setIsLoading(false)
            }
            fetch()
        }
        catch(err){
            console.log(err)
            setIsLoading(false)
        }
    }, [courseId, deptId])

    const handleSearch = (array, searchText) => {
        if (searchText === ''){
            setAttendance(attendance)
        }
        else{
            setAttendance(search(array, searchText, 'name')) 
        } 
    }


    return (
        <Dashboardframe title="Lecturer" subTitle="Student Attendance">
            <Helmet>
                <title>Student Attendance | Adekunle College Of Education</title>
            </Helmet>
            {isLoading ?
            <ContentLoader />
            :
            <div className="content-page">
                <div className="session-wrapper">
                    <Container>
                        <div className="session-title">Student Attendance</div>
                        <Row>
                            <Col lg={12}>
                                <div className="table-header">
                                    <div className="entries">
                                    </div>
                                    <div className="search">
                                        <label htmlFor="search" className="search-label">Filter: </label>
                                        <input type="search" className="search-box" id="search" placeholder='Student Name' onChange={(event) => handleSearch(searchData, event.target.value)}/>
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
                                            <th>Name</th>
                                            <th>Maatric Number</th>
                                            <th>Classes Attended</th>
                                            <th>Classes Held</th>
                                            <th>Attendance(%)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {attendance.map((data, index) => (
                                            <tr key={data.id}>
                                                <td>{tableIndex(index, 1)}</td>
                                                <td>{data.name}</td>
                                                <td>{data.matricNumber}</td>
                                                <td>{data.totalClassesAttended}</td>
                                                <td>{data.totalClassesHeld}</td>
                                                <td>{data.attendancePercent}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
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

export default StudentClassAttendance
