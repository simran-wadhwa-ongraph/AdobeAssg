import { Component, OnInit } from '@angular/core';
import { HospitalServiceService } from '../../services/hospital-service.service'
import { _ } from 'underscore';
import { Router } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hospital-view',
  templateUrl: './hospital-view.component.html',
  styleUrls: ['./hospital-view.component.scss']
})
export class HospitalViewComponent implements OnInit {
  public rows = [];
  constructor(private toastr: ToastrService, public dialog: MatDialog, public _hospitalService: HospitalServiceService, private router: Router) { }
  public hospitalName: any;
  public contactNumber: any;
  ngOnInit() {
    this.getHospitaldata();
  }

  deleteHospitalData(rowData) {
    console.log("id---", rowData)
    this._hospitalService.deleteHospitalData('data' + ((rowData.id).toString())).subscribe((res: any) => {
      if (res) {
        this.getHospitaldata();
        this.toastr.success("data deleted successfully.")
      }
    })
  }

  // editHospitalData(no) {
  //   this._hospitalService.deleteHospitalData({ contactNo: no }).subscribe((res: any) => {
  //     console.log("res")
  //   })
  // }

  getHospitaldata() {
    this._hospitalService.getHospitalData().subscribe((res: any) => {
      this.rows = res;
      let arr = []
      for (const property in res) {
        (arr).push(res[property])
      }
      this.rows = arr;
      console.log("this.rows----------------", this.rows)
    })
  }

  addHospitalData() {
    var objKey = 'data' + (this.rows.length + 1).toString()
    console.log("index----", objKey)
    var hospitalObj = {
      "hospitalname": this.hospitalName,
      "contactnumber": this.contactNumber,
      "id": this.rows.length + 1
    }
    console.log("dsfdsfferfergerggrtgrtgr", hospitalObj)
    this._hospitalService.addHospitalData({ 'objectKey': objKey, 'objectData': hospitalObj }).subscribe((res) => {
      console.log("res--------", res);
      this.toastr.success("Hospital data added successfully.")
      this.getHospitaldata();
    })
  }

  clear() {
    this.hospitalName = this.contactNumber = '';
  }

  sortByName() {
    var sortedArray = this.rows.sort(function (a, b) { return (a.hospitalname > b.hospitalname) ? 1 : ((b.hospitalname > a.hospitalname) ? -1 : 0); });
    this.rows = sortedArray
    this.rows = [...this.rows]
    this.toastr.success("sorted successfully.")
  }

  fetchDepForHospital(hospitalname) {
    this.router.navigate(['/department/', hospitalname]);
  }

  editHospitalData(rowData) {
    let dialogRef = this.dialog.open(ModalComponent, {
      data: { key: 'data' + ((rowData.id).toString()), id: rowData.id, type: 1 },
    });
    dialogRef.afterClosed().subscribe(res => {
      this.getHospitaldata();
      this.toastr.success("data updated successfully.")
    })
  }

}
