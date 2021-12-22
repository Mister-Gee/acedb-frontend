import {useEffect, useState} from 'react';
import {Spinner} from 'react-bootstrap';
import {instance} from '../../../services/httpService';

export const Selected = ({schoolProp}) => {
    const institutionId = schoolProp
    const [institutionName, setInstitutionName] = useState(null)

    useEffect(() => {
        instance.get(`/api/ieducare/modulesubscription/get/${institutionId}`)
        .then(res => {
            const data = res.data
            if (data.length < 1){
            }
            else{
                setInstitutionName(data[0].institutionName)
            }
        })
        .catch(err => console.log(err.message))
    }, [institutionId])

    return(
        <div className="selected-school">
           <div> {institutionName ? `${institutionName} has been selected and made active` : <Spinner animation="border" />}
           </div> 
        </div>
    )
}

export const NoneSelected = () => {
    return (
        <div className="selected-school">
            Select an Institution
        </div>
    )
}