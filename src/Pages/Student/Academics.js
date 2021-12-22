import DashboardFrame from './subcomponents/Dashboard.Frame';
import { Helmet } from 'react-helmet';
import { Container, Col, Row } from 'react-bootstrap';
import RegisterationRequirment from './subcomponents/AcademicsSub.js/RegisterationRequirment';
import EduObjective from './subcomponents/AcademicsSub.js/EduObjective';
import EduTable from './subcomponents/AcademicsSub.js/EduTable';

function Academics() {
    return (
        <DashboardFrame title="Academics Page" subTitle="Dashboard">
            <Helmet>
                <title>Academics | iEduCare</title>
            </Helmet>
            <div className="content-page">
                <Container>
                    <Row>
                        <Col lg={4}>
                            <RegisterationRequirment/>
                        </Col>
                        <Col lg={8}>
                            <EduObjective/>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <EduTable/>
                        </Col>
                    </Row>
                </Container>
            </div>
        </DashboardFrame>
    )
}

export default Academics
