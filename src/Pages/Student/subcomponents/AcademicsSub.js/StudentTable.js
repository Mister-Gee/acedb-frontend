import React from 'react'
import { studentAcademicsData } from './Data'

function StudentTable() {
    return (
        <div className="AccademicstTableContainer">
            <div className="AccademicstTableWrapper table-wrapper-scroll-y my-custom-scrollbar overflow">
                <table class="table">
                    <tbody>
                        <tr className="AccademicstTableContent">
                            <th scope="col">Program of Study</th>
                            <th scope="col">Unit</th>
                            <th scope="col">Lecturer</th>
                            <th scope="col">Start Date</th>
                            <th scope="col">Expected Completion </th>
                            <th scope="col">Status</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                        {studentAcademicsData.map((SD) => (
                            <tr className="AccademicstTableContent">
                                <td>{SD.ProgramStudy}</td>
                                <td>{SD.unit}</td>
                                <td>{SD.Lecturer}</td>
                                <td>{SD.Start}</td>
                                <td>{SD.Completion}</td>
                                {SD.status === "Approved" ? <td className="ApprovedColor">{SD.status}</td> : <td className="NotApprovedColor">{SD.status}</td>}
                                <td><span style={{ cursor: "pointer" }}><span class="iconify AccademicstTableSwapIcon" data-icon="ant-design:swap-outlined" data-inline="false"></span>Swap</span></td>
                                <td><span class="iconify AccademicstTableDeleteIcon" data-icon="ic:round-delete-forever" data-inline="false"></span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default StudentTable
