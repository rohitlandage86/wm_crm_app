import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { freeSet } from '@coreui/icons';
import { AdminService } from 'src/app/components/admin/admin.service';
import { ReceptionistService } from 'src/app/components/receptionist/receptionist.service';

@Component({
  selector: 'app-doctor-treatment-report',
  templateUrl: './doctor-treatment-report.component.html',
  styleUrl: './doctor-treatment-report.component.scss'
})
export class DoctorTreatmentReportComponent implements OnInit{
  page = 1;
  perPage = 50;
  total = 0;
  icons = freeSet;
  allConsultationTreatmentList: Array<any> = [];
  allTreatmentList:Array<any>=[];
  selectedTreatment:any;
  form!:FormGroup;
  fromDate='';
  toDate='';
  treatment_id='';
  minDate = new Date();
  constructor(private _receptionistService: ReceptionistService, private _adminService:AdminService, private fb:FormBuilder) { }

  ngOnInit() {
    this.getAllTreatmentList();
    this.createForm()
  }
  createForm(){
    this.form = this.fb.group({
      fromDate:['',[this.dateValidator]],
      toDate:['',[this.dateValidator]],
      treatment_id:["null"]
    });
  }
  dateValidator(control:any) {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours to 0 to compare dates without time
    return selectedDate <= today ? null : { futureDate: true };
}
  //get all Treatment List...
  getAllTreatmentReportList() {
    this._receptionistService.getAllTreatmentReportList(this.page, this.perPage, this.fromDate,this.toDate,this.treatment_id).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allConsultationTreatmentList = res.data;
          this.total = res.pagination.total;
        }
      }
    });
  }
  //get treatment list...
  getAllTreatmentList(){
    this._adminService.getAllTreatmentListWma().subscribe({
      next:(res:any)=>{
        if (res.data.length>0) {
          this.allTreatmentList = res.data;
        } else {
          this.allTreatmentList = [];
        }
      }
    })
  }
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getAllTreatmentList();
  }
  submitFilter(){
    console.log(this.form.value);
    this.fromDate = this.form.value.fromDate;
    this.toDate = this.form.value.toDate;
    this.treatment_id = this.form.value.treatment_id;
    this._receptionistService.getAllTreatmentReportList(this.page, this.perPage, this.fromDate, this.toDate, this.treatment_id ).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allConsultationTreatmentList = res.data;
          this.total = res.pagination.total;
        }else{
          this.allConsultationTreatmentList = []
        }
      }
    });
  }
}