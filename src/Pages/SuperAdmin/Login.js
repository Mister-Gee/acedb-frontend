import {Helmet} from 'react-helmet';
import LoginForm from '../components/LoginForm';
import * as Yup from 'yup';
import {useHistory} from 'react-router-dom';
import React, {useEffect} from 'react';
import {loginUser} from '../../services/userServices';
import {PopupAlert} from '../components/Alert';
import {getTokenFromLocalStorage, getUserRole} from '../../utils/Functions';
import {predefinedUserRole} from '../../utils/enums';
import { useState } from '@hookstate/core';
import store from '../../store/store';
import { motion } from 'framer-motion';
import {Container, Row, Col} from 'react-bootstrap';


const Login = () => {

    let history = useHistory()

    const {role} = useState(store)
    const {alertType} = useState(store)
    const {alertNotification} = useState(store)
    const {alertMessage} = useState(store)
    const {firstName} = useState(store)
    const {lastName} = useState(store)
    const {phoneNumber} = useState(store)
    const {email} = useState(store)
    const {userId} = useState(store)
    const {deptID} = useState(store)
    
    useEffect(() => {
        try{
            const isLoggedIn = async () => {
                const token = getTokenFromLocalStorage()
                if(token){
                    const userRole = getUserRole(token)
                    role.set(userRole)
                    if (userRole === predefinedUserRole.student){
                        history.push({
                            pathname: "/mydashboard"
                        })
                    }
                    else {
                        history.push({
                            pathname: "/dashboard"
                        })
                    }
                }
            }
            isLoggedIn()
        }
        catch(err){
            console.log(err)
        }
    }, [])
    
    const[btnState, setBtnState] = React.useState(false)

    const initialValues = {
        userId: '',
        password: ''
    }

    const onSubmit = async (user) => {
        setBtnState(true)
        try{
            const res = await loginUser(user)
            const status = res.status
            const data = res.data
            if(status === 200){
                localStorage.setItem("token", data.token)
                role.set(data.role)
                userId.set(data.userID)
                firstName.set(data.firstName)
                lastName.set(data.lastName)
                phoneNumber.set(data.phoneNumber)
                email.set(data.email)
                deptID.set(data.departmentID)
                alertType.set("success")
                alertMessage.set("Login Successful")
                alertNotification.set(true)
                if (data.role === predefinedUserRole.student){
                    setTimeout(() => {
                        setBtnState(false)
                        alertNotification.set(false)
                        history.push({
                            pathname: "/mydashboard"
                        })
                    }, 1000)
                }
                else {
                    setTimeout(() => {
                        setBtnState(false)
                        alertNotification.set(false)
                        history.push({
                            pathname: "/dashboard"
                        })
                    }, 1000)
                }
                
            }
            else{
                setBtnState(false)
                alertType.set("danger")
                alertMessage.set("Invalid Email or Password")
                alertNotification.set(true)
            }
        }
        catch(err) {
            setBtnState(false)
            alertType.set("danger")
            alertMessage.set("Invalid Email or Password")
            alertNotification.set(true)
        }
    }

    const validationSchema = Yup.object({
        userId: Yup.string().email("Invalid Email Format").required("Student Email is required"),
        password: Yup.string().required("Password is required")
    })

    return (
        <>
            <Helmet>
                <title>Login | Adeyemi College Of Education</title>
            </Helmet>
            <div className="content-page admin">
                <Container>
                    <Row>
                    <Col lg={6}>
                            <motion.div 
                                className="uni-landing"
                                initial={{x: 800}}
                                animate={{x: 0}}
                                transition={{duration: 1.5, delay: 0.5}}
                            >
                                <div className="uni-logo-section">
                                    <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", }}>
                                        <img src="./assets/images/logo.png" style={{ width: "15%", marginTop: "30px" }} alt="Logo" />
                                        <div className="logo-txt">Adeyemi College of Education</div>
                                        {/* <div style={{ width: "100%" }} className="uni-name"><img style={{ width: "20%", margin: "0" }} src="./assets/images/Vector(2).png" alt="Login Logo" /></div> */}
                                    </div>
                                </div>
                                <div className="login-img">
                                    <img src="./assets/images/login-img.png" alt="Login" />
                                </div>
                            </motion.div>
                        </Col>
                        <Col lg={6}>
                            <motion.div 
                                className="sch-admin" 
                                id="sch-admin"
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{duration: 2.5, delay: 1.5}}
                            >
                                <div className="admin-login">
                                    <div className="header">Login</div>
                                    {alertNotification.get() && <PopupAlert alertType={alertType.get()} setShowAlert={alertNotification.set} message={alertMessage.get()} />}
                                    <LoginForm initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} btnState={btnState} />
                                </div>
                                <div className="login-footer">Copyright © 2021.  All Rights Reserved - Powered by Adeyemi College of Education </div>
                            </motion.div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Login
