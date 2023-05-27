import axios from "axios";

export class UserApi {
  forgotPassword(email) {
    return axios.post("/user/forgotPassword", email);
  }
}
