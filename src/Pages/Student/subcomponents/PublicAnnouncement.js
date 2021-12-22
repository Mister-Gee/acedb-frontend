import React from 'react'
import { Card, Button } from "react-bootstrap"

function PublicAnnouncement() {

    return (
        <Card style={{ margin: "" }} className="PublicAnnouncementCard">
            <Card.Body className="PublicAnnouncementWrapper">
                <Card.Text>
                    <div className="PublicAnnouncementTitle"><span class="iconify AnnouncementIcon" data-icon="tabler:speakerphone" data-inline="false"></span> Public Announcement/News</div>
                    <div className="PublicAnnouncementBody">
                        <div className="pol">
                            <div className="PublicAnnouncementNote">
                                Result of Courses published
                            </div>
                            <div className="PublicAnnouncementDate">
                                12-Mar.2021
                            </div>
                        </div>
                        <div className="pol">
                            <div className="PublicAnnouncementNote">
                                Exam clearance fee been activated
                            </div>
                            <div className="PublicAnnouncementDate">
                                11-Mar.2021
                            </div>
                        </div>
                    </div>
                </Card.Text>
            </Card.Body>
            <div style={{width:"100%"}}>
                <Button className="StudentFeesButton PublicAnnouncementButton"><span className="StudentFeesButtonText">View All</span></Button>
            </div>
            
        </Card>
    )
}

export default PublicAnnouncement
