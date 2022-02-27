import DashboardFrame from './subcomponents/Dashboard.Frame';
import {Helmet} from 'react-helmet';
import {Table} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import { getStudentCurrentExamRecords} from '../../services/examRecordService';
import ContentLoader from '../components/ContentLoader';


const StudentExamRecords = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [result, setResult] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
               const res = await getStudentCurrentExamRecords()
               setResult(res.data)
               setIsLoading(false)
            }
            catch (err){
                console.log(err.message)
            }
        }
       fetchData()
    }, [])

    return (
        <DashboardFrame title="Student Portal" subTitle="Result">
            <Helmet>
                <title>Result | Adeyemi College Of Education</title>
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
                                    <th>Course Unit</th>
                                    <th>Assessment Score</th>
                                    <th>Exam Score</th>
                                    <th>Total Score</th>
                                    <th>Grade</th>
                                    <th>Grade Point</th>
                                </tr>
                            </thead>
                            <tbody>
                                {result.map((data, index) => (
                                    data &&
                                    <tr key={data.id}>
                                        <td>{index + 1}</td>
                                        <td>{data.course}</td>
                                        <td>{data.courseUnit}</td>
                                        <td>{data.otherAssessmentScore}</td>
                                        <td>{data.examScore}</td>
                                        <td>{data.totalScore}</td>
                                        <td>{data.letterGrade}</td>
                                        <td>{data.gradePoint}</td>
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

export default StudentExamRecords
