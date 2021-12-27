import DashboardFrame from './subcomponents/Dashboard.Frame';
import {useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import { Container, Col, Row } from 'react-bootstrap';
import StudentInfo from './subcomponents/StudentInfo';
import RegistrationProgress from './subcomponents/RegistrationProgress';
import Fees from './subcomponents/Fees';
import PublicAnnouncement from './subcomponents/PublicAnnouncement';
import RegisteredCourses from './subcomponents/Table';
import ContentLoader from '../components/ContentLoader';
import { userDetails } from '../../services/userServices';

const StudentDashboard = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState({})

    useEffect(() => {
        setIsLoading(true)
        try{
            const fetch = async () => {
                const res = await userDetails()
                setUser(res.data)
            }
            fetch()
        }
        catch(err){
            console.log(err)
        }
        setIsLoading(false)
    }, [])

    return (
        <DashboardFrame title="Student Portal" subTitle="Dashboard">
            <Helmet>
                <title>Dashboard | Adeyemi College of Education</title>
            </Helmet>
            {isLoading 
            ?
            <ContentLoader />
            :
            <div className="content-page">
                <Container>
                    <Row>
                        <Col lg={4}>
                            <StudentInfo 
                                data={user}
                            />
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
            }
        </DashboardFrame>
    )
}

export default StudentDashboard;