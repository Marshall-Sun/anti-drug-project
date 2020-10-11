import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class DashboardHotspotService {
  constructor(private http: HttpClient) {}

  getHotspot() {
    return this.http.get("/user/getHotspot?id=0");
  }

  updateHotspot(list: string[]) {
    let json = {
      id: 0,
      first_pos: "",
      second_pos: "",
      third_pos: "",
      fourth_pos: "",
      fifth_pos: "",
      sixth_pos: "",
      seventh_pos: "",
    };
    if (list[0]) json.first_pos = list[0];
    if (list[1]) json.second_pos = list[1];
    if (list[2]) json.third_pos = list[2];
    if (list[3]) json.fourth_pos = list[3];
    if (list[4]) json.fifth_pos = list[4];
    if (list[5]) json.sixth_pos = list[5];
    if (list[6]) json.seventh_pos = list[6];
    return this.http.post("/user/updateHotspot", json);
  }
}
