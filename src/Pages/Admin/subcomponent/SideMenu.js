import {NavLink, Link, useHistory} from 'react-router-dom';
import {Up, Down} from './DropdownIcons';
import React from 'react';
import store from '../../../store/store';
import { useState } from '@hookstate/core';
import { predefinedUserRole } from '../../../utils/enums';

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
                <div className="nav-links">
                    <ul>
                        {role.get().includes(predefinedUserRole.mis) &&
                            <>
                            <li>
                                <NavLink exact to="/dashboard" > 
                                <span className="iconify" data-icon="zmdi:view-dashboard" data-inline="false"></span>
                                    Dashboard
                                </NavLink>
                            </li>
                            <li>
                            <Link onClick={handleAcademicDropdown}> 
                            <span className="iconify" data-icon="majesticons:academic-cap-line" data-inline="false"></span> 
                                Academics {academicDropdownState ? <Down /> : <Up />}

                                {academicDropdownState ? 
                                    <ul className="dropdown-item-menu border-left">
                                        <li ><NavLink exact to="/session-management"> Session Management </NavLink></li>
                                        <li><NavLink exact to="/school-management"> School Management </NavLink></li>
                                        {/* <li><NavLink exact to="/role-management"> Role Management </NavLink></li> */}
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
                        </>
                        }
                        {role.get().includes(predefinedUserRole.mis) || role.get().includes(predefinedUserRole.cafe) ?
                        <>
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
                                        {role.get().includes(predefinedUserRole.mis) &&
                                        <li><NavLink exact to="/roles"> Roles </NavLink></li>
                                        }
                                    </ul>
                                    :
                                    ""
                                }
                            </Link>
                        </li>
                        </>
                        :
                        ""
                        }
                        {role.get().includes(predefinedUserRole.lecturer) &&
                        <li>
                            <NavLink exact to="/lecture-management">
                            <span className="iconify" data-icon="clarity:directory-outline-badged" data-inline="false"></span> Lecture Management
                            </NavLink>
                        </li>
                        }
                        {role.get().includes(predefinedUserRole.er) &&
                        <>
                        <li>
                            <NavLink exact to="/exam-management">
                                <span className="iconify" data-icon="healthicons:i-exam-qualification" data-inline="false"></span> 
                                Exam Management
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/exam-attendance">
                                <span className="iconify" data-icon="healthicons:i-note-action" data-inline="false"></span> 
                                Exam Attendance
                            </NavLink>
                        </li>
                        </>
                        }
                        {role.get().includes(predefinedUserRole.security) || role.get().includes(predefinedUserRole.mis) ?
                        <li>
                            <NavLink exact to="/flag-management"> 
                            <span className="iconify" data-icon="ci:flag-fill" data-inline="false"></span> 
                                Flag Management
                            </NavLink>
                        </li>
                        :
                        ""
                        }
                        {role.get().includes(predefinedUserRole.health) &&
                        <li>
                            <NavLink exact to="/health-management"> 
                                <span className="iconify" data-icon="ic:baseline-health-and-safety" data-inline="false"></span> 
                                Health Management 
                            </NavLink>
                        </li>
                        }
                        {/* <li>
                            <NavLink exact to="#"> 
                            <span className="iconify" data-icon="ant-design:notification-outlined" data-inline="false"></span> 
                            Announcement 
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to="">
                                <span className="iconify" data-icon="ic:baseline-support-agent" data-inline="false"></span> Complaints
                            </NavLink>
                        </li> */}
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