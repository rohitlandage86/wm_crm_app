import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { freeSet } from '@coreui/icons';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/components/admin/admin.service';
import { ReceptionistService } from 'src/app/components/receptionist/receptionist.service';

@Component({
  selector: 'app-doctor-diagnosis-report',
  templateUrl: './doctor-diagnosis-report.component.html',
  styleUrl: './doctor-diagnosis-report.component.scss'
})
export class DoctorDiagnosisReportComponent implements OnInit{
  page = 1;
  perPage = 10;
  total = 0;
  icons = freeSet;
  allConsultationDiagnosisList: Array<any> = [];
  allDiagnosisList:Array<any>=[];
  selectedDiagnosis:any;
  form!:FormGroup;
  fromDate='';
  toDate='';
  diagnosis_id='';
  minDate = new Date();
  constructor(private _receptionistService: ReceptionistService, private _toastrService: ToastrService, private _adminService:AdminService, private fb:FormBuilder) { }

  ngOnInit() {
    // this.getAllDiagnosisReportList();
    this.getAllDiagnosisList();
    this.createForm()
  }
  createForm(){
    this.form = this.fb.group({
      fromDate:['',[this.dateValidator]],
      toDate:['',[this.dateValidator]],
      diagnosis_id:["null"]
    });
  }
  dateValidator(control:any) {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours to 0 to compare dates without time
    return selectedDate <= today ? null : { futureDate: true };
}
  //get all Diagnosis List...
  getAllDiagnosisReportList() {
    this._receptionistService.getAllDiagnosisReportList(this.page, this.perPage, this.fromDate,this.toDate,this.diagnosis_id).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allConsultationDiagnosisList = res.data;
          this.total = res.pagination.total;
        }
      }
    });
  }
  //get diagnosis list...
  getAllDiagnosisList(){
    this._adminService.getAllDiagnosisListWma().subscribe({
      next:(res:any)=>{
        if (res.data.length>0) {
          this.allDiagnosisList = res.data;
        } else {
          this.allDiagnosisList = [];
        }
      }
    })
  }
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getAllDiagnosisList();
  }
  submitFilter(){
    console.log(this.form.value);
    this.fromDate = this.form.value.fromDate;
    this.toDate = this.form.value.toDate;
    this.diagnosis_id = this.form.value.diagnosis_id;
    this._receptionistService.getAllDiagnosisReportList(this.page, this.perPage, this.fromDate, this.toDate, this.diagnosis_id ).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allConsultationDiagnosisList = res.data;
          this.total = res.pagination.total;
        }else{
          this.allConsultationDiagnosisList = []
        }
      }
    });
    
  }
}