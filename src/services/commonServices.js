import { instance } from './httpService';

const http = instance;

export const getLGA = (stateId) => {
    return http.get(`/api/ieducare/common/lga/get/${stateId}`)
}

export const getState = (countryId) => {
    return http.get(`/api/ieducare/common/state/get/${countryId}`)
}

export const getCountry = () => {
    return http.get("/api/ieducare/common/get")
}

export const getGender = () => {
    return http.get("/ControlledData/Gender/All")
}
export const GetCommonData = () => {
    return http.get("/api/ieducare/common/get")
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

