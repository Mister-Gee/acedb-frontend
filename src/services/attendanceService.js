import { instance } from './httpService';

const http = instance;

// Class Attendance
export const getStudentClassAttendanceByDept = (CourseID, DepartmentID) => {
    return http.get(`/ClassAttendance/Record/Student/Classes/${CourseID}/${DepartmentID}`)
}

export const getStudentClassAttendance = () => {
    return http.get("/ClassAttendance/Record/Student/Courses")
}

export const createClassAttendance = (data) => {
    return http.post("/ClassAttendance/Create", data)
}


// Exam Attendance
export const getStudentExamAttendance = () => {
    return http.get("/ExamAttendance/Record/Student")
}

export const getSupervisorCourses = () => {
    return http.get("/ExamAttendance/LoggedInSupervisor/Courses/Get")
}

export const getExamCoursesAttendance = (CourseID) => {
    return http.get(`/ExamAttendance/CurrentSession/Get/${CourseID}`)
}

export const examStartAttendance = (data) => {
    return http.post("/ExamAttendance/Start", data)
}

export const examEndAttendance = (AttendanceID, data) => {
    return http.put(`/ExamAttendance/End/${AttendanceID}`, data)
}