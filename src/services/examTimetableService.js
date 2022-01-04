import { instance } from './httpService';

const http = instance;

export const getStudentTimetable = () => {
    return http.get("/ExamTimeTable/Student/Current")
}