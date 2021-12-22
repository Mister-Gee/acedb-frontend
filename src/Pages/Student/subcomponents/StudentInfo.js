import { Card } from "react-bootstrap"
import { AllStudent } from "./BiodataForm/Data"

function studentInfo() {
    return (
        <Card style={{ marginBottom: "20px" }} className="StudentInfoCard">
            <Card.Body className="StudentInfoWrapper">
                <Card.Text>
                    <div className="StudentInfoTitle">Student Information</div>
                    {AllStudent.map((student) => (
                        <div>
                            <div className="StudentInfoBody">
                                <div className="StudentInfoBodyTile">
                                    Mat No:
                            </div>
                                <div className="StudentInfoBodyTileAns">
                                    {student.matriculationNo}
                                </div>
                            </div>
                            <div className="StudentInfoBody">
                                <div className="StudentInfoBodyTile">
                                    Program:
                            </div>
                                <div className="StudentInfoBodyTileAns">
                                    {student.program}
                                </div>
                            </div>
                            <div className="StudentInfoBody">
                                <div className="StudentInfoBodyTile">
                                    Level:
                            </div>
                                <div className="StudentInfoBodyTileAns">
                                    {student.currentLevel}
                                </div>
                            </div>
                            <div className="StudentInfoBody">
                                <div className="StudentInfoBodyTile">
                                    Type of Education:
                            </div>
                                <div className="StudentInfoBodyTileAns">
                                    {student.typeOfEducation}
                                </div>
                            </div>
                            <div className="StudentInfoBody">
                                <div className="StudentInfoBodyTile">
                                    No of Courses:
                            </div>
                                <div className="StudentInfoBodyTileAns">
                                    {student.noOfCourses}
                                </div>
                            </div>
                            <div className="StudentInfoBody">
                                <div className="StudentInfoBodyTile">
                                    Session:
                            </div>
                                <div className="StudentInfoBodyTileAns">
                                    {student.session}
                                </div>
                            </div>
                            <div className="StudentInfoBody">
                                <div className="StudentInfoBodyTile">
                                    Semester:
                            </div>
                                <div className="StudentInfoBodyTileAns">
                                    {student.semester}
                                </div>
                            </div>
                        </div>
                    ))}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default studentInfo
