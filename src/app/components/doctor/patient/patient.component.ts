import { DoctorService } from './../doctor.service';
import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { PageEvent } from '@angular/material/paginator';


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

  constructor( private _doctorService: DoctorService) { this.lead_date = ''; }

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
        console.log('patient',res);
        
        if (res.data.length > 0) {
          this.allPatientVisitList = res.data;
          this.total = res.pagination.total;
        }
      }
    });
  }
  getAllPatientVisitCheckedLists() {
    this._doctorService.getAllPatientVisitCheckedLists(this.page, this.perPage,this.lead_date).subscribe({
      next: (res: any) => {
        console.log('checkod',res);
        
        if (res.data.length > 0) {
          this.allPatientVisitCheckedList = res.data;
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

    //table column visit type name show changes 
    transformVisitType(visitType: string): string {
      switch (visitType) {
          case 'FIRST_VISIT':
              return 'First Visit';
          case 'Follow_UP':
              return 'Follow Up';
          case 'RE_VISIT':
              return 'Re Visit';
          
          default:
              return visitType;
      }
    }
}
