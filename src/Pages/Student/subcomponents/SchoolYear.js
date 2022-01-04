import React, {useEffect} from 'react'
import { Card } from "react-bootstrap";
import {getCurrentSessionSemester} from '../../../services/sessionServices';
import {getStudentFlag} from '../../../services/flagServices';
import {dateTimeConverter} from '../../../utils/Functions';
import store from '../../../store/store';
import {useState} from '@hookstate/core';


function SchoolYear() {
    const [schoolYear, setSchoolYear] = React.useState([])
    const [flag, setFlag] = React.useState([])

    const {userId} = useState(store)

    useEffect(() => {
        try{
            const fetch = async () => {
                const res = await getCurrentSessionSemester()
                setSchoolYear(res.data)
            }
            fetch()
        }
        catch(err){
            console.log(err)
        }
    }
    ,[])

    useEffect(() => {
        try{
            const fetch = async () => {
                const res = await getStudentFlag(userId.get())
                setFlag(res.data)
            }
            fetch()
        }
        catch(err){
            console.log(err)
        }
    }
    ,[])
    return (
        <Card style={{ textAlign: "center", marginBottom: "20px"  }} className="StudentInfoCard">
            <Card.Body className="StudentInfoWrapper">
                <Card.Text> 
                    <div className="StudentInfoTitle">Current School Year </div>
                    <div className="StudentFeesTable">
                            <div><span className="NoPaidFees">Academic Session: </span><span style={{ color: "#219653" }}>{schoolYear.academicYear}</span></div>
                            <div><span className="NoUnpaidFees">Semester: </span><span style={{ color: "#219653" }}>{schoolYear.semester}</span> </div>
                    </div>
                    <div className="StudentInfoTitle">Flag </div>
                    <div className="StudentFeesTable">
                            <div><span className="NoPaidFees">Level: </span><span style={{ color: "#219653" }}>{flag.flagLevel}</span></div>
                            <div><span className="NoUnpaidFees">Date: </span><span style={{ color: "#219653" }}>{dateTimeConverter(flag.date)}</span> </div>
                    </div>
                    {/* <Button className="StudentFeesButton" onClick={LinktoFinace}><span className="StudentFeesButtonText">View All</span></Button> */}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default SchoolYear
