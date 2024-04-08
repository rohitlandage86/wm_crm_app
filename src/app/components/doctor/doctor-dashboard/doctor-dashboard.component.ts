
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReceptionistService } from '../../receptionist/receptionist.service';
import { freeSet } from '@coreui/icons';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.scss'
})
export class DoctorDashboardComponent implements OnInit {
  allReceptionistDashboardCount: Array<any> = [];
  firstCardContent: any;
  monthly_datewise_patient_registration: any
  chartBarData: any
  month_array: Array<any> = [];
  patientCount_array: Array<any> = [];
  allLeadFollowUpList: Array<any> = [];

  icons = freeSet;
  page = 1;
  perPage = 10;
  total = 0;
  follow_up_date: string;
  color: string | undefined;
  constructor(private _receptionistService: ReceptionistService, private cdr: ChangeDetectorRef) { this.follow_up_date = '';}

  ngOnInit() {
    this.getReceptionistDashboardCount()
  }
  getReceptionistDashboardCount() {
    this._receptionistService.getReceptionistDashboardCount().subscribe((data: any) => {
      this.firstCardContent = data;
      console.log('chart data', data);
      this.monthly_datewise_patient_registration = data.monthly_datewise_patient_registration
      const month_array = this.monthly_datewise_patient_registration.map((re: any) => {
        this.month_array.push(re.registrationDate);
        this.patientCount_array.push(re.registrationCount)


      });
      this.chartBarData = {
        labels: this.month_array,
        datasets: [
          {
            label: 'Patients Registration Count',
            backgroundColor: '#f87979',
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
        console.log(res);

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





