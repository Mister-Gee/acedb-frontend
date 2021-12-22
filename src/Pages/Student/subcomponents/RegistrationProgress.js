import React from 'react'
import { Card } from "react-bootstrap"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function RegistrationProgress() {
    const percentage = 90;
    return (
        <Card style={{ marginBottom: "20px"  }} className="ProgressBarCard">
            <Card.Body className="ProgressBarWrapper">
                <Card.Text>
                    <div className="ProgressbarTitle"> Registration Progress</div>
                </Card.Text>
                <div className="ProgressBarDelatils">
                    <div>
                        <CircularProgressbar
                            styles={buildStyles({
                            pathColor: "#FDC600",
                            textColor: '#333333',
                            })} className="bar"
                            value={percentage}
                            text={`${percentage}%`} />
                    </div>
                    <div className="ProgressBarDelatils2">
                        <ul>
                            {percentage >= 100 ? <li className="completed">Completed</li> : <li className="Uncompleted">Uncompleted</li>}
                            <li className="Satisfied">5 Satisfied</li>
                            <li className="requirements">Of 10 requirements</li>
                        </ul>
                    </div>
                </div>

            </Card.Body>
        </Card>
    )
}

export default RegistrationProgress
