import { instance } from './httpService';


export const userDetails = () => {
    return instance.get("/Account/LoggedIn/User")
}

export const loginUser = (data) => {
    return instance.post("/Account/login", data)
}

export const logoutUser = () => {
    return instance.post("/api/sme/authentication/logout")
}