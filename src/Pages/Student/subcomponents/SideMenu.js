import { NavLink, Link } from 'react-router-dom';
import CloseIcon from './CloseIcon';


const SideMenu = ({ open, CloseMenu }) => {


    return (
        <div className={open ? "side-menu side-menuOpen" : "side-menu side-menuClose"} >
            <div className="side-menu-content">
                <div className="logo-section">
                    <img style={{ margin: "0", padding: "0" }} src="/assets/images/IeducareLogo1(1).png" alt="logo" />
                    <div ><img style={{ width: "120%", marginTop: "10px" }} src="/assets/images/Vector(3).png" alt="logo" /></div>
                    <div><button className="CloseButtonBody" onClick={CloseMenu}><CloseIcon /></button></div>
                </div>
                <div className="studentInfoContainer">
                    <div className="studentInfoNameContainer">
                        <span className="studentInfoName" >KA</span>
                    </div>
                    <div className="studentInfoFullName" >Kazeem Erinfolami</div>
                </div>
                <div className="nav-links">
                    <ul>
                        <li>
                            <NavLink exact to="/mydashboard" >
                                <span className="iconify" data-icon="zmdi:view-dashboard" data-inline="false"></span>
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/student-profile">
                                <span className="iconify" data-icon="fluent:patient-32-filled" data-inline="false"></span>
                                Student Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/finances" >
                                <span className="iconify" data-icon="mdi:finance" data-inline="false"></span>
                                Finance
                           </NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/academics">
                                <span className="iconify" data-icon="mdi:google-classroom" data-inline="false"></span>
                                Academics
                            </NavLink>
                        </li>
                        <li>
                            <Link exact to="#">
                                <span className="iconify" data-icon="bx:bx-spreadsheet" data-inline="false"></span>
                                Results
                            </Link>
                        </li>
                        {/* <li>
                            <Link exact to="#">
                            <span className="iconify" data-icon="heroicons-outline:document-report" data-inline="false"></span>
                                Reports
                            </Link>
                        </li> */}
                        <li>
                            <Link exact to="#">
                                <span className="iconify" data-icon="codicon:request-changes" data-inline="false"></span>
                                Request
                            </Link>
                        </li>
                        <li>
                            <Link exact to="#">
                                <span className="iconify" data-icon="ant-design:notification-outlined" data-inline="false"></span> Notification
                            </Link>
                        </li>
                        <li>
                            <Link exact to="#">
                                <span className="iconify" data-icon="ic:baseline-support-agent" data-inline="false"></span>Support
                            </Link>
                        </li>
                        <li>
                            <NavLink exact to="/student-login" style={{ marginBottom: "30px" }}>
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