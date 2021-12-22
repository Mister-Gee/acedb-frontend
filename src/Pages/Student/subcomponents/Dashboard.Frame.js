import {useState} from "react"
import Breadcrumb from "../../components/Breadcrumb";
import SideMenu from "./SideMenu";
import TopMenu from "../../components/TopMenu";
import Footer from "../../components/Footer";


const DashboardFrame = ({ children, title, subTitle }) => {

    const [open, setOpen] = useState(false)

    const openMenu = () => {
        setOpen(true)
    }
    const CloseMenu = () => {
        setOpen(!true)
    }

    
    return ( 
        <div className="wrapper">
                <SideMenu open={open} CloseMenu={CloseMenu}/>
                <div className="topbar">
                <TopMenu openMenu={openMenu} open={open} />
                <Breadcrumb title={title} subTitle={subTitle}/>
                {children}
                <Footer />
            </div>
            </div>
    )
}

export default DashboardFrame;
