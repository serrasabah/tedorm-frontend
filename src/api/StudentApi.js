import axios from "axios";

export class StudentApi {
  getStudents() {
    return axios.get("/students");
  }
  addStudents(formState) {
    return axios.post("/students", formState);
  }
  deleteStudents(id) {
    return axios.delete("/students/" + id);
  }
  updateStudents(id, newData) {
    return axios.put("/students/" + id, newData);
  }
  updateStudentForAdmin(id, newData) {
    return axios.put("/students/admin" + id, newData);
  }
  getStudentById(id) {
    return axios.get("/students/" + id);
  }
  changePassword(id, formState) {
    return axios.post("/students/changePassword/" + id, formState);
  }
  addApplicantToStudent(formState) {
    return axios.post("/students/addApplicantToStudent", formState);
  }
}
