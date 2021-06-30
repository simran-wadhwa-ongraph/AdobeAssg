import { Component, OnInit } from '@angular/core';
import { HospitalServiceService } from '../../services/hospital-service.service'
import { Router, ActivatedRoute } from '@angular/router';
import {ModalComponent} from '../modal/modal.component';
import {MatDialog} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-depratment-view',
  templateUrl: './depratment-view.component.html',
  styleUrls: ['./depratment-view.component.scss']
})
export class DepratmentViewComponent implements OnInit {
  public rows = [];
  public departmentName: any;
  public contactNumber: any;
  public headOfDepartmentName: any;
  public hospitalName : any
  public arrayLength : any;
  constructor(private toastr: ToastrService, public dialog :MatDialog, public _hospitalService: HospitalServiceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getDepartmentdata();
    this.hospitalName = this.route.snapshot.params['name']
    console.log("hospitalName-----",this.hospitalName)
  }

  getDepartmentdata() {
    this._hospitalService.getDepartmentData().subscribe((res: any) => {
      this.rows = res;
      let arr = []
      for (const property in res) {
        (arr).push(res[property])
      }
      this.rows = arr;
      this.arrayLength = this.rows.length
      console.log("before data--------------",this.rows)
      // if(this.hospitalName && (this.hospitalName != '') && (this.hospitalName != undefined)){
      //   this.rows = this.rows.filter((val)=>{
      //     return (val.hospitalname == this.hospitalName)
      //   })
      // }
      this.rows = [...this.rows]
      console.log("this.rows----------------", this.rows)

    })
  }

  deleteDepartmentData(rowData) {
    console.log("id---", rowData)
    this._hospitalService.deleteDepartmentData('data' + ((rowData.id).toString())).subscribe((res: any) => {
      if (res) {
        this.getDepartmentdata();
        this.toastr.success("data deleted successfully.")
      }
    })
  }

  editDepartmentData(rowData) {
    let dialogRef = this.dialog.open(ModalComponent, {
      data: { key: 'data' + ((rowData.id).toString()) , id : rowData.id, type : 2, hospitalname: rowData.hospitalname},
    });
    dialogRef.afterClosed().subscribe(res =>{
      this.getDepartmentdata();
      this.toastr.success("data updated successfully.")
    })
  }

  addDepartmentData() {
    var objKey = 'data' + (this.rows.length + 1).toString()
    console.log("index----", objKey)
    var departmentObj = {
      "departmentname": this.departmentName,
      "contactnumber": this.contactNumber,
      "head": this.headOfDepartmentName,
      "id": this.arrayLength + 1,
      "hospitalName" : this.hospitalName
    }
    console.log("dsfdsfferfergerggrtgrtgr", departmentObj)
    this._hospitalService.addDepartmentData({ 'objectKey': objKey, 'objectData': departmentObj }).subscribe((res) => {
      console.log("res--------", res)
      this.getDepartmentdata();
      this.toastr.success("data added successfully.")
    })
  }
  clear() {
    this.departmentName = this.headOfDepartmentName = this.contactNumber = '';
  }
  sortByDeptName() {
    this.toastr.success("data sorted successfully.")
    var sortedArray = this.rows.sort(function (a, b) { return (a.departmentname > b.departmentname) ? 1 : ((b.departmentname > a.departmentname) ? -1 : 0); });
    this.rows = sortedArray
    this.rows = [...this.rows]
  }

}
