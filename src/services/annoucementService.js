import { instance } from './httpService';

const http = instance;

export const getAllAnnoucements = () => {
    return http.get("/Annoucement/Get/All")
}