import axios from "axios";

export class AddAddressApi {
  getAddress() {
    return axios.get("/address");
  }

  addAddress(formState) {
    return axios.post("/address", formState);
  }
  
  deleteAddress(id) {
    return axios.delete("/address/" + id)
  }

  updateAddress(id, newData) {
    return axios.put("/address/" + id, newData)
  }
}