import { instance } from './httpService';

const http = instance;

export const getStudentRegCourses = (id) => {
    return http.get(`/CourseRegisteration/Student/CurrentAcademicYear/CurrentSemester/${id}`)
}