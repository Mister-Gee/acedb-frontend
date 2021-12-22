import { useState } from 'react'
import DashboardFrame from './subcomponents/Dashboard.Frame';
import { Helmet } from 'react-helmet';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Biodata from './subcomponents/BiodataForm/Biodata';
import OthersPage from './subcomponents/BiodataForm/OthersPage';
import StudentProfileData from './subcomponents/BiodataForm/StudentProfileData';

function StudentProfile() {
    const [BiodataPage, setBiodataPage] = useState(true)

    const initialValues = {
        title: "",
        firstName: "",
        lastName: "",
        otherName: "",
        gender: "",
        maritalStatus: "",
        madienName: "",
        religion: "",
        DateOfBirth: "",
        email: "",
        telephone: "",
        gsm: "",
        bloodGroup: "",
        genotype: "",
        weigth: "",
        height: "",
        national: "",
        stateOfOrigin: "",
        localGovenment: "",
        residentialAddress: "",
        nextOfKen: "",
        NOKAddress: "",
        NOKTelephoneNo: "",
        sponsorName: "",
        ContactAddress: "",
        sponsorTelephone: ""

    }

    const validationSchema = Yup.object({
        title: Yup.string(),
        firstName: Yup.string(),
        lastName: Yup.string(),
        otherName: Yup.string(),
        gender: Yup.string(),
        maritalStatus: Yup.string(),
        madienName: Yup.string(),
        religion: Yup.string(),
        DateOfBirth: Yup.string(),
        email: Yup.string(),
        telephone: Yup.string(),
        gsm: Yup.string(),
        bloodGroup: Yup.string(),
        genotype: Yup.string(),
        weigth: Yup.string(),
        height: Yup.string(),
        national: Yup.string(),
        stateOfOrigin: Yup.string(),
        localGovenment: Yup.string(),
        residentialAddress: Yup.string(),
        nextOfKen: Yup.string(),
        NOKAddress: Yup.string(),
        NOKTelephoneNo: Yup.string(),
        sponsorName: Yup.string(),
        ContactAddress: Yup.string(),
        sponsorTelephone: Yup.string()
    })

    const onSubmit = async (Data) => {
        console.log(Data)
    }

    // const formik = useFormik({
    //     initialValues: initialValues,
    //     onSubmit: onSubmit,
    //     validationSchema: validationSchema
    // })

    return (
        <DashboardFrame title="Student Profile" subTitle="Dashboard">
            <Helmet>
                <title>Student-profile | iEduCare</title>
            </Helmet>
            <div className="StudentProfileDetailsCard">
                <div className="StudentProfileBody">
                    <StudentProfileData />
                    <div className="StdentProfileFormContainer">
                        <div className="StdentProfileFormWrapper">
                            <div className="StdentProfileButtonContainer">
                                <div onClick={() => (setBiodataPage(true))}>
                                    {BiodataPage ? <div className="OFFButton">Bio Data</div> : <div className="OnButton">Bio Data</div>}
                                </div>
                                <div onClick={() => (setBiodataPage(!true))}>
                                    {BiodataPage === !true ? <div className="OFFButton">Others</div> : <div className="OnButton">Others</div>}
                                </div>
                            </div>
                            <div className="">
                                {BiodataPage ? <div className="" ><Biodata initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} /></div> : <div className="StudentFormContainer"><OthersPage initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema} /></div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardFrame>
    )
}

export default StudentProfile