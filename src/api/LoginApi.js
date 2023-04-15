import axios from "axios";

export class LoginApi {
  login(formState) {
    return axios.post("/login", formState);
  }
}
