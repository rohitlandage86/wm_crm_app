import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { freeSet } from '@coreui/icons';
import { PageEvent } from '@angular/material/paginator';
import { DoctorService } from '../../doctor.service';

@Component({
  selector: 'app-calling-list-report',
  templateUrl: './calling-list-report.component.html',
  styleUrl: './calling-list-report.component.scss'
})
export class CallingListReportComponent implements OnInit{
  page = 1;
  perPage = 10;
  total = 0;
  icons = freeSet;
  allcallList: Array<any> = [];
  form!:FormGroup;
  todayDate='';
  constructor(private _doctorService: DoctorService, private fb:FormBuilder) { }

  ngOnInit() {
    this.createForm();
    this.form.patchValue({
      today_date: new Date()
        .toISOString()
        .split('T')[0],})
  }
  createForm(){
    this.form = this.fb.group({
      today_date:['',[this.dateValidator]],
    });
  }
  dateValidator(control:any) {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours to 0 to compare dates without time
    return selectedDate <= today ? null : { futureDate: true };
}

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    // this.getCallLogsList();
  }
  submitFilter(){
    this.todayDate = this.form.value.today_date;
    this._doctorService.getCallLogsList(this.page, this.perPage, this.todayDate ).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allcallList = res.data;
          this.total = res.pagination.total;
        }else{
          this.allcallList = []
        }
      }
    });
  }
}
