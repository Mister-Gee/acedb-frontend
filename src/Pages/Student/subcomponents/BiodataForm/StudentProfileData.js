import React, { useState, useEffect } from 'react'
import {userDetails} from '../../../../services/userServices';
import ContentLoader from '../../../components/ContentLoader';


function StudentProfileData() {
    const [studentProfile, setStudentProfile] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { REACT_APP_ACE_URL } = process.env;


    useEffect(() => {
        const fetchStudentProfileData = async (id) => {
            setIsLoading(true)
            try {
                const res = await userDetails()
                setStudentProfile(res.data)
                
            }
            catch (err) {
                console.log(err.message)
            }
            setIsLoading(false)
        }
        fetchStudentProfileData()
    }, [])


    return (
        isLoading ?
        <ContentLoader />
        :
        <div className="NewstudentProfileContainer">
                <div className="NewstudentProfileWrapper">
                    <div className="StudentProfileContainer StudentMargin">
                        
                        <img src={studentProfile.userImageURL ? REACT_APP_ACE_URL + "/" + studentProfile.userImageURL : "./assets/images/passportPhoto.png"} alt="Login Logo" />
                        
                    </div>
                    <div>
                        <ul>
                            <div>Full Name</div>
                            <li>{studentProfile.lastName} {studentProfile.firstName}</li>
                            <div>Email Address</div>
                            <li>{studentProfile.email}</li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <div>Gender</div>
                            <li>{studentProfile.gender ? studentProfile.gender : "-"}</li>
                            <div>School</div>
                            <li>{studentProfile.school ? studentProfile.school : "-"}</li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <div>Program</div>
                            <li>{studentProfile.programme ? studentProfile.programme : "-"}</li>
                            <div>Martric No</div>
                            <li>{studentProfile.matricNumber ? studentProfile.matricNumber : "-"}</li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <div>Current Level</div>
                            <li>{studentProfile.currentLevel ? studentProfile.currentLevel : "-"}</li>
                            <div>Department</div>
                            <li>{studentProfile.department ? studentProfile.department : "-"}</li>
                        </ul>
                    </div>
                </div>
        </div>
    )
}

export default StudentProfileData
