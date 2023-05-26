import axios from "axios";

export class ApplicantApi {
  applicant() {
    return axios.get("/applicant");
  }
  addApplicant(formState) {
    return axios.post("/applicant", formState);
  }
  
  deleteApplicant(id) {
    return axios.delete("/applicant/" + id)
  }

  updateApplicant(id, newData) {
    return axios.put("/applicant/" + id, newData)
  }
}
