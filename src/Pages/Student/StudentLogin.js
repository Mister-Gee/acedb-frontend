import {Helmet} from 'react-helmet';
import StudentLoginForm from '../components/StudentLoginForm';


const StudentLogin = () => {

    return (
        <>
            <Helmet>
                <title> Login | Adeyemi College of Education</title>
            </Helmet>
            <StudentLoginForm />
        </>
    )
}

export default StudentLogin