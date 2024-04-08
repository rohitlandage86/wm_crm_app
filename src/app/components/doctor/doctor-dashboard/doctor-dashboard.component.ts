
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReceptionistService } from '../../receptionist/receptionist.service';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.scss'
})
export class DoctorDashboardComponent implements OnInit{
  allReceptionistDashboardCount: Array<any> = [];
  firstCardContent: any;
  monthly_datewise_patient_registration : Array<any> = [];
  constructor(private _receptionistService: ReceptionistService,  private cdr: ChangeDetectorRef) {  }

  ngOnInit() {
    this.getReceptionistDashboardCount()
 }
 getReceptionistDashboardCount() {
   this._receptionistService.getReceptionistDashboardCount().subscribe((data: any) => {
    this.firstCardContent = data;
    console.log('chart data',data);
    this.monthly_datewise_patient_registration =data.monthly_datewise_patient_registration
    console.log('monthly data',data.monthly_datewise_patient_registration);
    
});
}
  
}





