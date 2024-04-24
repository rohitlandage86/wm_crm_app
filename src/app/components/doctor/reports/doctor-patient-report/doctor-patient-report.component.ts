import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { freeSet } from '@coreui/icons';
import { AdminService } from 'src/app/components/admin/admin.service';
import { PageEvent } from '@angular/material/paginator';
import { ReceptionistService } from 'src/app/components/receptionist/receptionist.service';

@Component({
  selector: 'app-doctor-patient-report',
  templateUrl: './doctor-patient-report.component.html',
  styleUrl: './doctor-patient-report.component.scss'
})
export class DoctorPatientReportComponent implements OnInit{
  page = 1;
  perPage = 10;
  total = 0;
  icons = freeSet;
  form!:FormGroup;
  allPatientRegistrationsList: Array<any> = [];
  allGenderList:Array<any>=[{gender:'FEMALE'},{gender:'MALE'},{gender:'OTHER'}];
  allEntityList:Array<any>=[];
  allSourceOfPatientList:Array<any>=[];
  allReferedByList:Array<any>=[];
  allEmployeeList:Array<any>=[];
  fromDate='';
  toDate='';
  gender='';
  entity_id='';
  source_of_patient_id='';
  refered_by_id='';
  employee_id='';
  minDate = new Date();
  constructor(private _receptionistService: ReceptionistService,private _adminService:AdminService, private fb:FormBuilder) { }

  ngOnInit() {
    this.getAllEntityList();
    this.getAllSourceOfPatientList();
    this.getAllReferedByList();
    this.getAllEmployeeList();
    this.createForm()
  }
  createForm(){
    this.form = this.fb.group({
      fromDate:['',[this.dateValidator]],
      toDate:['',[this.dateValidator]],
      gender:["null"],
      entity_id:["null"],
      source_of_patient_id:["null"],
      refered_by_id:["null"],
      employee_id:["null"]
    });
  }
  dateValidator(control:any) {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours to 0 to compare dates without time
    return selectedDate <= today ? null : { futureDate: true };
}
  //get all Patient registration List...
  getAllPatientRegistrationList() {
    this._receptionistService.getAllPatientList(this.page, this.perPage, this.fromDate,this.toDate,this.entity_id, '', '','','').subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allPatientRegistrationsList = res.data;
          this.total = res.pagination.total;
        }else{
          this.allPatientRegistrationsList =[];
          this.total = 0;
        }
      }
    });
  }
  //get entity list...
  getAllEntityList(){
    this._adminService.getAllEntitiesListWma().subscribe({
      next:(res:any)=>{
        if (res.data.length>0) {
          this.allEntityList = res.data;
        } else {
          this.allEntityList = [];
        }
      }
    })
  }
    //get Source of Patient list...
    getAllSourceOfPatientList(){
      this._adminService.getAllSourceOfPatientListWma().subscribe({
        next:(res:any)=>{
          if (res.data.length>0) {
            this.allSourceOfPatientList = res.data;
          } else {
            this.allSourceOfPatientList = [];
          }
        }
      })
    }
      //get refered by list...
  getAllReferedByList(){
    this._adminService.getAllReferedByListWma().subscribe({
      next:(res:any)=>{
        if (res.data.length>0) {
          this.allReferedByList = res.data;
        } else {
          this.allReferedByList = [];
        }
      }
    })
  }
    //get employee list...
    getAllEmployeeList(){
      this._adminService.getAllEmployeeListWma().subscribe({
        next:(res:any)=>{
          if (res.data.length>0) {
            this.allEmployeeList = res.data;
          } else {
            this.allEmployeeList = [];
          }
        }
      })
    }
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getAllPatientRegistrationList();
  }
  submitFilter(){
    this.fromDate = this.form.value.fromDate;
    this.toDate = this.form.value.toDate;
    this.gender = this.form.value.gender;
    this.entity_id = this.form.value.entity_id;
    this.source_of_patient_id = this.form.value.source_of_patient_id;
    this.refered_by_id = this.form.value.refered_by_id;
    this.employee_id = this.form.value.employee_id;
    this._receptionistService.getAllPatientList(this.page, this.perPage, this.fromDate, this.toDate, this.gender, this.entity_id,this.source_of_patient_id,this.refered_by_id,this.employee_id ).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allPatientRegistrationsList = res.data;
          this.total = res.pagination.total;
        }else{
          this.allPatientRegistrationsList = [];
          this.total = 0
        }
      }
    });
  }
}
