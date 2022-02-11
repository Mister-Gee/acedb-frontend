import { instance } from './httpService';

const http = instance;

export const getRoles = () => {
    return http.get("/Role/Get")
}

export const getStaffRoles = () => {
    return http.get("/Role/Staff")
}

export const addStaffToRole = (userId, roles) => {
    return http.post(`/Role/addRoles/byUserId/${userId}/${roles}`)
}

export const removeStaffFromRole = (userId, role) => {
    return http.post(`/Role/removeRole/byUserID/${userId}/${role}`)
}