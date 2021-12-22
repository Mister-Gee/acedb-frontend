import {Helmet} from 'react-helmet';
import StudentLoginForm from '../components/StudentLoginForm';


const StudentLogin = () => {

    return (
        <>
            <Helmet>
                <title>Student Login | iEduCare</title>
            </Helmet>
            <StudentLoginForm />
        </>
    )
}

export default StudentLogin