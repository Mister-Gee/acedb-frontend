import React from 'react'
import { Card, Button } from "react-bootstrap"
import { useHistory } from 'react-router-dom';

function Fees() {

    let history = useHistory()

    const LinktoFinace = () => {
        history.push({
            pathname: "/finances"
        })
    }

    const paidFees = 1
    const unpaidFees = 5

    return (
        <Card style={{ textAlign: "center", marginBottom: "20px"  }} className="StudentInfoCard">
            <Card.Body className="StudentInfoWrapper">
                <Card.Text>
                    <div className="StudentInfoTitle">Fees {unpaidFees > 0 ? <span className="StudentFeesWarning">(you have out standing fees)</span> : <span>(Fees Completed)</span>}</div>
                    <div className="StudentFeesTable">
                            <div><span className="NoPaidFees">Paid Fees: </span>{paidFees > 0 ? <span style={{ color: "#219653" }}>{paidFees}</span> : <span>{paidFees}</span>}</div>
                            <div><span className="NoUnpaidFees">Unpaid Fees: </span>{unpaidFees > 0 ? <span style={{ color: "#EB5757" }}>{unpaidFees}</span> : <span>{unpaidFees}</span>}</div>
                    </div>
                    <Button className="StudentFeesButton" onClick={LinktoFinace}><span className="StudentFeesButtonText">View All</span></Button>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Fees
