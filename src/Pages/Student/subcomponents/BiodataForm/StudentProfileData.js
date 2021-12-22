import React, { useState, useEffect } from 'react'
import { getStudentProfile } from '../../../../services/StudentServices'
import { AllStudent } from './Data';



function StudentProfileData() {
    const [studentProfile, setStudentProfile] = useState([])

    //GET STUDENT DATA FROM THE LOCAL-STORAGE
    // const StudenProfile = localStorage.getItem('StudenProfile') === 'true';
    // const user = StudenProfile ? localStorage.getItem('user') : '';
    // setStudentProfile({ user, StudenProfile });

    useEffect(() => {
        const fetchStudentProfileData = async (id) => {
            try {
                // const res = await getStudentProfile()
                // setStudentProfile(res.data)
                // let data = res.data
                // let result = data.reverse().slice(0, 5)
                // setRecentInstitution(result)
                // setIsLoading(false)
            }
            catch (err) {
                console.log(err.message)
            }
        }
        fetchStudentProfileData()

    }, [])


    return (
        <div className="NewstudentProfileContainer">
            {AllStudent.map((student) => (
                <div className="NewstudentProfileWrapper">
                    <div className="StudentProfileContainer StudentMargin">
                        <img src="./assets/images/passportPhoto.jpeg" alt="Login Logo" />
                    </div>
                    <div>
                        <ul>
                            <div>Full Name</div>
                            <li>{student.firstName} {student.lastName}</li>
                            <div>Email Address</div>
                            <li>{student.email}</li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <div>Gender</div>
                            <li>{student.gender}</li>
                            <div>Faculty</div>
                            <li>{student.faculty}</li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <div>Course of Study</div>
                            <li>{student.courseOfStudy}</li>
                            <div>Martric No</div>
                            <li>{student.matriculationNo}</li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <div>Current Level</div>
                            <li>{student.currentLevel}</li>
                            <div>Department</div>
                            <li>{student.department}</li>
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default StudentProfileData
