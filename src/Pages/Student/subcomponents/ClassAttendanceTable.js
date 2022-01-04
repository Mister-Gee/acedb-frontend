import {Table} from 'react-bootstrap';

const ClassAttendanceTable = ({attendance}) => {
    return (
        <div className='mt-4'>
            <Table responsive bordered hover size="lg">
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Course</th>
                        <th>Course Unit</th>
                        <th>Total Classes Attended</th>
                        <th>Total Classes Held</th>
                        <th>Attendance(%)</th>
                    </tr>
                </thead>
                <tbody>
                    {attendance.map((data, index) => (
                        <tr key={data.id}>
                            <td>{index + 1}</td>
                            <td>{data.course}</td>
                            <td>{data.courseUnit}</td>
                            <td>{data.totalClassesAttended}</td>
                            <td>{data.totalClassesHeld}</td>
                            <td>{data.attendancePercent}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default ClassAttendanceTable
