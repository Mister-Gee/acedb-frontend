import Dashboardframe from './subcomponent/Dashboardframe';
import {Helmet} from 'react-helmet';
import {Container, Row, Col, Table} from 'react-bootstrap';
import React, { useEffect} from 'react';
import {getExamCoursesAttendance} from '../../services/attendanceService';
import {dateConverter} from '../../utils/Functions';
import ContentLoader from '../components/ContentLoader';
import { useParams } from 'react-router-dom';
import {getCourseByID} from '../../services/courseServices';
import ExamStartAttendance from './subcomponent/ExamStartAttendance';
import { useState } from '@hookstate/core';
import store from '../../store/store';
import ExamEndAttendance from './subcomponent/ExamEndAttendance';


const CourseExamAttendance = () => {
    let {courseId} = useParams()
    const [examAtt, setExamAtt] = React.useState([])
    const [course, setCourse] = React.useState({})
    const [addNew, setAddNew] = React.useState(false)
    const [editNew, setEditNew] = React.useState(false)
    const [contentLength, setContentLength] = React.useState(0)
    const [attId, setAttId] = React.useState("")


    const [isLoading, setIsLoading] = React.useState(0)
    const {userId} = useState(store)

    const handleExamEnd = (id) => {
        setAttId(id)
        setEditNew(true)
    }

    useEffect(() => {
        const fetchData = async() => {
            const res = await getCourseByID(courseId)
            const data = res.data
            setCourse(data)
        } 
        fetchData()
    }, [courseId])

    useEffect(() => {
        setIsLoading(true)
        const fetchData = async() => {
            const res = await getExamCoursesAttendance(courseId)
            const data = res.data
            setExamAtt(data)
            setIsLoading(false)
        } 
        fetchData()
    }, [courseId, contentLength])

    return (
        <Dashboardframe title="Exams And Records" subTitle="Course Exam Attendance">
            <Helmet>
                <title>Course Exam Attendance | Adeyemi College of Education</title>
            </Helmet>
            <ExamStartAttendance 
                show={addNew} 
                onHide={() => setAddNew(false)} 
                courseId={courseId}
                supervisorId={userId.get()}
                contentLength={contentLength} 
                setContentLength={setContentLength}
            />
            <ExamEndAttendance 
                show={editNew} 
                onHide={() => setEditNew(false)} 
                courseId={courseId}
                supervisorId={userId.get()}
                attId={attId}
                contentLength={contentLength} 
                setContentLength={setContentLength}
            />
            {isLoading ?
            <ContentLoader />
            :
            <div className="content-page">
                <div className="session-wrapper">
                    <Container>
                        <div className="session-title">{course.courseCode} Exam Attendance</div>
                        <Row className="mt-4">
                            <Col lg={12}>
                                {examAtt.length < 1 &&
                                    <button className="addnew-btn attBtn" onClick={() => setAddNew(true)}> <span className="iconify" data-icon="fluent:add-16-filled" data-inline="false"></span>  Mark Start Attendance</button>
                                }
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col lg={12}>
                                <div className="session-table">
                                    <Table bordered hover responsive>
                                        <thead>
                                            <tr>
                                            <th>Course</th>
                                            <th>Start Attendance</th>
                                            <th>End Attendance</th>
                                            <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {examAtt.map((data, index) => (
                                            <tr key={data.id}>
                                                <td>{data.course}</td>
                                                <td>{data.examStartingStudents.length > 0 ? <span className="iconify check" data-icon="bi:check-circle-fill"></span> : <span className="iconify cancel" data-icon="websymbol:cancel-circle"></span>}</td>
                                                <td>{data.examEndingStudents.length > 0 ? <span className="iconify check" data-icon="bi:check-circle-fill"></span> : <span className="iconify cancel" data-icon="websymbol:cancel-circle"></span>}</td>
                                                <td> 
                                                    {data.examEndingStudents.length > 0 ?
                                                    "Completed"
                                                    :
                                                    <span class="custom-link" onClick={() => handleExamEnd(data.id)}>Mark Exam End Attendance</span>
                                                    }
                                                </td>
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

export default CourseExamAttendance
