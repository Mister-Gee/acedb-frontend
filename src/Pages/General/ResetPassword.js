import { Helmet } from 'react-helmet';
import ResetPasswordForm from '../components/ResetPasswordForm';
import { useState } from 'react';
import * as Yup from 'yup';
import {resetPassword} from '../../services/userServices';
import {PopupAlert} from '../components/Alert';
import { useParams } from 'react-router-dom';


const ResetPassword = () => {
    const[btnState, setBtnState] = useState(false)
    const[alertType, setAlertType] = useState("")
    const[alertMsg, setAlertMsg] = useState("")
    const[alertNotification, setAlertNotification] = useState(false)

    const {code} = useParams()

    const initialValues = {
        email: '',
        password: '',
        confirmPassword: '',
        code: code
    }

    const onSubmit = async (val) => {
        console.log(val)
        setBtnState(true)
        try{
            const res = await resetPassword(val)
            const status = res.status
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
        email: Yup.string().email("Invalid Email Format").required("Email is required"),
        password: Yup.string().required("Password is Required"),
        confirmPassword: Yup.string().required("Confirm Password is Required")
    })

    return (
        <>
            <Helmet>
                <title>Reset Password | Adeyemi College of Education</title>
            </Helmet>
            <div className="content-page">
                <div className="login-section">
                    <div className="login2" >
                        <div style={{ textAlign: "center" }}>
                        {alertNotification && <PopupAlert alertType={alertType} setShowAlert={setAlertNotification} message={alertMsg} />}

                            <div>
                                <div className="header-forgotten-password" style={{ marginBottom: "20px" }}>Reset Password</div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <ResetPasswordForm initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} btnState={btnState} />
                            </div>
                        </div>

                    </div>
                    <div className="login-footer">Copyright © 2021.  All Rights Reserved - Powered by Adeyemi College of Education </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword