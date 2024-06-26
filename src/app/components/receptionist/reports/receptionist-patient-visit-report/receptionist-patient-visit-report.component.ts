import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { freeSet } from '@coreui/icons';
import { ReceptionistService } from '../../receptionist.service';
import { PageEvent } from '@angular/material/paginator';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-receptionist-patient-visit-report',
  templateUrl: './receptionist-patient-visit-report.component.html',
  styleUrl: './receptionist-patient-visit-report.component.scss'
})
export class ReceptionistPatientVisitReportComponent  implements OnInit{
  page = 1;
  perPage = 50;
  total = 0;
  icons = freeSet;
  allPatientVisitList: Array<any> = [];
  allVisitTypeList:Array<any>=[{'visit_type':'FIRST_VISIT'},{'visit_type':'RE_VISIT'}];
  selectedCategory:any;
  form!:FormGroup;
  fromDate='';
  toDate='';
  visit_type='';
  minDate = new Date();
  searchControl: FormControl = new FormControl('');
  searchTerm: string = '';
  searchTimer: any;
  constructor(private _receptionistService: ReceptionistService, private fb:FormBuilder) { }

  ngOnInit() {
    // this.getAllPatientVisitList();
    this.createForm();
    this.searchControl.valueChanges
    .pipe(debounceTime(300))
    .subscribe((searchTerm: string) => {
      clearTimeout(this.searchTimer);
      this.searchTerm = searchTerm;
      this.searchTimer = setTimeout(() => {
        this.getAllPatientVisitList();
      }, 1000); // Set timeout to 5 seconds (5000 milliseconds)
    });
  }
  createForm(){
    this.form = this.fb.group({
      fromDate:['',[this.dateValidator]],
      toDate:['',[this.dateValidator]],
      visit_type:["null"]
    });
  }
  dateValidator(control:any) {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours to 0 to compare dates without time
    return selectedDate <= today ? null : { futureDate: true };
}
  //get all patient visit List...
  getAllPatientVisitList() {
    this._receptionistService.getAllPatientVisitList(this.page, this.perPage, this.fromDate,this.toDate,this.visit_type,this.searchTerm).subscribe({
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
  submitFilter(){
    console.log(this.form.value);
    this.fromDate = this.form.value.fromDate;
    this.toDate = this.form.value.toDate;
    this.visit_type = this.form.value.visit_type;
    this._receptionistService.getAllPatientVisitList(this.page, this.perPage, this.fromDate, this.toDate, this.visit_type ,this.searchTerm).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allPatientVisitList = res.data;
          this.total = res.pagination.total;
        }else{
          this.allPatientVisitList = []
        }
      }
    });
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