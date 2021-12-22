import DashboardFrame from './subcomponents/Dashboard.Frame';
import { Helmet } from 'react-helmet';
import { Container, Col, Row } from 'react-bootstrap';
import StudentInfo from './subcomponents/StudentInfo';
import RegistrationProgress from './subcomponents/RegistrationProgress';
import Fees from './subcomponents/Fees';
import PublicAnnouncement from './subcomponents/PublicAnnouncement';
import RegisteredCourses from './subcomponents/Table';

const StudentDashboard = () => {
    return (
        <DashboardFrame title="Student Portal" subTitle="Dashboard">
            <Helmet>
                <title>Dashboard | iEduCare</title>
            </Helmet>
            <div className="content-page">
                <Container>
                    <Row>
                        <Col lg={4}>
                            <StudentInfo />
                        </Col>
                        <Col lg={4}>
                            <RegistrationProgress />
                        </Col>
                        <Col lg={4}>
                            <Fees />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={8}>
                            <RegisteredCourses />
                        </Col>
                        <Col lg={4}>
                            <PublicAnnouncement />
                        </Col>
                    </Row>
                </Container>
            </div>
        </DashboardFrame>
    )
}

export default StudentDashboard;