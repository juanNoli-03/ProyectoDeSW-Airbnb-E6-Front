import axios from "axios";
import { Constants } from "../constants";

class UserService {
    getUserData(email: string){
        return axios.get(`${Constants.BASE_URL}/user/email/${email}`);
    }
    getRandomUser (id: number) {
        return axios.get(Constants.USER_URL, {
             params: {
                seed: `799dd4b67f6a${id}z`
            }
        })
    }
}

export default new UserService();