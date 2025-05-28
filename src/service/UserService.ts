import axios from "axios";
import { Constants } from "../constants";

class UserService {
    getUserData(email: string){
        return axios.get(`${Constants.BASE_URL}/user/email/${email}`);
    }
    getRandomUser () {
        return axios.get(`${Constants.USER_URL}`)
    }
}

export default new UserService();