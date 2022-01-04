import { instance } from './httpService';

const http = instance;

// Class Attendance
export const getStudentClassAttendance = () => {
    return http.get("/ClassAttendance/Record/Student/Courses")
}

// Exam Attendance
export const getStudentExamAttendance = () => {
    return http.get("/ExamAttendance/Record/Student")
}