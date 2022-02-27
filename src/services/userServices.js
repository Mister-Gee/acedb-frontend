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

export const forgetPassword = (userName) => {
    let newUserName = userName.replace("@", "%40")
    return instance.post(`/Account/ForgetPassword/${newUserName}`)
}

export const resetPassword = (data) => {
    return instance.post("/Account/ResetPassword", data)
}
