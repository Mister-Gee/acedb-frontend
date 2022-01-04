import DashboardFrame from './subcomponents/Dashboard.Frame';
import { Helmet } from 'react-helmet';
import StudentProfileData from './subcomponents/BiodataForm/StudentProfileData';

function StudentProfile() {

    return (
        <DashboardFrame title="Student Profile" subTitle="Dashboard">
            <Helmet>
                <title>Student Profile | Adeyemi College of Education</title>
            </Helmet>
            <div className="StudentProfileDetailsCard">
                <div className="StudentProfileBody">
                    <StudentProfileData />
                </div>
            </div>
        </DashboardFrame>
    )
}

export default StudentProfile