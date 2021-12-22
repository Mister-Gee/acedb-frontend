import {Helmet} from 'react-helmet';
import LoginForm from '../components/LoginForm';
import * as Yup from 'yup';
import {useHistory} from 'react-router-dom';
import {useState} from 'react';
import {loginUser} from '../../services/userServices';
import {PopupAlert} from '../components/Alert';
import {getUserRole} from '../../utils/Functions';
import {predefinedUserRole} from '../../utils/enums';

const Login = () => {

    let history = useHistory()
    
    const[showAlert, setShowAlert] = useState(false) 
    const[alertType, setAlertType] = useState("")
    const[message, setMessage] = useState("")
    const[btnState, setBtnState] = useState(false)

    const initialValues = {
        email: '',
        password: ''
    }

    const onSubmit = async (user) => {
        setBtnState(true)
        try{
            let res = await loginUser(user)
            console.log(res)
            const status = res.status
            const data = res.data
            if(status === 200 && data.isValid){
                localStorage.setItem("token", data.token)
                localStorage.setItem("refresh", data.refreshToken)
                localStorage.setItem("webUserId", data.webUserId)
                const userRole = getUserRole()
                if (userRole === predefinedUserRole.superAdmin || userRole === predefinedUserRole.user){
                    setAlertType("success")
                    setMessage("Login Successful")
                    setShowAlert(true)
                    setTimeout(() => {
                        setBtnState(false)
                        history.push({
                            pathname: "/turon-dashboard"
                        })
                    }, 100)
                }
                else{
                    localStorage.clear()
                    setAlertType("danger")
                    setMessage("You are not a Super Admin")
                    setShowAlert(true)
                    setBtnState(false)
                    if(userRole === predefinedUserRole.student){
                        setTimeout(() => {
                            history.push('/student-login')
                        }, 300)
                    }
                    else if(userRole === predefinedUserRole.admin){
                        setTimeout(() => {
                            history.push('/admin-login')
                        }, 300)
                    }
                }     
                
            }
            else{
                setAlertType("danger")
                setMessage("Invalid Email or Password")
                setShowAlert(true)
                setBtnState(false)
            }
        }
        catch(err) {
            setAlertType("danger")
            setMessage("Invalid Email or Password")
            setShowAlert(true)
            setBtnState(false)
        }
    }

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid Email Format").required("Email is required"),
        password: Yup.string().required("Password is required")
    })

    return (
        <>
        <Helmet>
            <title>Login | iEduCare</title>
        </Helmet>
        <div className="content-page">
            <div className="login-section">
                <div className="login" id="super-admin-login">
                    <div className="header">Admin Portal</div>
                    <div className="alert-section">
                        {showAlert && <PopupAlert alertType={alertType} setShowAlert={setShowAlert} message={message}/>}
                    </div>
                    <LoginForm initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} btnState={btnState}/>
                </div>
                <div className="login-footer">Copyright © 2021.  All Rights Reserved - Powered by Turon Technologies Limited </div>
            </div>
        </div>
        </>
    )
}

export default Login
