import { Container, Col, Row } from 'react-bootstrap';
import AdminLoginForm from '../components/AdminLoginForm';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../../services/userServices';
import { PopupAlert } from '../components/Alert';
import { useState } from 'react';
import { getUserRole } from '../../utils/Functions';
import { predefinedUserRole } from '../../utils/enums';

const AdminLogin = () => {

    const [showAlert, setShowAlert] = useState(false)
    const [alertType, setAlertType] = useState("")
    const [message, setMessage] = useState("")
    const [btnState, setBtnState] = useState(false)

    let history = useHistory()

    const initialValues = {
        email: '',
        password: ''
    }

    const onSubmit = async (user) => {
        setBtnState(true)
        try {
            let res = await loginUser(user)
            const status = res.status
            const data = res.data
            if (status === 200 && data.isValid) {
                localStorage.setItem("token", data.token)
                localStorage.setItem("refresh", data.refreshToken)
                localStorage.setItem("webUserId", data.webUserId)
                localStorage.setItem("institutionId", data.institutionId)
                const userRole = getUserRole()
                if (userRole === predefinedUserRole.admin) {
                    setAlertType("success")
                    setMessage("Login Successful")
                    setShowAlert(true)
                    setTimeout(() => {
                        setBtnState(false)
                        history.push('/dashboard')
                    }, 100)
                }
                else {
                    localStorage.clear()
                    setAlertType("danger")
                    setMessage("You are not an Institutional Admin")
                    setShowAlert(true)
                    setBtnState(false)
                    if (userRole === predefinedUserRole.student) {
                        setTimeout(() => {
                            history.push('/student-login')
                        }, 300)
                    }
                    else if (userRole === predefinedUserRole.user || userRole === predefinedUserRole.superAdmin) {
                        setTimeout(() => {
                            history.push('/')
                        }, 300)
                    }
                }
            }
            else {
                setAlertType("danger")
                setMessage("Invalid Username or Password")
                setShowAlert(true)
                setBtnState(false)
            }
        }
        catch (err) {
            setAlertType("danger")
            setMessage("Invalid Username or Password")
            setShowAlert(true)
            setBtnState(false)
        }

    }

    const validationSchema = Yup.object({
        email: Yup.string().required("Username is required"),
        password: Yup.string().required("Password is required")
    })


    return (
        <>
            <Helmet>
                <title>Admin Login | iEduCare</title>
            </Helmet>
            <div className="content-page admin">
                <Container>
                    <Row>
                        <Col lg={6}>
                            <motion.div 
                                className="sch-admin" 
                                id="sch-admin"
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{duration: 1.5, delay: 0.5}}
                            >
                                <div className="admin-login">
                                    <div className="header">Admin Portal</div>
                                    {showAlert && <PopupAlert alertType={alertType} setShowAlert={setShowAlert} message={message} />}
                                    <AdminLoginForm initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} btnState={btnState} />
                                </div>
                                <div className="login-footer">Copyright © 2021.  All Rights Reserved - Powered by Turon Technologies Limited </div>
                            </motion.div>
                        </Col>
                        <Col lg={6}>
                            <motion.div 
                                className="uni-landing"
                                initial={{x: -700}}
                                animate={{x: 0}}
                                transition={{duration: 1.5, delay: 0.5}}
                            >
                                <div className="uni-logo-section">
                                    <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", }}>
                                        <img src="./assets/images/IeducareLogo1.png" style={{ width: "15%", marginTop: "30px" }} alt="Login Logo" />
                                        <div style={{ width: "100%" }} className="uni-name"><img style={{ width: "20%", margin: "0" }} src="./assets/images/Vector(2).png" alt="Login Logo" /></div>
                                    </div>
                                </div>
                                <div className="login-img">
                                    <img src="./assets/images/login-img.png" alt="Login" />
                                </div>
                            </motion.div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default AdminLogin