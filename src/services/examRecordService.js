import { instance } from './httpService';

const http = instance;

export const getStudentCurrentExamRecords = () => {
    return http.get("/ExamRecords/Student/Records/Get")
}