import axios from "axios";

export class UserApi {
  getUser() {
    return axios.get("/user");
  }
  addUser(formState) {
    return axios.post("/user", formState);
  }
  deleteUser(id) {
    return axios.delete("/user/" + id);
  }
  updateUser(id, newData) {
    return axios.put("/user/" + id, newData);
  }
  getUserById(id) {
    return axios.get("/user/" + id);
  }
  getStudentByUserId(id) {
    return axios.get("/user/student/" + id);
  }
  getAdminByUserId(id) {
    return axios.get("/user/admin/" + id);
  }
  getUserByUsername(username) {
    return axios.get("/user/" + username);
  }
  forgotPassword(email) {
    return axios.post("/user/forgotPassword", email);
  }
}
