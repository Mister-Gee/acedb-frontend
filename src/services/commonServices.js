import { instance } from './httpService';

const http = instance;

export const getGender = () => {
    return http.get("/ControlledData/Gender/All")
}

export const getAcademicYears = () => {
    return http.get("/ControlledData/AcademicYear/All")
}

export const getSemesters = () => {
    return http.get("/ControlledData/Semester/All")
}

export const getMaritalStatus = () => {
    return http.get("/ControlledData/MaritalStatus/All")
}

export const getReligion = () => {
    return http.get("/ControlledData/Religion/All")
}

export const getStudentCategory = () => {
    return http.get("/ControlledData/StudentCategory/All")
}

export const getBloodGroup = () => {
    return http.get("/ControlledData/BloodGroup/All")
}

export const getGenotype = () => {
    return http.get("/ControlledData/Genotype/All")
}