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
    return this.http.post("/user/updateHotspot", list);
  }
}
