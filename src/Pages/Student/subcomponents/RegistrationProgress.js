import React, {useState, useEffect} from 'react'
import { Card } from "react-bootstrap"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {getRegStatus} from '../../../services/biodataService';

function RegistrationProgress() {

    const [progress, setProgress] = useState([])

    useEffect(() => {
        try{
            const fetch = async () => {
                const res = await getRegStatus()
                setProgress(res.data)
            }
            fetch()
        }
        catch(err){
            console.log(err)
        }
    }
    ,[])
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
                            value={progress.progressPercent ? progress.progressPercent : 0}
                            text={`${progress.progressPercent ? progress.progressPercent : 0}%`} />
                    </div>
                    <div className="ProgressBarDelatils2">
                        <ul>
                            {progress.progressPercent === 100 ? <li className="completed">Completed</li> : <li className="Uncompleted">Uncompleted</li>}
                            <li className="Satisfied">{progress.completedRegProcess} Satisfied</li>
                            <li className="requirements">Of {progress.totalRegProcess} requirements</li>
                        </ul>
                    </div>
                </div>

            </Card.Body>
        </Card>
    )
}

export default RegistrationProgress
