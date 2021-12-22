import { Card } from "react-bootstrap";


const DashboardCard = ({title, value, icon, iconClassName}) => {
    return(
        <Card className="card-wrapper">
            <Card.Body>
                <Card.Text className="dashboard-card-container">
                    <div className="text-wrapper">
                        <div className="title">
                            {title}
                        </div>
                        <div className="value">
                            {value}
                        </div>
                    </div>
                    <div className={`card-icon ${iconClassName}`}>
                        <span className="iconify" data-icon={icon} data-inline="false"></span> 
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default DashboardCard;