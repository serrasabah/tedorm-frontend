import axios from "axios";

export class FileApi {
  uploadFiles(formState, name) {
    return axios.post("/image", formState, name);
  }

  downloadFiles(formState) {
    return axios.get("/image", formState);
  }
}