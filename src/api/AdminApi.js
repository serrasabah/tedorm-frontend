import axios from "axios";

export class AdminApi {
  getAdmin() {
    return axios.get("/admin");
  }
  addAdmin(formState) {
    return axios.post("/admin", formState);
  }
  deleteAdmin(id) {
    return axios.delete("/admin/" + id);
  }
  updateAdmin(id, newData) {
    return axios.put("/admin/" + id, newData);
  }
  getAdminById(id) {
    return axios.get("/admin/" + id);
  }
}
