import React from 'react'
import { Card} from "react-bootstrap"
import {Data} from "./Data"


function RegisteredCourses() {
    return (
        <Card style={{ marginBottom: "20px" }} className="RegisteredCoursesCard">
            <Card.Body className="">
                <Card.Text>
                    <div className="RegisteredCoursesTitle">My Registered Courses</div>
                    <div className="AccademicstTableWrapper table-wrapper-scroll-y my-custom-scrollbar">
                          <table className="table">
                            <thead className="thead-light">
                            <tr>
                                <th scope="col" width="50">S/N</th>
                                    <th scope="col" width="300">Course Listing</th>
                                    <th scope="col" width="200">Lectural</th>
                                    <th scope="col" width="150">Location Hall</th>
                            </tr>
                            </thead>
                            <tbody>
                                {Data.map((d) => (
                                <tr key={d.sn}>
                                        <td className="TableContentColor">{ d.sn}</td>
                                        <td className="TableContentColor">{d.courseListing}</td>
                                        <td>{d.lectural}</td>
                                        <td>{d.locationHall}</td>
                            </tr> 
                                ))}
                        </tbody>
                    </table>
                    </div>
                  
                </Card.Text>
            </Card.Body>

        </Card>
    )
}

export default RegisteredCourses
