import { instance } from './httpService';

const http = instance;

export const getRegStatus = () => {
    return http.get("/Biodata/Registeration/Progress")
}

