import axios from "axios";

export class MenuApi {
  getAllMenus() {
    return axios.get("/menus");
  }
  addMenu(formState) {
    return axios.post("/menus", formState);
  }
  deleteMenu(id) {
    return axios.delete("/menus/" + id);
  }
  getMenus() {
    return axios.get("/menus/maxseven");
  }
  updateMenu(id, newData) {
    return axios.put("/menus/" + id, newData);
  }
}
