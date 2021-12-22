import Breadcrumb from "../../components/Breadcrumb";
import SideMenu from "./SideMenu";
import TopMenu from "../../components/TopMenu";
import Footer from "../../components/Footer";


const Dashboardframe = ({children, title, subTitle, userId}) => {
    return (
        <div className="wrapper">
            <SideMenu/>
            <div className="topbar">
                <TopMenu userId={userId}/>
                <Breadcrumb title={title} subTitle={subTitle}/>
                {children}
                <Footer />
            </div>
        </div>
    )
}

export default Dashboardframe;
