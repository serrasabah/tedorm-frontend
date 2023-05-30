import axios from "axios";

export class AnnouncementApi {
  getAnnouncement() {
    return axios.get("/announcement");
  }

  addAnnouncement(formState) {
    return axios.post("/announcement", formState);
  }
  
  deleteAnnouncement(id) {
    return axios.delete("/announcement/" + id)
  }

  updateAnnouncement(id, newData) {
    return axios.put("/announcement/" + id, newData)
  }
}