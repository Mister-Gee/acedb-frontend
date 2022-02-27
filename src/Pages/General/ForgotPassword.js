import { Helmet } from 'react-helmet';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import { useState } from 'react';
import * as Yup from 'yup';
import {forgetPassword} from '../../services/userServices';
import {PopupAlert} from '../components/Alert';


const ForgotPassword = () => {
    const[btnState, setBtnState] = useState(false)
    const[alertType, setAlertType] = useState("")
    const[alertMsg, setAlertMsg] = useState("")
    const[alertNotification, setAlertNotification] = useState(false)



    const initialValues = {
        username: ''
    }

    const onSubmit = async (val) => {
        setBtnState(true)
        try{
            const res = await forgetPassword(val.username)
            const status = res.status
            console.log(res)
            if(status === 200){
                setAlertType("success")
                setAlertMsg("Successful, Kindly Check your mail for Password Reset Link")
                setAlertNotification(true)
            }
            else{
                setBtnState(false)
                setAlertType("danger")
                setAlertMsg(res.data.message)
                setAlertNotification(true)
            }
        }
        catch(err) {
            setBtnState(false)
            setAlertType("danger")
            setAlertMsg(err.response.data.message)
            setAlertNotification(true)
        }
    }

    const validationSchema = Yup.object({
        username: Yup.string().email("Invalid Email Format").required("Email is required")
    })

    return (
        <>
            <Helmet>
                <title>Forgot Password | Adeyemi College of Education</title>
            </Helmet>
            <div className="content-page">
                <div className="login-section">
                    <div className="login2" >
                        <div style={{ textAlign: "center" }}>
                        {alertNotification && <PopupAlert alertType={alertType} setShowAlert={setAlertNotification} message={alertMsg} />}

                            <div>
                                <div className="header-forgotten-password" style={{ marginBottom: "20px" }}>Forgot Password</div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <ForgotPasswordForm initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} btnState={btnState} />
                            </div>
                        </div>

                    </div>
                    <div className="login-footer">Copyright © 2021.  All Rights Reserved - Powered by Adeyemi College of Education </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword