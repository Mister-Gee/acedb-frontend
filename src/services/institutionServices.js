import { instance } from './httpService';

const http = instance;

export const getInstitution = () => {
    return http.get("/api/ieducare/institution/get")
}

export const addNewInstitution = (data) => {
    return http.post("/api/ieducare/institution/post", data)
}

export const updateInstitution = (data) => {
    return http.put(`/api/ieducare/institution/edit/${data.id}`, data)
}

export const deleteInstitution = (data) => {
    return http.put(`/api/ieducare/institution/edit/${data.id}`, data)
}

export const getInstitutionType = () => {
    return http.get("/api/ieducare/institutiontype/get")
}

export const getInstitutionAdmin = () => {
    return http.get("/api/ieducare/institutionadministrator/get")
}

export const addInstitutionAdmin = (data) => {
    return http.post("/api/ieducare/institutionadministrator/post", data)
}

export const updateInstitutionAdmin = (data) => {
    return http.put(`/api/ieducare/institutionadministrator/edit/${data.id}`, data)
}

export const deleteInstitutionAdmin = (data) => {
    return http.put(`/api/ieducare/institutionadministrator/edit/${data.id}`, data)
}

export const getModules = () => {
    return http.get("/api/ieducare/module/get")
}

export const linkModules = (data) => {
    return http.post("/api/ieducare/modulesubscription/post/range", data)
}

export const editModules = (data) => {
    return http.put("api/ieducare/modulesubscription/edit/range", data)
}

export const getInstitutionLicense = () => {
    return http.get("/api/ieducare/institutionlicense/get")
}

export const deleteInstitutionLicense = (id, data) => {
    return http.put(`/api/ieducare/institutionlicense/edit/${id}`, data)
}

export const getLicenseType = () => {
    return http.get("/api/ieducare/licensetype/get")
}

export const createLicense = (data) => {
    return http.post("/api/ieducare/institutionlicense/post", data)
}

export const generateLicenseKey = () => {
    return http.get("/api/sme/admin/user/generatelicensekey")
}