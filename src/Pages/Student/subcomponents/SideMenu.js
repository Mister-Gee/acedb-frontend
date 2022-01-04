import { NavLink, Link } from 'react-router-dom';
import CloseIcon from './CloseIcon';
import store from '../../../store/store';
import { useState } from '@hookstate/core';
import {useHistory} from 'react-router-dom';


const SideMenu = ({ open, CloseMenu }) => {

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



    const logout = () => {
        localStorage.removeItem("token")
        role.set("")
        firstName.set("")
        lastName.set("")
        phoneNumber.set("")
        email.set("")
        userId.set("")
        alertType.set("success")
        alertMessage.set("Logout Successful")
        alertNotification.set(true)
        setTimeout(() => {
            alertNotification.set(false)
            history.push({
                pathname: "/"
            })
        }, 1000)
    }

    return (
        <div className={open ? "side-menu side-menuOpen" : "side-menu side-menuClose"} >
            <div className="side-menu-content">
                <div className="logo-section">
                    <img style={{ margin: "0", padding: "0" }} src="/assets/images/logo.png" alt="logo" />
                    <div className='sidemenu-header-text'>ACE</div>
                    <div><button className="CloseButtonBody" onClick={CloseMenu}><CloseIcon /></button></div>
                </div>
                <div className="studentInfoContainer">
                    <div className="studentInfoNameContainer">
                        <span className="studentInfoName" >{lastName.get().charAt(0).toUpperCase()}{firstName.get().charAt(0).toUpperCase()}</span>
                    </div>
                    <div className="studentInfoFullName" >{lastName.get() + " " + firstName.get()}</div>
                </div>
                <div className="nav-links">
                    <ul>
                        <li>
                            <NavLink  to="/mydashboard" >
                                <span className="iconify" data-icon="zmdi:view-dashboard" data-inline="false"></span>
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink  to="/student-profile">
                                <span className="iconify" data-icon="fluent:patient-32-filled" data-inline="false"></span>
                                Student Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink  to="/courses" >
                                <span className="iconify" data-icon="akar-icons:book" data-inline="false"></span>
                                Courses
                           </NavLink>
                        </li>
                        <li>
                            <NavLink  to="/attendance" >
                                <span className="iconify" data-icon="mdi:notebook-check-outline" data-inline="false"></span>
                                Attendance
                           </NavLink>
                        </li>
                        <li>
                            <Link  to="/timetable">
                                <span className="iconify" data-icon="bx:bx-spreadsheet" data-inline="false"></span>
                                Exam TimeTable
                            </Link>
                        </li>
                        <li>
                            <Link  to="#">
                            <span className="iconify" data-icon="heroicons-outline:document-report" data-inline="false"></span>
                                Result
                            </Link>
                        </li>
                        <li>
                            <Link  to="#">
                                <span className="iconify" data-icon="ant-design:notification-outlined" data-inline="false"></span> Annoucements
                            </Link>
                        </li>
                        <li>
                            <Link to="#">
                                <span className="iconify" data-icon="ic:baseline-support-agent" data-inline="false"></span>Complaints
                            </Link>
                        </li>
                        <li>
                            <Link to="#" style={{ marginBottom: "30px" }} onClick={logout}>
                                <span className="iconify" data-icon="ls:logout" data-inline="false"></span>
                                Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SideMenu;