
function ModalTable({data, handleDelete}) {

    return (
        <table class="table table-bordered AcademicModalTable">
            <thead class="thead-light">
                <tr>
                    <th scope="col">S/N</th>
                    <th scope="col">Course Code</th>
                    <th scope="col">Course</th>
                    <th scope="col">Course Description</th>
                    <th scope="col">Lecturer</th>
                    <th scope="col">Department</th>
                    <th scope="col">School</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((userData, index) => (
                    <tr key={userData.id}>
                        <td>{index + 1}</td>
                        <td>{userData.courseCode}</td>
                        <td>{userData.courseTitle}</td>
                        <td>{userData.courseDescription}</td>
                        <td>{userData.leadLecturer}</td>
                        <td>{userData.department}</td>
                        <td>{userData.school}</td>
                        <td>
                            <span className="delBin" onClick={() => handleDelete(userData.id)}>
                                <span className="iconify" data-icon="ant-design:delete-filled"></span>
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ModalTable
