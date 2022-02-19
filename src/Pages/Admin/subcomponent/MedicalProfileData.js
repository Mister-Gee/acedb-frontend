import React, { useState, useEffect } from 'react';
import {getRecordByID} from '../../../services/healthService';
import ContentLoader from '../../components/ContentLoader';


function MedicalProfileData({recordID}) {
    const [medRecord, setMedRecord] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const { REACT_APP_ACE_URL } = process.env;


    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true)
            try {
                const res = await getRecordByID(recordID)
                const data = res.data
                setMedRecord(data)
            }
            catch (err) {
                console.log(err.message)
            }
            setIsLoading(false)
        }
        fetch()
    }, [recordID])


    return (
        isLoading ?
        <ContentLoader />
        :
        <div className="NewstudentProfileContainer">
                <div className="NewstudentProfileWrapper">
                    <div className="StudentProfileContainer StudentMargin">
                        
                        <img src={medRecord.userImageURL ? REACT_APP_ACE_URL + "/" + medRecord.userImageURL : "./assets/images/passportPhoto.png"} alt="Login Logo" />
                        
                    </div>
                    <div>
                        <ul>
                            <div>Full Name</div>
                            <li>{medRecord.record ? medRecord.record.fullName : "-"}</li>
                            <div>Family Doctor Name</div>
                            <li>{medRecord.record ? medRecord.record.familyDoctorName : "-"}</li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <div>Blood Group</div>
                            <li>{medRecord.record ? medRecord.record.bloodGroup : "-"}</li>
                            <div>Family Doctor Phone Number</div>
                            <li>{medRecord.record ? medRecord.record.familyDoctorPhoneNumber : "-"}</li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <div>Genotype</div>
                            <li>{medRecord.record ? medRecord.record.genotype : "-"}</li>
                            <div>Height</div>
                            <li>{medRecord.record ? medRecord.record.height : "-"}</li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <div>Weight</div>
                            <li>{medRecord.record ? medRecord.record.weight : "-"}</li>
                        </ul>
                    </div>
                </div>
                <div className="">
                    <div className='mt-4 p-3'>
                        <div>
                            <h6>Medical Conditions</h6>
                            <ol>
                                {medRecord.medicalConditionsList.length > 0 && medRecord.medicalConditionsList.map(data => (
                                    <li key={data.id}>{data.name}</li>
                                ))}
                            </ol>
                        </div>
                    </div>
                    <div className='mt-4 p-3'>
                        <div>
                            <h6>Other Medical Conditions</h6>
                            <p>{medRecord.record && medRecord.record.otherMedicalConditions}</p>
                        </div>
                    </div>
                    <div className='mt-4 p-3'>
                        <div>
                            <h6>Additional Note</h6>
                            <p>{medRecord.record && medRecord.record.additionalNote}</p>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default MedicalProfileData
