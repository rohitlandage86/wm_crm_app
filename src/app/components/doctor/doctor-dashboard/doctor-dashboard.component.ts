
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReceptionistService } from '../../receptionist/receptionist.service';
import { freeSet } from '@coreui/icons';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.scss'
})
export class DoctorDashboardComponent implements OnInit {
  allLeadFollowUpList: Array<any> = [];
  firstCardContent: any;
  icons = freeSet;
  page = 1;
  perPage = 10;
  total = 0;
  follow_up_date: string;
  monthly_datewise_patient_registration: any
  chartBarData: any
  month_array: Array<any> = [];
  patientCount_array: Array<any> = [];
  callLogsCount: any = {}
  todayCallLogsList: Array<any> = [];
  totalCallLog = 0;
  pageCallLog = 1;
  perPageCallLog = 10;
  form!: FormGroup;
  call_type = '';
  employee_id = '';
  allEmployeeList: Array<any> = [];
  allCallTypeList: Array<any> = [
    { call_type: 'INCOMING', },
    { call_type: 'OUTGOING', },
    { call_type: 'MISSED', },
    { call_type: 'REJECTED', }
  ]
  constructor(private _receptionistService: ReceptionistService, private cdr: ChangeDetectorRef, private _doctorService: DoctorService, private fb: FormBuilder) { this.follow_up_date = ''; }
  ngOnInit() {
  
    
    this.createForm()
    this.setTodayDate();
    this.getAllLeadFollowUpList();
    this.getReceptionistDashboardCount();
    this.getCallLogsCount()
    this.getTodayCallLogs()
    this.getEmployeeList()
  }
  createForm() {
    this.form = this.fb.group({
      calling_type: [''],
      employee_id: [''],
    });
  }
  getReceptionistDashboardCount() {
    this._receptionistService.getReceptionistDashboardCount().subscribe((data: any) => {
      this.firstCardContent = data;
      this.cdr.detectChanges(); // Trigger change detection
      this.monthly_datewise_patient_registration = data.monthly_datewise_patient_registration
      const month_array = this.monthly_datewise_patient_registration.map((re: any) => {
        this.month_array.push(re.registrationDate);
        this.patientCount_array.push(re.registrationCount)
      });
      this.chartBarData = {
        labels: this.month_array,
        datasets: [
          {
            label: 'Monthly Patients Registration',
            backgroundColor: ['#b9e2b6', '#bca0dd', '#414572', '#f7ad0d', '#ffe4e1', '#512467', '#83d4ba'],
            data: this.patientCount_array
          }
        ]
      };
    });
  }

  setTodayDate() {
    const today = new Date();
    // Format the date as per your backend requirement
    this.follow_up_date = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
  }
  //get all LeadFollowUp List...
  getAllLeadFollowUpList() {
    this._receptionistService.getAllLeadFollowUpList(this.page, this.perPage, this.follow_up_date).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allLeadFollowUpList = res.data;
          this.total = res.pagination.total;
        }
      }
    });
  }
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getAllLeadFollowUpList();
  }
  //get call logs 
  getCallLogsCount() {
    this._receptionistService.getReceptionistDashboardCallLogsCount().subscribe({
      next: (res: any) => {
        this.callLogsCount = res;
      }
    })
  }
  //get Today call logs
  getTodayCallLogs() {
    this._receptionistService.getReceptionistDashboardTodayCallLogs(this.pageCallLog, this.perPageCallLog, this.follow_up_date, this.call_type, this.employee_id).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.todayCallLogsList = res.data;
          this.totalCallLog = res.pagination.total;
        } else {
          this.todayCallLogsList = []
          this.totalCallLog = 0
        }
      }
    })
  }
  onPageCalllogChange(event: PageEvent): void {
    this.pageCallLog = event.pageIndex + 1;
    this.perPageCallLog = event.pageSize;
    this.getTodayCallLogs();
  }
  //get all employee list 
  getEmployeeList() {
    this._doctorService.getAllEmoloyeesListWma().subscribe({
      next: (res: any) => {
        this.allEmployeeList = res.data;
      }
    })
  }
  submitFilter() {
    this.call_type = this.form.value.calling_type;
    this.employee_id = this.form.value.employee_id;
    this.getTodayCallLogs();
  }
  transform(cts: any) {
    if (!cts) {
      return;
    }
    return cts.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  }
  
}