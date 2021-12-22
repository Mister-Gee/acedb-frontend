import { IoMdLogOut } from 'react-icons/io';
import {NavLink, useHistory} from 'react-router-dom';
import {logoutUser} from '../../../services/userServices';

const SideMenu = () => {

    const history = useHistory()

    const logout = async () => {
        try{
            let res = await logoutUser()
            if(res.status === 200){
                localStorage.clear()
                history.push({
                    pathname: "/"
                })
            }
        }
        catch(err) {
            console.log(err.message)
        }
    }

    return (
        <div className="side-menu">
            <div className="side-menu-content">
                <div className="logo-section">
                    <img src="/assets/images/Turon_Logo.png" alt="logo" />
                    <div className="logo-txt">iEduCare Tech</div>
                </div>
                <div className="nav-links">
                    <ul>
                        <li>
                            <NavLink exact to="/turon-dashboard" > 
                            <span className="iconify" data-icon="zmdi:view-dashboard" data-inline="false"></span>
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                           <NavLink exact to="/institutions" >
                           <span className="iconify" data-icon="gridicons:institution" data-inline="false"></span>
                                Institutions
                           </NavLink> 
                        </li>
                        <li>
                            <NavLink exact to="/user-manager"> 
                            <span className="iconify" data-icon="fluent:patient-32-filled" data-inline="false"></span> 
                                User Manager
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/modules"> 
                            <span className="iconify" data-icon="ion:logo-buffer" data-inline="false"></span> 
                                Modules
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/license-manager"> 
                                <span className="iconify" data-icon="uil:lock-access" data-inline="false"></span> 
                                License Manager
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to="/support">
                            <span className="iconify" data-icon="ant-design:notification-outlined" data-inline="false"></span> Notification
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