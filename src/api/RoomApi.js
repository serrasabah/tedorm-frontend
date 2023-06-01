import axios from "axios";

export class RoomApi {
  getAllRooms() {
    return axios.get("/rooms");
  }
  addRooms(formState) {
    return axios.post("/rooms", formState);
  }
  deleteRooms(id) {
    return axios.delete("/rooms/" + id);
  }
  updateRooms(id, newData) {
    return axios.put("/rooms/" + id, newData);
  }
}
