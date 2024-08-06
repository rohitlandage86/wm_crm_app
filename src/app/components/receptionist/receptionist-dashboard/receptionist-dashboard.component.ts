import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { PageEvent } from '@angular/material/paginator';
import { ReceptionistService } from './../receptionist.service';

@Component({
  selector: 'app-receptionist-dashboard',
  templateUrl: './receptionist-dashboard.component.html',
  styleUrl: './receptionist-dashboard.component.scss'
})
export class ReceptionistDashboardComponent implements OnInit {
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

  constructor(private _receptionistService: ReceptionistService, private cdr: ChangeDetectorRef) { this.follow_up_date = ''; }
  ngOnInit() {
    this.setTodayDate();
    this.getAllLeadFollowUpList();
    this.getReceptionistDashboardCount();
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
}
