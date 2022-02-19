import Dashboardframe from './subcomponent/Dashboardframe';
import { Helmet } from 'react-helmet';
import MedicalProfileData from './subcomponent/MedicalProfileData';
import {useParams} from 'react-router-dom';

function MedicalProfile() {

    const {Id} = useParams()
    return (
        <Dashboardframe title="Health" subTitle="Medical Profile">
            <Helmet>
                <title>Medical Profile | Adeyemi College of Education</title>
            </Helmet>
            <div className="StudentProfileDetailsCard">
                <div className="StudentProfileBody">
                    <MedicalProfileData 
                        recordID={Id}
                    />
                </div>
            </div>
        </Dashboardframe>
    )
}

export default MedicalProfile