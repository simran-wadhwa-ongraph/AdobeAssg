import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HospitalServiceService } from '../../services/hospital-service.service'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements OnInit {

  constructor(public _hospitalService: HospitalServiceService, public dialogRef: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  public hospitalName: any;
  public contactNumber: any;
  public departmentName : any;
  public head:any;
  public rows  = [];
  ngOnInit() {
    this.getHospitalData();
    this.getDepartmentData();
  }
  getHospitalData() {
    this._hospitalService.getHospitalData().subscribe((res: any) => {
      this.rows = res;
      let arr = []
      for (const property in res) {
        (arr).push(res[property])
      }
      this.rows = arr;
      var filterData = this.rows.filter((val)=>{
        return val.id == this.data.id
      })
      if(filterData){
        this.hospitalName = filterData[0].hospitalname;
        this.contactNumber = filterData[0].contactnumber
      }
    })
  }
  getDepartmentData(){
    this._hospitalService.getDepartmentData().subscribe((res: any) => {
      this.rows = res;
      let arr = []
      for (const property in res) {
        (arr).push(res[property])
      }
      this.rows = arr;
      var filterData = this.rows.filter((val)=>{
        return val.id == this.data.id
      })
      if(filterData){
        this.departmentName = filterData[0].departmentname;
        this.contactNumber = filterData[0].contactnumber;
        this.head = filterData[0].head;
      }

    })
  }

  editHospitalData() {
    var hospitalObj = {
      "hospitalname": this.hospitalName,
      "contactnumber": this.contactNumber,
      "id" : this.data.id
    }
    console.log("dsfdsfferfergerggrtgrtgr", hospitalObj)
    this._hospitalService.addHospitalData({ 'objectKey': this.data.key, 'objectData': hospitalObj }).subscribe((res) => {
      console.log("res--------", res)
      this.dialogRef.close();
    })
  }
  editDepartmentData(){
    var departmentObj = {
      "departmentname": this.departmentName,
      "contactnumber": this.contactNumber,
      "head": this.head,
      "id": this.data.id,
      "hospitalname" : this.data.hospitalname
    }
    console.log("dsfdsfferfergerggrtgrtgr", departmentObj)
    this._hospitalService.addDepartmentData({ 'objectKey': this.data.key, 'objectData': departmentObj }).subscribe((res) => {
      console.log("res--------", res)
      this.dialogRef.close();
    })
  }

  clear() {
    this.hospitalName = this.contactNumber = this.head = this.departmentName =  '';
  }

}
