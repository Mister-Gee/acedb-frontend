import { useState, useEffect } from 'react'
import { studentAcademicsData } from "./Data"

function ModalTable() {

    const [isSelected, setIsSelected] = useState([])

    useEffect(() => {
        setIsSelected(
            studentAcademicsData.map((userData) => {
                return {
                    select: false,
                    ProgramStudy: userData.ProgramStudy,
                    id: userData.id,
                    unit: userData.unit,
                    eligibility: userData.eligibility,
                    CourseType: userData.CourseType,
                    Start: userData.Start,
                    Completion: userData.Completion,
                }
            }))
    }, [])

    return (
        <table class="table table-bordered AcademicModalTable">
            <thead class="thead-light">
                <tr>
                    <th className="AcademicModalCheckBox">
                        <input type="checkbox" onChange={(e) => {
                            let checked = e.target.checked
                            setIsSelected(isSelected.map((d) => {
                                d.select = checked
                                return d
                            }))
                        }}></input></th>
                    <th scope="col">Program of Study</th>
                    <th scope="col">Unit</th>
                    <th scope="col">Eligibilty</th>
                    <th scope="col">Course Type</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">Expected Completion</th>
                </tr>
            </thead>
            <tbody>
                {isSelected.map((userData) => (
                    <tr key={userData.id}>
                        <td className="AcademicModalCheckBox">
                            <input className="AcademicModalCheckBoxBorder" onChange={(e) => {
                                let checked = e.target.checked;
                                setIsSelected(isSelected.map((d) => {
                                    if (userData.id === d.id) {
                                        d.select = checked;
                                    }
                                    return d
                                }))
                            }} type="checkbox" checked={userData.select}>
                            </input>
                        </td>
                        <td>{userData.ProgramStudy}</td>
                        <td>{userData.unit}</td>
                        <td>{userData.eligibility}</td>
                        <td>{userData.CourseType}</td>
                        <td>{userData.Start}</td>
                        <td>{userData.Completion}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ModalTable
