import { DoctorService } from './../doctor.service';
import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss',

})
export class PatientComponent implements OnInit{
  allPatientVisitList: Array<any> = [];
  allPatientVisitCheckedList: Array<any> = [];
  firstCardContent: any;
  icons = freeSet;
  page = 1;
  perPage = 10;
  total = 0;
  lead_date: string;
  color: string | undefined;

  constructor( private _doctorService: DoctorService, private _toastrService: ToastrService) { this.lead_date = ''; }

  ngOnInit() {
    this.setTodayDate();
    this.getAllPatientVisitCheckedLists();
    this.getAllPatientVisitLists();
   
  }

  setTodayDate() {
    const today = new Date();
    // Format the date as per your backend requirement
    this.lead_date = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
  }
  //get all Patien tVisit List...
  getAllPatientVisitLists() {
    this._doctorService.getAllPatientVisitLists(this.page, this.perPage,).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allPatientVisitList = res.data;
          console.log(res.data);
  
          this.total = res.pagination.total;
        }
      }
    });
  }
  getAllPatientVisitCheckedLists() {
    this._doctorService.getAllPatientVisitCheckedLists(this.page, this.perPage).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allPatientVisitCheckedList = res.data;
          console.log('Checked',res.data);
  
          this.total = res.pagination.total;
        }
      }
    });
  }
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getAllPatientVisitLists();
    this.getAllPatientVisitCheckedLists();
  }
}
