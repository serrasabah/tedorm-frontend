import axios from "axios";

export class StudentApi {
  getStudents() {
    return axios.get("/students");
  }
  addStudents(formState) {
    return axios.post("/students", formState);
  }
  deleteStudents(id) {
    return axios.delete("/students/" + id)
  }
  updateStudents(id, newData) {
    return axios.put("/students/" + id, newData)
  }
}