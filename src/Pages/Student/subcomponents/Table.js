import React, {useEffect} from 'react'
import { Card} from "react-bootstrap"
import {getStudentRegCourses} from "../../../services/courseServices";
import {useState} from "@hookstate/core";
import store from '../../../store/store';


function RegisteredCourses() {
    const [regCourses, setRegCourses] = React.useState([])

    const {userId} = useState(store)

    useEffect(() => {
        try{
            const fetch = async () => {
                const res = await getStudentRegCourses(userId.get())
                setRegCourses(res.data)
                console.log(regCourses)
            }
            fetch()
        }
        catch(err){
            console.log(err)
        }
    }
    ,[])
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
                                    <th scope="col" width="300">Course</th>
                                    <th scope="col" width="200">Unit</th>
                                    <th scope="col" width="150">Semester</th>
                            </tr>
                            </thead>
                            <tbody>
                                {regCourses.map((data, index) => (
                                <tr key={data.id}>
                                        <td className="TableContentColor">{ index + 1}</td>
                                        <td className="TableContentColor">{data.courseID}</td>
                                        <td>{data.courseUnit}</td>
                                        <td>{data.semesterId}</td>
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
