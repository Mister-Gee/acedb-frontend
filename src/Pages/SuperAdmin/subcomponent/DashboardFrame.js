import React from 'react';
import Breadcrumb from "../../components/Breadcrumb";
import SideMenu from "./SideMenu";
import TopMenu from "../../components/TopMenu";
import Footer from "../../components/Footer";
import {getFromLocalStorage} from '../../../utils/Functions'


const DashboardFrame = ({children, title, subTitle}) => {

   let token = getFromLocalStorage("token")
    return (
        <div className="wrapper">
            <SideMenu/>
            <div className="topbar">
                
                <TopMenu token={token} />
                <Breadcrumb title={title} subTitle={subTitle}/>
                {children}
                <Footer />
            </div>
        </div>
    )
}

export default React.memo(DashboardFrame);
