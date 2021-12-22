import React from 'react'

function EduObjective() {
    return (
        <div className="EduObjectiveContainer">
            <div className="EduObjectiveWrapper">
                <div className="EduObjectiveTitle">Educational Objective</div>
                <div className="table-wrapper-scroll-y my-custom-scrollbar overflow Edu-Table-Height">
                   <table class="table">
                        <tbody className="EduObjectiveTableBody">
                            <tr>
                                <th scope="col">Program of Study</th>
                                <th scope="col">Start Date</th>
                                <th scope="col">Expected Completion</th>
                                <th scope="col">Status</th>
                                <th scope="col">Primary?</th>
                                <th scope="col"></th>
                            </tr>
                    <tr>
                        <td>BSc-Computer Science</td>
                        <td>12/03/1990</td>
                        <td>07/10/1994</td>
                        <td>Ongoing</td>
                        <td>Yes</td>
                        <td><span>Request<span class="iconify" data-icon="gridicons:dropdown" data-inline="false"></span></span></td>
                    </tr>
                </tbody>
            </table> 
                </div>
            </div>
        </div>
    )
}

export default EduObjective
