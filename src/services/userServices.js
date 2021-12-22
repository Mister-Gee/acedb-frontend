import { instance } from './httpService';

export const loginUser = (data) => {
    return instance.post("/api/sme/authentication/signin", data)
}

export const logoutUser = () => {
    return instance.post("/api/sme/authentication/logout")
}