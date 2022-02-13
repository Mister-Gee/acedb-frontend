import { instance } from './httpService';

const http = instance;

export const getStudentTimetable = () => {
    return http.get("/ExamTimeTable/Student/Current")
}

export const getAllExamTimetable = () => {
    return http.get("/ExamTimeTable/CurrentAcademicYear/CurrentSemester/All")
}

export const createTimetable = (data) => {
    return http.post("/ExamTimeTable/CurrentAcademicYear/CurrentSemester/Create", data)
}

export const editTimetable = (ID, data) => {
    return http.put(`/ExamTimeTable/CurrentAcademicYear/CurrentSemester/Edit/${ID}`, data)
}

export const deleteTimetable = (ID) => {
    return http.delete(`/ExamTimeTable/CurrentAcademicYear/CurrentSemester/Delete/${ID}`)
}