import { instance } from './httpService';

const http = instance;

export const getStudentHealthRecord = () => {
    return http.get("/HealthCenter/Records/Student/All")
}

export const getStaffHealthRecord = () => {
    return http.get("/HealthCenter/Records/Staff/All")
}

export const getRecordByID = (ID) => {
    return http.get(`/HealthCenter/Records/${ID}`)
}

export const getRecordByUserID = (UserID) => {
    return http.get(`/HealthCenter/Records/User/${UserID}`)
}

export const getMedicalHistory = (UserID) => {
    return http.get(`/HealthCenter/MedicalHistory/${UserID}`)
}

export const addMedicalDiagnosis = (data) => {
    return http.post("/HealthCenter/Diagnosis/Add", data)
}

export const addAllRecord = (data) => {
    return http.post("/HealthCenter/Records/All/Add", data)
}

export const editAllRecord = (ID, data) => {
    return http.put(`/HealthCenter/Records/All/Edit/${ID}`, data)
} 

export const deleteAllRecord = (ID) => {
    return http.delete(`/HealthCenter/Record/Delete/${ID}`)
}

export const addStudentRecord = (data) => {
    return http.post("/HealthCenter/Records/Student/Add", data)
}

export const addStaffRecord = (data) => {
    return http.post("/HealthCenter/Records/Staff/Add", data)
}

export const editStudentRecord = (ID, data) => {
    return http.put(`/HealthCenter/Records/Student/Edit/${ID}`, data)
}

export const editStaffRecord = (ID, data) => {
    return http.put(`/HealthCenter/Records/Staff/Edit/${ID}`, data)
}

export const editMedicalDiagnosis = (ID, data) => {
    return http.put(`/HealthCenter/Diagnosis/Edit/${ID}`, data)
}

export const deleteMedicalDiagnosis = (ID) => {
    return http.delete(`/HealthCenter/History/Delete/${ID}`)
}