import Dashboardframe from './subcomponent/Dashboardframe';
import {Helmet} from 'react-helmet';
import {Container, Row, Card, Col} from 'react-bootstrap';
import DashboardCard from './subcomponent/DashboardCard';
import LineChart from './subcomponent/LineChart';
import {Scrollbars} from 'react-custom-scrollbars';
import RecentStudentComponent from './subcomponent/RecentStudentComponent';
import {getUserCount} from '../../services/userServices';
import React, {useState, useEffect} from 'react';
import ContentLoader from '../components/ContentLoader';


const AdminDashboard = () => {
    const [userCount, setUserCount] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetch = async () => {
            try{
                const res = await getUserCount()
                setUserCount(res.data)
                setIsLoading(false)
            }
            catch(err){
                console.log(err)
            }
        }
        fetch()
    }, [])
    return (
        <Dashboardframe title="Staff" subTitle="Dashboard">
            {/* page title header */}
            <Helmet>
                <title>Dashboard | Adeyemi College Of Education</title>
            </Helmet>
            {isLoading ?
            <ContentLoader />
            :
            <div className="content-page">
               <Container>
                   {/* Card Row */}
                   <Row>
                       <Col lg={3} md={6} sm={12}>
                            <DashboardCard 
                                title="Total number of Active Students" 
                                value={userCount.totalActiveStudent} 
                                icon="icons8:student" 
                                iconClassName="student-icon-class"
                            />
                       </Col>
                       <Col lg={3} md={6} sm={12}>
                            <DashboardCard 
                                title="Total number of Inactive Students" 
                                value={userCount.totalInactiveStudent} 
                                icon="icons8:student" 
                                iconClassName="student-icon-class"
                            />
                       </Col>
                       <Col lg={3} md={6} sm={12}>
                            <DashboardCard 
                                title="Total number of Students" 
                                value={userCount.totalStudent} 
                                icon="icons8:student" 
                                iconClassName="student-icon-class"
                            />
                       </Col>
                       <Col lg={3} md={6} sm={12}>
                            <DashboardCard 
                                title="Total number of Staff" 
                                value={userCount.totalStaff} 
                                icon="ph:users" 
                                iconClassName="user-icon-class"
                            />
                       </Col>
                   </Row>
                   <Row className="mt-3">
                       {/* Chart and Recent student Row */}
                       <Col lg={9} md={12} sm={12}>
                            <Card >
                            <Card.Body>
                                <Card.Title>
                                    <div className="dashboard-chart-header mb-5">
                                        <div className="title">
                                            Registered students per Session 
                                        </div>
                                        {/* <div className="sort">
                                            <button type="button" className="dayBtn">Day</button>
                                            <button type="button" className="dayBtn border-0">Week</button>
                                            <button type="button" className="dayBtn border-0">Month</button>
                                        </div> */}
                                    </div>
                                </Card.Title>
                                <Card.Text>
                                    <LineChart />
                                </Card.Text>
                            </Card.Body>
                            </Card>
                       </Col>
                       <Col lg={3} md={12} sm={12}>
                       <Card >
                            <Card.Body>
                                <Card.Title className="recent-students-title">Recent registered students</Card.Title>
                                <Card.Text>
                                    <Scrollbars
                                        style={{width: "100%", height: "100%"}}
                                        autoHide={true}
                                        autoHeight={true}
                                        autoHeightMin={275}
                                        autoHeightMax={275}
                                    >
                                        <RecentStudentComponent name="Emmanuel Pauline" dateTime="Apr 03, 2021 1:43PM"/>
                                        <RecentStudentComponent name="Emmanuel Pauline" dateTime="Apr 03, 2021 1:43PM"/>
                                        <RecentStudentComponent name="Emmanuel Pauline" dateTime="Apr 03, 2021 1:43PM"/>
                                        <RecentStudentComponent name="Emmanuel Pauline" dateTime="Apr 03, 2021 1:43PM"/>

                                    </Scrollbars>
                                    <div className="view-all">
                                        <button type="button" className="view-all-btn">View All </button>
                                    </div>
                                </Card.Text>
                            </Card.Body>
                            </Card>
                       </Col>
                   </Row>
                </Container>
            </div>
            }
        </Dashboardframe>
    )
}

export default AdminDashboard;
