import React, {useEffect} from "react"
import Breadcrumb from "../../components/Breadcrumb";
import SideMenu from "./SideMenu";
import TopMenu from "../../components/TopMenu";
import Footer from "../../components/Footer";
import { userDetails } from "../../../services/userServices";
import store from "../../../store/store";
import { useState } from "@hookstate/core";
import { PopupAlert } from "../../components/Alert";


const DashboardFrame = ({ children, title, subTitle }) => {

    const [open, setOpen] = React.useState(false)

    const openMenu = () => {
        setOpen(true)
    }
    const CloseMenu = () => {
        setOpen(!true)
    }

    const {firstName} = useState(store)
    const {lastName} = useState(store)
    const {phoneNumber} = useState(store)
    const {email} = useState(store)
    const {alertType} = useState(store)
    const {userId} = useState(store)
    const {alertNotification} = useState(store)
    const {alertMessage} = useState(store)
    const {deptID} = useState(store)


    useEffect(() => {
        try{
            const fetch = async () => {
                if(firstName.get() === ""){
                    const user = await userDetails()
                    firstName.set(user.data.firstName)
                    lastName.set(user.data.lastName)
                    phoneNumber.set(user.data.phoneNumber)
                    email.set(user.data.email)
                    userId.set(user.data.id)
                    deptID.set(user.data.departmentID)
                }
            }  
            fetch()
        }
        catch(err){
            console.log(err)
        }
    }, [])
    
    return ( 
        <div className="wrapper">
            <SideMenu open={open} CloseMenu={CloseMenu}/>
            <div className="topbar">
                <TopMenu openMenu={openMenu} open={open} />
                <Breadcrumb title={title} subTitle={subTitle}/>
                {alertNotification.get() && 
                <PopupAlert 
                    alertType={alertType.get()} 
                    setShowAlert={alertNotification.set} 
                    message={alertMessage.get()}
                />
                }
                {children}
                <Footer />
            </div>
        </div>
    )
}

export default DashboardFrame;
