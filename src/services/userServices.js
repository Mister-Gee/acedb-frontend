import { instance } from './httpService';


export const userDetails = () => {
    return instance.get("/Account/LoggedIn/User")
}

export const loginUser = (data) => {
    return instance.post("/Account/login", data)
}

export const getUserCount = () => {
    return instance.get("/Account/UserCount")
} 

export const updateUserStatus = (data) => {
    return instance.put("/Account/User/UpdateStatus/ByID", data)
}

export const createUser = (data) => {
    return instance.post("/Account/Register", data)
}

export const logoutUser = () => {
    return instance.post("/api/sme/authentication/logout")
}