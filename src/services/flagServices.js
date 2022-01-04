import { instance } from './httpService';

const http = instance;

export const getStudentFlag = (StudentID) => {
    return http.get(`/Flag/Students/Get/StudentID/${StudentID}`)
}

