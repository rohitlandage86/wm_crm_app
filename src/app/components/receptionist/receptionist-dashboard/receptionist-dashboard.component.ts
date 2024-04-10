import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { ReceptionistService } from './../receptionist.service';
import { Observable } from 'rxjs';
import { DoctorService } from '../../doctor/doctor.service';

@Component({
  selector: 'app-receptionist-dashboard',
  templateUrl: './receptionist-dashboard.component.html',
  styleUrl: './receptionist-dashboard.component.scss'
})
export class ReceptionistDashboardComponent implements OnInit {
  allLeadFollowUpList: Array<any> = [];
  allReceptionistDashboardCount: Array<any> = [];
  allAppointmentList: Array<any> = [];
  firstCardContent: any;
  icons = freeSet;
  page = 1;
  perPage = 10;
  total = 0;
  follow_up_date: string;
  appointment_date: string;
  color: string | undefined;
  monthly_datewise_patient_registration: any
  chartBarData: any
  month_array: Array<any> = [];
  patientCount_array: Array<any> = [];
  constructor(private _doctorService: DoctorService, private _receptionistService: ReceptionistService, private _toastrService: ToastrService, private cdr: ChangeDetectorRef) { this.follow_up_date = ''; this.appointment_date = ''; }

  ngOnInit() {
    this.setTodayDate();
    this.getAllLeadFollowUpList();
    this.getAllAppointmentList();
    this.getReceptionistDashboardCount();
    this.getReceptionistDashboardCount().subscribe((data: any) => {
      this.firstCardContent = data;
      console.log(data);
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

  getReceptionistDashboardCount(): Observable<any> {

    return this._receptionistService.getReceptionistDashboardCount();
  }

  setTodayDate() {
    const today = new Date();
    // Format the date as per your backend requirement
    this.follow_up_date = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
    this.appointment_date = `${today.getFullYear()}-${(today.getMonth() + 1)
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
    this.getAllAppointmentList();
  }
  //get all Appointment List...
  getAllAppointmentList() {
    this._doctorService.getAllAppointmentList(this.page, this.perPage, this.appointment_date).subscribe({
      next: (res: any) => {
        console.log('appointment', res);

        if (res.data.length > 0) {
          this.allAppointmentList = res.data;
          this.total = res.pagination.total;
        }
      }
    });
  }

  //slide-toggle change Patient
  changeEvent(event: any, id: any) {
    let status = 0;
    if (event.checked) {
      status = 1;
    }
    this._receptionistService.onPatientStatusChange(status, id).subscribe({
      next: (res: any) => {
        this._toastrService.success(res.message);
        this.getAllLeadFollowUpList();
      },
      error: (error: any) => {
        if (error.status == 422) {
          this._toastrService.warning(error.message);
          this.getAllLeadFollowUpList();
        }
      },
    })


  }
}
