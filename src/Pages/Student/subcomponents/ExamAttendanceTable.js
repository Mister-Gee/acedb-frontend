import {Table} from 'react-bootstrap';
import { timeConverter } from '../../../utils/Functions';
import { Present, Absent, Completed, Incomplete } from './AttendanceStatus';

const ExamAttendanceTable = ({attendance}) => {
    return (
        <div className='mt-4'>
            <Table responsive bordered hover size="lg">
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Course</th>
                        <th>Exam Start Time</th>
                        <th>Exam End Time</th>
                        <th>Exam Start Attendance</th>
                        <th>Exam Start Attendance</th>
                        <th>Status</th>
                        <th>Supervisor</th>
                    </tr>
                </thead>
                <tbody>
                    {attendance.map((data, index) => (
                        <tr key={data.id}>
                            <td>{index + 1}</td>
                            <td>{data.course}</td>
                            <td>{data.startTime ? timeConverter(data.startTime) : "-"}</td>
                            <td>{data.endTime ? timeConverter(data.endTime) : "-"}</td>
                            <td>{data.startAttendance ? <Present /> : <Absent />}</td>
                            <td> {data.endAttendance ? <Present /> : <Absent />}</td>
                            <td> {data.isCommence ? <Completed /> : <Incomplete />}</td>
                            <td>{data.supervisor}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default ExamAttendanceTable
