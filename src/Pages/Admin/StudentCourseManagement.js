import Dashboardframe from './subcomponent/Dashboardframe';
import {Helmet} from 'react-helmet';
import {Container, Row, Col, Table} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import { getRegStudentCourseByDept } from '../../services/courseServices';
import ContentLoader from '../components/ContentLoader';
import {tableIndex} from '../../utils/Functions';
import { useParams, useHistory } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MarkAttendance from './subcomponent/MarkAttendance';


const StudentCourseManagement = () => {
    let history = useHistory()
    const [regStudent, setRegStudent] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [expanded, setExpanded] = useState(false);
    const [attData, setAttData] = useState({})
    const [modalShow, setModalShow] = useState(false)

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    let {courseId} = useParams()
    if(courseId === null || courseId === ""){
        history.push({
            pathname: "/lecture-management"
        })
    }
    

    useEffect(() => {
        try{
            const fetch = async () => {
                setIsLoading(true)
                const res = await getRegStudentCourseByDept(courseId)
                setRegStudent(res.data)
                setIsLoading(false)
            }
            fetch()
        }
        catch(err){
            console.log(err)
            setIsLoading(false)
        }
    }, [courseId])

    const handleAttendance = (data) => {
        setAttData(data)
        setModalShow(true)
    }

    const moveToAttendanceRecord = (courseId, deptId) => {
        history.push({
            pathname: `/student-class-attendance/${courseId}/${deptId}`
        })
    }

    return (
        <Dashboardframe title="Lecturer" subTitle="Student Course Management">
            <Helmet>
                <title>Student Course Management | Adekunle College Of Education</title>
            </Helmet>
            <MarkAttendance 
                show={modalShow} 
                onHide={() => setModalShow(false)}
                courseID={courseId}
                attData={attData}
            />
            {isLoading ?
            <ContentLoader />
            :
            <div className="content-page">
                <div className="session-wrapper">
                    <Container>
                        <div className="session-title">Student Management</div>
                        <Row className="mt-4">
                            <Col lg={12}>
                                {regStudent.map((data, index) => (
                                    <Accordion expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)} key={index}>
                                        <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls={`panel${index}bh-content`}
                                        id={`panel${index}bh-header`}
                                        >
                                        <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                            <b>Department:</b> {data.department} 
                                            
                                        </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                        <Typography>
                                            {
                                                data.students.length > 0 &&
                                                <>
                                                <button onClick={() => handleAttendance(data)} className="att-btn mr-2"> <span className="iconify" data-icon="fluent:add-16-filled" data-inline="false"></span>Mark Attendance</button>
                                                <button className="att-btn" onClick={() => moveToAttendanceRecord(courseId, data.departmentID)}>Attendance Records</button>
                                                </>
                                            }
                                        </Typography>
                                        <div className="session-table mt-3">
                                        <Table bordered hover responsive>
                                            <thead>
                                                <tr>
                                                    <th>S/N</th>
                                                    <th>Student Name</th>
                                                    <th>Matric Number</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.students.map((dt, ix) => (
                                                    <tr key={dt.id}>
                                                        <td>{tableIndex(ix, 1)}</td>
                                                        <td>{dt.name}</td>
                                                        <td>{dt.matricNumber}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                        </AccordionDetails>
                                </Accordion>
                                ))}
                                
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={12}>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        }
        </Dashboardframe>
    )
}

export default StudentCourseManagement
