import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class HospitalServiceService {
  private baseUrl = 'http://localhost:3000';

  constructor(private _httpClient: HttpClient, private router: Router) { }

  deleteHospitalData(id?:any){
    console.log("deleteHospitalData-----",id)
    return this._httpClient.delete(this.baseUrl + '/deleteHospitalData/' + id)
  }

  editHospitalData(obj?:any){
    return this._httpClient.put(this.baseUrl + '/hospital/editData', obj)
  }

  getHospitalData(){
    return this._httpClient.get(this.baseUrl + '/getHospitalList')
  }

  addHospitalData(obj?:any){
    return this._httpClient.post(this.baseUrl + '/addHospitalData', obj)
  }

  deleteDepartmentData(id?:any){
    console.log("deleteHospitalData-----",id)
    return this._httpClient.delete(this.baseUrl + '/deleteDepartmentData/' + id)
  }

  editDepartmentData(obj?:any){
    return this._httpClient.put(this.baseUrl + '/hospital/editDepartmentData', obj)
  }

  getDepartmentData(){
    return this._httpClient.get(this.baseUrl + '/getDepartmentData')
  }

  addDepartmentData(obj?:any){
    return this._httpClient.post(this.baseUrl + '/addDepartmentData', obj)
  }

}
