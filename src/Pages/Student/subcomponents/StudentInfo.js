import { Card } from "react-bootstrap"
import { AllStudent } from "./BiodataForm/Data"

function studentInfo({data}) {
    return (
        <Card style={{ marginBottom: "20px" }} className="StudentInfoCard">
            <Card.Body className="StudentInfoWrapper">
                <Card.Text>
                    <div className="StudentInfoTitle">Student Information</div>
                        <div>
                            <div className="StudentInfoBody">
                                <div className="StudentInfoBodyTile">
                                    Matric No:
                            </div>
                                <div className="StudentInfoBodyTileAns">
                                    {data.matricNumber ? data.matricNumber : "-"}
                                </div>
                            </div>
                            <div className="StudentInfoBody">
                                <div className="StudentInfoBodyTile">
                                    Program:
                            </div>
                                <div className="StudentInfoBodyTileAns">
                                    {data.programme ? data.programme : "-"}
                                </div>
                            </div>
                            <div className="StudentInfoBody">
                                <div className="StudentInfoBodyTile">
                                    Level:
                            </div>
                                <div className="StudentInfoBodyTileAns">
                                    {data.currentLevel ? data.currentLevel : "-"}
                                </div>
                            </div>
                            <div className="StudentInfoBody">
                                <div className="StudentInfoBodyTile">
                                    School:
                            </div>
                                <div className="StudentInfoBodyTileAns">
                                    {data.school ? data.school : "-"}
                                </div>
                            </div>
                            <div className="StudentInfoBody">
                                <div className="StudentInfoBodyTile">
                                    Department:
                            </div>
                                <div className="StudentInfoBodyTileAns">
                                    {data.department ? data.department : "-"}
                                </div>
                            </div>
                            <div className="StudentInfoBody">
                                <div className="StudentInfoBodyTile">
                                    Gender:
                            </div>
                                <div className="StudentInfoBodyTileAns">
                                    {data.gender ? data.gender : "-"}
                                </div>
                            </div>
                            <div className="StudentInfoBody">
                                <div className="StudentInfoBodyTile">
                                    Jamb Reg No.:
                            </div>
                                <div className="StudentInfoBodyTileAns">
                                    {data.jambRegNumber ? data.jambRegNumber : "-"}
                                </div>
                            </div>
                        </div>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default studentInfo
