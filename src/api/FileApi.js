import axios from "axios";

export class FileApi {
  uploadFiles(formState, name, id) {
    return axios.post("/image", formState, name, id);
  }

  downloadFiles(formState) {
    return axios.get("/image", formState);
  }

  uploadAvatar(formState, id) {
    return axios.post("/avatar", formState, id);
  }
}
