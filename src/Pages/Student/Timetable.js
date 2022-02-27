import DashboardFrame from './subcomponents/Dashboard.Frame';
import {Helmet} from 'react-helmet';
import {Table} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import { getStudentTimetable} from '../../services/examTimetableService';
import ContentLoader from '../components/ContentLoader';
import { dateConverter } from '../../utils/Functions';


const Timetable = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [timetable, setTimetable] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
               const res = await getStudentTimetable()
               setTimetable(res.data)
               setIsLoading(false)
            }
            catch (err){
                console.log(err.message)
            }
        }
       fetchData()
    }, [])

    return (
        <DashboardFrame title="Student Portal" subTitle="Exam TimeTable">
            <Helmet>
                <title>Timetable | Adeyemi College Of Education</title>
            </Helmet> 
            <div className="content-page">
            {isLoading ? 
                <ContentLoader />
                :
                <div className="institution-section">
                    <div className="institution-table">
                        <Table responsive bordered hover size="lg">
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>Course</th>
                                    <th>Time</th>
                                    <th>Date</th>
                                    <th>Duration</th>
                                    <th>Venue</th>
                                    <th>Supervisor</th>
                                </tr>
                            </thead>
                            <tbody>
                                {timetable.map((data, index) => (
                                    data &&
                                    <tr key={data.id}>
                                        <td>{index + 1}</td>
                                        <td>{data.course}</td>
                                        <td>{data.examStartTime}</td>
                                        <td>{dateConverter(data.examDateTime)}</td>
                                        <td>{data.examDuration}</td>
                                        <td>{data.venue}</td>
                                        <td>{data.supervisor}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            }
            </div>
        </DashboardFrame>
    )
}

export default Timetable
