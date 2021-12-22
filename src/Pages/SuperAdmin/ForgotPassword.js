import { Helmet } from 'react-helmet';
import ForgotPasswordForm from '../components/ForgotPasswordForm'

const ForgotPassword = () => {
    return (
        <>
            <Helmet>
                <title>Forgot Password | iEduCare</title>
            </Helmet>
            <div className="content-page">
                <div className="login-section">
                    <div className="login2" >
                        <div style={{ textAlign: "center" }}>
                            <div>
                                <div className="header-forgotten-password" style={{ marginBottom: "20px" }}>Forgot Password</div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <ForgotPasswordForm />
                            </div>
                        </div>

                    </div>
                    <div className="login-footer">Copyright © 2021.  All Rights Reserved - Powered by Turon Technologies Limited </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword
