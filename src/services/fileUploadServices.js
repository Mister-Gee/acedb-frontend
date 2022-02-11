import { instance } from './httpService';

const http = instance;

export const uploadStaff = (data) => {
    return http.post("/UserUpload/Staff/New", data)
}

export const uploadReturningStudents = (ProgrammeID, LevelID, DepartmentID, data) => {
    return http.post(`/UserUpload/Student/Returning/${ProgrammeID}/${LevelID}/${DepartmentID}`, data)
}

export const uploadNewStudents = (ProgrammeID, LevelID, DepartmentID, data) => {
    return http.post(`/UserUpload/Student/New/${ProgrammeID}/${LevelID}/${DepartmentID}`, data)
}