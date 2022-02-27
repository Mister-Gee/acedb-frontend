import DashboardFrame from './subcomponents/Dashboard.Frame';
import {Helmet} from 'react-helmet';
import {Tab, Tabs} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import { getStudentClassAttendance, getStudentExamAttendance } from '../../services/attendanceService';
import ContentLoader from '../components/ContentLoader';
import ClassAttendanceTable from './subcomponents/ClassAttendanceTable';
import ExamAttendanceTable from './subcomponents/ExamAttendanceTable';


const Attendance = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [classAtt, setClassAtt] = useState([])
    const [examAtt, setExamAtt] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
               const res = await getStudentClassAttendance()
               setClassAtt(res.data)
               setIsLoading(false)
            }
            catch (err){
                console.log(err.message)
            }
        }
       fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
               const res = await getStudentExamAttendance()
               setExamAtt(res.data)
            }
            catch (err){
                console.log(err.message)
            }
        }
       fetchData()
    }, [])


    return (
        <DashboardFrame title="Student Portal" subTitle="Attendance">
            <Helmet>
                <title>Attendance | Adeyemi College Of Education</title>
            </Helmet> 
            <div className="content-page">
            {isLoading ? 
                <ContentLoader />
                :
                <div className="institution-section">
                    <div className="institution-table">
                        <Tabs defaultActiveKey="class" id="uncontrolled-tab-example" className="mt-4 session-tab">
                            <Tab eventKey="class" title="Class Attendance">
                                <ClassAttendanceTable 
                                    attendance={classAtt}
                                />
                            </Tab>
                            <Tab eventKey="exam" title="Exam Attendance">
                                <ExamAttendanceTable 
                                    attendance={examAtt}
                                />
                            </Tab>
                        </Tabs>
                        </div>
                </div>
            }
            </div>
        </DashboardFrame>
    )
}

export default Attendance
