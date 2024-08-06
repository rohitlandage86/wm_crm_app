import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { freeSet } from '@coreui/icons';
import { PageEvent } from '@angular/material/paginator';
import { DoctorService } from '../../doctor.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-calling-list-report',
  templateUrl: './calling-list-report.component.html',
  styleUrl: './calling-list-report.component.scss'
})
export class CallingListReportComponent implements OnInit{
  pageCallLog = 1;
  perPageCallLog = 50;
  totalCallLog = 0;
  icons = freeSet;
  callLogsList: Array<any> = [];
  form!:FormGroup;
  fromDate='';
  toDate='';
  call_type=''
  employee_id =''
  allEmployeeList: Array<any> = [];
 allCallTypeList:Array<any>=[
  {call_type:'INCOMING',},
  {call_type:'OUTGOING',},
  {call_type:'MISSED',},
  {call_type:'REJECTED',}
 ]
 searchControl: FormControl = new FormControl('');
 searchTerm: string = '';
 searchTimer: any;
  constructor(private _doctorService: DoctorService, private fb:FormBuilder) { }

  ngOnInit() {
    this.createForm();
    this.searchControl.valueChanges
    .pipe(debounceTime(300))
    .subscribe((searchTerm: string) => {
      clearTimeout(this.searchTimer);
      this.searchTerm = searchTerm;
      this.searchTimer = setTimeout(() => {
        this.submitFilter();
      }, 1000); // Set timeout to 5 seconds (5000 milliseconds)
    });
    this.getEmployeeList();
  }
  createForm(){
    this.form = this.fb.group({
      calling_type:[''],
      employee_id:[''],
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
  onPageChange(event: PageEvent): void {
    this.pageCallLog = event.pageIndex + 1;
    this.perPageCallLog = event.pageSize;
    this.submitFilter();
  }

  //get all employee list 
  getEmployeeList() {
    this._doctorService.getAllEmoloyeesListWma().subscribe({
      next:(res:any)=>{
        this.allEmployeeList = res.data;
      }
    })
  }
  submitFilter(){
    this.fromDate = this.form.value.fromDate;
    this.toDate = this.form.value.toDate;
    this.call_type = this.form.value.calling_type;
    this.employee_id = this.form.value.employee_id;
    
    this._doctorService.getCallLogsList(this.pageCallLog, this.perPageCallLog, this.fromDate,this.toDate, this.call_type, this.searchTerm, this.employee_id ).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.callLogsList = res.data;
          this.totalCallLog = res.pagination.total;
        }else{
          this.callLogsList = []
        }
      }
    });
  }
}
