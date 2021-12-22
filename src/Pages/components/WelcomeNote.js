import React from 'react'

function WelcomeNote() {
    return (
        <div className="StudentLoginForm-Welcome-container">
            <div className="StudentLoginForm-Welcome-wrapper">
                <div className="StudentLoginForm-Welcome">
                    <div><img src="./assets/images/IeducareLogo1.png" alt="student-login-logo" className="StudentLoginForm-Logo-Img" /> <img src="./assets/images/Vector(2).png" alt="student-login-logo" className="" /></div>
                    <div className="StudentLoginForm-Welcome-content">We welcome you to our association and provide you the new curriculum details for your best studies. We look forward to best results from you and a good association of studies with you. </div>
                </div>
            </div>
            <div className="StudentLoginForm-bottom-img-wrapper">
                <div><img src="./assets/images/student.png" alt="UniLogo" className="StudentLoginForm-bottom-Student-img" /></div>
                <div><img src="./assets/images/student-logo.png" alt="UniLogo" className="StudentLoginForm-bottom-img" /></div>
            </div>
        </div>
    )
}

export default WelcomeNote
