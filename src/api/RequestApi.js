import axios from "axios";

export class RequestApi {
  getRequest() {
    return axios.get("/requests");
  }
  getRequestId(id) {
    return axios.get("/requests/" + id);
  }

  addRequest(formState) {
    return axios.post("/requests", formState);
  }
  
  deleteRequest(id) {
    return axios.delete("/requests/" + id)
  }

  updateRequest(id, newData) {
    return axios.put("/requests/" + id, newData)
  }
}