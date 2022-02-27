import DashboardFrame from './subcomponents/Dashboard.Frame';
import {Helmet} from 'react-helmet';
import {useState, useEffect} from 'react';
import { getStudentCurrentExamRecords} from '../../services/examRecordService';
import ContentLoader from '../components/ContentLoader';
import Annoucement from '../components/Annoucement';


const StudentAnnoucement = () => {
    const [isLoading, setIsLoading] = useState(false)
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
        <DashboardFrame title="Student Portal" subTitle="Annoucement">
            <Helmet>
                <title>Annoucement | Adeyemi College Of Education</title>
            </Helmet> 
            <div className="content-page">
            {isLoading ? 
                <ContentLoader />
                :
                <Annoucement />
            }
            </div>
        </DashboardFrame>
    )
}

export default StudentAnnoucement
