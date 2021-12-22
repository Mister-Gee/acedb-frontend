import React, { useState } from 'react'
import LoginForm from '../components/LoginForm';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import WelcomeNote from './WelcomeNote';
import { getUserRole } from '../../utils/Functions';
import { predefinedUserRole } from '../../utils/enums';
import { getStudentLogin } from "../../services/StudentServices"


function StudentLoginForm() {

    let history = useHistory()

    const [showAlert, setShowAlert] = useState(false)
    const [alertType, setAlertType] = useState("")
    const [message, setMessage] = useState("")
    const [btnState, setBtnState] = useState(false)

    const initialValues = {
        email: '',
        password: ''
    }

    const onSubmit = async (user) => {
        setBtnState(true)
        try {
            let res = await getStudentLogin(user)
            const status = res.status
            const data = res.data
            if (status === 200 && data.isValid) {
                history.push({
                    pathname: "/mydashboard"
                })
            }
        }
        catch (err) {
            setBtnState(false)
            console.log("RES", err)
        }
    }

    // const onSubmit = async (user) => {
    //     setBtnState(true)
    //     try {
    //         let res = await getStudentLogin(user)
    //         const status = res.status
    //         const data = res.data
    //         if (status === 200 && data.isValid) {
    //             localStorage.setItem("token", data.token)
    //             localStorage.setItem("refresh", data.refreshToken)
    //             localStorage.setItem("webUserId", data.webUserId)
    //             const userRole = getUserRole()
    //             if (userRole === predefinedUserRole.student) {
    //                 setAlertType("success")
    //                 setMessage("Login Successful")
    //                 setShowAlert(true)
    //                 setTimeout(() => {
    //                     setBtnState(false)
    //                     history.push({
    //                         pathname: "/mydashboard"
    //                     })
    //                 }, 100)
    //             }
    //             else {
    //                 localStorage.clear()
    //                 setAlertType("danger")
    //                 setMessage("You are not a Student")
    //                 setShowAlert(true)
    //                 setBtnState(false)
    //                 if (userRole === predefinedUserRole.superAdmin) {
    //                     setTimeout(() => {
    //                         history.push('/')
    //                     }, 300)
    //                 }
    //                 else if (userRole === predefinedUserRole.admin) {
    //                     setTimeout(() => {
    //                         history.push('/admin-login')
    //                     }, 300)
    //                 }
    //             }
    //         }
    //         else {
    //             setAlertType("danger")
    //             setMessage("Invalid Email or Password")
    //             setShowAlert(true)
    //             setBtnState(false)
    //         }
    //     }
    //     catch (err) {
    //         setAlertType("danger")
    //         setMessage("Invalid Email or Password")
    //         setShowAlert(true)
    //         setBtnState(false)
    //     }
    // }

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid Email Format").required("Email is required"),
        password: Yup.string().required("Password is required")
    })


    return (
        <div className="StudentLoginForm-container">
            <div className="StudentLoginForm-wrapper">
                <WelcomeNote />
                <div className="StudentLoginForm-Form-input-container">
                    <div>
                        <div className="">
                            <div className="StudentLoginForm-Form-input-Wrapper">
                                <div>
                                    <div className="StudentLoginForm-Form-input-content-Wrapper">
                                        <div style={{ marginTop: "20%", marginBottom: "30%" }}>
                                            <div>
                                                <img src="./assets/images/IeducareLogo2.png" alt="student-login-logo" />
                                            </div>
                                            <div className="StudentLoginForm-Form-icon-text">Student Portal</div>
                                            <div id="StudentLoginForm-Login-Form-input-container">
                                                <LoginForm initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} btnState={btnState} />
                                            </div>

                                        </div>
                                        <footer className="StudentLoginForm-Form-input-footer">Copyright © 2021.  All Rights Reserved - Powered by Turon Technologies Limited</footer>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentLoginForm
