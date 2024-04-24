import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { freeSet } from '@coreui/icons';
import { ReceptionistService } from '../../receptionist.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-receptionist-appointment-report',
  templateUrl: './receptionist-appointment-report.component.html',
  styleUrl: './receptionist-appointment-report.component.scss'
})
export class ReceptionistAppointmentReportComponent  implements OnInit{
  page = 1;
  perPage = 10;
  total = 0;
  icons = freeSet;
  allAppointmentList: Array<any> = [];
  form!:FormGroup;
  fromDate='';
  toDate='';
  minDate = new Date();
  constructor(private _receptionistService: ReceptionistService, private fb:FormBuilder) { }

  ngOnInit() {
    // this.getAllAppointmentList();
    this.createForm()
  }
  createForm(){
    this.form = this.fb.group({
      fromDate:['',[this.dateValidator]],
      toDate:['',[this.dateValidator]],
    });
  }
  dateValidator(control:any) {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours to 0 to compare dates without time
    return selectedDate <= today ? null : { futureDate: true };
}
  //get all appointment List...
  getAllAppointmentList() {
    this._receptionistService.getAllConsultationAppointmentReportList(this.page, this.perPage,this.fromDate, this.toDate).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allAppointmentList = res.data;
          this.total = res.pagination.total;
        }
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getAllAppointmentList();
  }
  submitFilter(){
    this.fromDate = this.form.value.fromDate;
    this.toDate = this.form.value.toDate;
    this._receptionistService.getAllConsultationAppointmentReportList(this.page, this.perPage, this.fromDate, this.toDate).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allAppointmentList = res.data;
          this.total = res.pagination.total;
        }else{
          this.allAppointmentList = []
        }
      }
    });
  }
}
