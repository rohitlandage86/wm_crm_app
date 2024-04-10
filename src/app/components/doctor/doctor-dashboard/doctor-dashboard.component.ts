
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReceptionistService } from '../../receptionist/receptionist.service';
import { freeSet } from '@coreui/icons';
import { PageEvent } from '@angular/material/paginator';
import { DoctorService } from '../doctor.service';

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
  allAppointmentList: Array<any> = [];

  icons = freeSet;
  page = 1;
  perPage = 10;
  total = 0;
  appointment_date: string;
  color: string | undefined;
  constructor(private _doctorService:DoctorService,private _receptionistService: ReceptionistService, private cdr: ChangeDetectorRef) { this.appointment_date = '';}

  ngOnInit() {
    this.setTodayDate();
    this.getAllAppointmentList();
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
    this.appointment_date = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
  }
  //get all Appointment List...
  getAllAppointmentList() {
    this._doctorService.getAllAppointmentList(this.page, this.perPage, this.appointment_date).subscribe({
      next: (res: any) => {
        console.log('appointment',res);

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

}





