import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { ReceptionistService } from './../receptionist.service';
import { AdminService } from '../../admin/admin.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss'
})
export class PatientComponent implements OnInit{
  allPatientVisitList: Array<any> = [];
  icons = freeSet;
  page = 1;
  perPage = 10;
  total = 0
color: string|undefined;
  constructor( private _adminService: AdminService, private _receptionistService: ReceptionistService,private _toastrService: ToastrService) { }

  ngOnInit() {
    this.getAllPatientVisitList();
  }
  //get all PatientVisit List...
  getAllPatientVisitList() {
    this._adminService.getAllPatientVisitList(this.page, this.perPage).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allPatientVisitList = res.data;
          this.total = res.pagination.total;
        }
      }
    });
  }
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getAllPatientVisitList();
  }

  //slide-toggle change Patient
  changeEvent(event: any, id: any) {
    let status = 0;
    if (event.checked) {
      status = 1;
    }
    this._receptionistService.onPatientStatusChange(status, id).subscribe({
      next: (res: any) => {
        this._toastrService.success(res.message);
        this.getAllPatientVisitList();
      },
      error: (error: any) => {
        if (error.status == 422) {
          this._toastrService.warning(error.message);
          this.getAllPatientVisitList();
        }
      },
    })


  }
}
