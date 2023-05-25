import axios from "axios";

export class AddPermissionApi {
  getPermissions() {
    return axios.get("/permissions");
  }

  addPermissions(formState) {
    return axios.post("/permissions", formState);
  }
  
  deletePermissions(id) {
    return axios.delete("/permissions/" + id)
  }

  updatePermissions(id, newData) {
    return axios.put("/permissions/" + id, newData)
  }
}