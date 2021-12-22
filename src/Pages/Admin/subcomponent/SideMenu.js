import {NavLink, Link, useHistory} from 'react-router-dom';
import {instance} from '../../../services/httpService';
import {Up, Down} from './DropdownIcons';
import {useState} from 'react';

const SideMenu = () => {

    const history = useHistory()

    const [academicDropdownState, setAcademicDropdownState] = useState(false)
    const [staffDropdownState, setStaffDropdownState] = useState(false)

    const handleAcademicDropdown = () => {
        setAcademicDropdownState(!academicDropdownState)
    }

    const handleStaffDropdown = () => {
        setStaffDropdownState(!staffDropdownState)
    }

    const logout = () => {
        instance.post("/api/sme/authentication/logout")
        .then(res => {
            if(res.status === 200){
                localStorage.clear()
                history.push({
                    pathname: "/"
                })
            }
        })
        .catch(err => console.log(err.message))
    }

    return (
        <div className="side-menu">
            <div className="side-menu-content">
                <div className="logo-section">
                    <img src="/assets/images/Turon_Logo.png" alt="logo" />
                    <div className="logo-txt">iEduCare Tech</div>
                </div>
                <div className="nav-links admin-links">
                    <ul>
                        <li>
                            <NavLink exact to="/dashboard" > 
                            <span className="iconify" data-icon="zmdi:view-dashboard" data-inline="false"></span>
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                           <NavLink exact to="/registration" >
                           <span className="iconify" data-icon="ic:sharp-app-registration" data-inline="false"></span>
                                Registration 
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
                                        <li><NavLink exact to="/faculty-management"> Faculty Management </NavLink></li>
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
                        <li>
                            <NavLink exact to="/financials">
                                <span className="iconify" data-icon="mdi:bank-outline" data-inline="false"></span> 
                                Financials
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/results-management"> 
                            <span className="iconify" data-icon="foundation:results-demographics" data-inline="false"></span> 
                                Results Management
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/hostel-management"> 
                                <span className="iconify" data-icon="whh:legacyfilemanager" data-inline="false"></span> 
                                Hostel Management 
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/transport-management">
                            <span className="iconify" data-icon="whh:legacyfilemanager" data-inline="false"></span> Transport Management
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/results-management"> 
                            <span className="iconify" data-icon="ant-design:notification-outlined" data-inline="false"></span> 
                            Announcement 
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/hostel-management"> 
                                <span className="iconify" data-icon="ic:outline-notifications-active" data-inline="false"></span> 
                                Request 
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/transport-management">
                            <span className="iconify" data-icon="ic:baseline-support-agent" data-inline="false"></span> Support
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