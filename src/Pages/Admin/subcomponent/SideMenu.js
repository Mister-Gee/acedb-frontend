import {NavLink, Link, useHistory} from 'react-router-dom';
import {Up, Down} from './DropdownIcons';
import React from 'react';
import store from '../../../store/store';
import { useState } from '@hookstate/core';

const SideMenu = () => {

    const history = useHistory()

    const [academicDropdownState, setAcademicDropdownState] = React.useState(false)
    const [staffDropdownState, setStaffDropdownState] = React.useState(false)

    const handleAcademicDropdown = () => {
        setAcademicDropdownState(!academicDropdownState)
    }

    const handleStaffDropdown = () => {
        setStaffDropdownState(!staffDropdownState)
    }

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
        <div className="side-menu">
            <div className="side-menu-content">
                <div className="logo-section">
                    <img src="/assets/images/logo.png" alt="logo" />
                    <div className='sidemenu-header-text'>ACE</div>
                </div>
                <div className="nav-links admin-links">
                    <ul>
                        <li>
                            <NavLink exact to="/dashboard" > 
                            <span className="iconify" data-icon="zmdi:view-dashboard" data-inline="false"></span>
                                Dashboard
                            </NavLink>
                        </li>
                        {/* <li>
                           <NavLink exact to="/registration" >
                           <span className="iconify" data-icon="ic:sharp-app-registration" data-inline="false"></span>
                                Registration 
                           </NavLink> 
                        </li> */}
                        <li>
                            <Link onClick={handleAcademicDropdown}> 
                            <span className="iconify" data-icon="majesticons:academic-cap-line" data-inline="false"></span> 
                                Academics {academicDropdownState ? <Down /> : <Up />}

                                {academicDropdownState ? 
                                    <ul className="dropdown-item-menu border-left">
                                        <li ><NavLink exact to="/session-management"> Session Management </NavLink></li>
                                        <li><NavLink exact to="/school-management"> School Management </NavLink></li>
                                        {/* <li><NavLink exact to="/faculty-management"> Faculty Management </NavLink></li> */}
                                        <li><NavLink exact to="/dept-management"> Department Management </NavLink></li>
                                        <li><NavLink exact to="/program-management"> Program Management </NavLink></li>
                                        <li><NavLink exact to="/program-levels"> Program Levels </NavLink></li>
                                        <li><NavLink exact to="/course-grades"> Course Grades </NavLink></li>
                                        <li><NavLink exact to="/course-management"> Course Management </NavLink></li>
                                    </ul>
                                    :
                                    ""
                                }

                            </Link>
                        </li>
                        <li>
                            <NavLink exact to="/student-management"> 
                            <span className="iconify" data-icon="la:user-graduate" data-inline="false"></span> 
                                Student Management 
                            </NavLink>
                        </li>
                        <li>
                            <Link onClick={handleStaffDropdown}> 
                                <span className="iconify" data-icon="la:users-cog" data-inline="false"></span> 
                                Staff Management {staffDropdownState ? <Down positionClass="staff-dropdown-icon"/> : <Up positionClass="staff-dropdown-icon"/>}
                                {staffDropdownState ? 
                                    <ul className="dropdown-item-menu border-left">
                                        <li><NavLink exact to="/all-staff"> All Staff </NavLink></li>
                                        {/* <li><NavLink exact to="/roles"> Roles </NavLink></li> */}
                                        <li><NavLink exact to="/designation"> Designation </NavLink></li>
                                    </ul>
                                    :
                                    ""
                                }
                            </Link>
                        </li>
                        <li>
                            <NavLink exact to="/lecture-management">
                            <span className="iconify" data-icon="clarity:directory-outline-badged" data-inline="false"></span> Lecture Management
                            </NavLink>
                        </li>
                        {/* <li>
                            <NavLink exact to="/financials">
                                <span className="iconify" data-icon="mdi:bank-outline" data-inline="false"></span> 
                                Financials
                            </NavLink>
                        </li> */}
                        <li>
                            <NavLink exact to="/results-management"> 
                            <span className="iconify" data-icon="foundation:results-demographics" data-inline="false"></span> 
                                Results Management
                            </NavLink>
                        </li>
                        {/* <li>
                            <NavLink exact to="/hostel-management"> 
                                <span className="iconify" data-icon="whh:legacyfilemanager" data-inline="false"></span> 
                                Hostel Management 
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/transport-management">
                            <span className="iconify" data-icon="whh:legacyfilemanager" data-inline="false"></span> Transport Management
                            </NavLink>
                        </li> */}
                        <li>
                            <NavLink exact to="#"> 
                            <span className="iconify" data-icon="ant-design:notification-outlined" data-inline="false"></span> 
                            Announcement 
                            </NavLink>
                        </li>
                        {/* <li>
                            <NavLink exact to="/hostel-management"> 
                                <span className="iconify" data-icon="ic:outline-notifications-active" data-inline="false"></span> 
                                Request 
                            </NavLink>
                        </li> */}
                        <li>
                            <NavLink exact to="">
                            <span className="iconify" data-icon="ic:baseline-support-agent" data-inline="false"></span> Complaints
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/logout" onClick={logout}>
                                <span className="iconify" data-icon="ls:logout" data-inline="false"></span> 
                                Logout
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SideMenu;