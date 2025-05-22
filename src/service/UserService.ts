import axios from "axios";
import { Constants } from "../constants";

class UserService {
    getUserData(email: string){
        return axios.get(`${Constants.BASE_URL}/user/email/${email}`);
    }
}

export default new UserService();