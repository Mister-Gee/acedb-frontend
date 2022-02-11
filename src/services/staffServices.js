import { instance } from './httpService';

const http = instance;


export const getAllStaff = () => {
    return http.get("/Staff/Get/All")
}


export const getStaffByDept = (DepartmentID) => {
    return http.get(`/Staff/Get/Staff/${DepartmentID}/All`)
}

export const getStaffByID = (ID) => {
    return http.get(`/Staff/Get/ID/${ID}`)
}

export const getPartiallyRegisteredStaff = () => {
    return http.get("/Staff/Partial/Get/All")
}

export const getFullyRegisteredStaff = () => {
    return http.get("/Staff/Get/All")
}