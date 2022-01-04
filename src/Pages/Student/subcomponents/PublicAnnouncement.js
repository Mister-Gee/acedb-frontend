import React, {useState, useEffect} from 'react'
import { Card, Button } from "react-bootstrap";
import {getAllAnnoucements} from '../../../services/annoucementService';
import {dateConverter} from '../../../utils/Functions';
import {useHistory} from 'react-router-dom';

function PublicAnnouncement() {
    let history = useHistory()

    const [annoucements, setAnnoucements] = useState([])

    useEffect(() => {
        try{
            const fetch = async () => {
                const res = await getAllAnnoucements()
                setAnnoucements(res.data)
            }
            fetch()
        }
        catch(err){
            console.log(err)
        }
    }
    ,[])

    const onClick = () => {
        history.push({
            pathname: "/annoucements"
        })
    }

    return (
        <Card style={{ margin: "" }} className="PublicAnnouncementCard">
            <Card.Body className="PublicAnnouncementWrapper">
                <Card.Text>
                    <div className="PublicAnnouncementTitle"><span class="iconify AnnouncementIcon" data-icon="tabler:speakerphone" data-inline="false"></span> Public Announcement/News</div>
                    <div className="PublicAnnouncementBody">
                        {annoucements.map(data => (
                            <div className="pol" key={data.id}>
                            <div className="PublicAnnouncementNote">
                                {data.title}
                            </div>
                            <div className="PublicAnnouncementDate">
                                {dateConverter(data.date)}
                            </div>
                        </div>    
                        ))}
                    </div>
                </Card.Text>
            </Card.Body>
            <div style={{width:"100%"}}>
                <Button 
                    className="StudentFeesButton PublicAnnouncementButton"
                    onClick={onClick}
                >
                    <span className="StudentFeesButtonText">View All</span>
                </Button>
            </div>
            
        </Card>
    )
}

export default PublicAnnouncement
