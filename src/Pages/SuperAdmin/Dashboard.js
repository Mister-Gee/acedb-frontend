import DashboardFrame from './subcomponent/DashboardFrame';
import { Helmet } from 'react-helmet';
import { Container, Col, Row, Card, Table } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {StatusActive, StatusInactive} from './subcomponent/Status';
import {useEffect, useState} from 'react';
import {dateConverter} from '../../utils/Functions';
import {getInstitution} from '../../services/institutionServices';
import ContentLoader from '../components/ContentLoader';

const Dashboard = () => {
    const [totalInstitution, setTotalInstitution] = useState(0)
    const [recentInstitution, setRecentInstitution] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    useEffect(()=>{
        const fetchData = async() => {
            try{
                const res = await getInstitution()
                setTotalInstitution(res.data.length)
                let data = res.data
                let result = data.reverse().slice(0, 5)
                setRecentInstitution(result)
                setIsLoading(false)
            }
            catch(err){
                console.log(err.message)
            }
        }
        fetchData()
    }, [])

    return (
        <DashboardFrame title="Administrator" subTitle="Dashboard">
            <Helmet>
                <title>Admin Dashboard | iEduCare</title>
            </Helmet>
            <div className="content-page">
                
                {isLoading ? 
                <ContentLoader />
                :
                <Container>
                    <Row>
                        <Col lg={4}>
                            <Card className="detail-card">
                                <Card.Body>
                                    <Card.Text>
                                        <div className="card-content">
                                            <div className="desc">
                                                <div className="icon">
                                                    <span className="iconify" data-icon="gridicons:institution" data-inline="false"></span>
                                                </div>
                                                <div className="text">
                                                    Total Number of Institutions
                                            </div>
                                            </div>
                                            <div className="vl"></div>
                                            <div className="value">
                                                {totalInstitution}
                                        </div>
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={4}>
                            <Card className="detail-card">
                                <Card.Body>
                                    <Card.Text>
                                        <div className="card-content">
                                            <div className="desc">
                                                <div className="icon">
                                                    <span className="iconify" data-icon="clarity:users-solid" data-inline="false"></span>
                                                </div>
                                                <div className="text">
                                                    Total number of student population
                                            </div>
                                            </div>
                                            <div className="vl"></div>
                                            <div className="value">
                                                210
                                        </div>
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={4}>
                            <Card className="detail-card">
                                <Card.Body>
                                    <Card.Text>
                                        <div className="card-content">
                                            <div className="desc">
                                                <div className="icon">
                                                    <span className="iconify" data-icon="ri:hand-coin-fill" data-inline="false"></span>
                                                </div>
                                                <div className="text">
                                                    Total Payment Profit
                                            </div>
                                            </div>
                                            <div className="vl"></div>
                                            <div className="value">
                                                ₦255, 000
                                        </div>
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <div className="table-section">
                                <div className="header"> Recently Added Institutions </div>
                                <Table className="border">
                                    <thead>
                                        <tr>
                                            <th>Name of Institution</th>
                                            <th>Number of Modules</th>
                                            <th>Date Created</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentInstitution.map((data) => (
                                            <tr key={data.id}>
                                                <td className="school">{data.name}</td>
                                                <td className="module"> <Link to="/modules"> {data.noOfModules} </Link></td>
                                                <td>{dateConverter(data.address.createDate)} </td>
                                                <td> { data.address.isDeleted ? <StatusInactive /> : <StatusActive />} </td>
                                            </tr>
                                        ))}
                                        
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>
                </Container>
            }
            </div>
        </DashboardFrame>
    )
}

export default Dashboard
