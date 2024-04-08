
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReceptionistService } from '../../receptionist/receptionist.service';
import { Observable } from 'rxjs';
import { CanvasJS } from '@canvasjs/angular-charts';


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
chartOptions = {
  title:{
    text: "Monthly Lead"  
  },
  animationEnabled: true,
  data: [{        
    type: "column",
    dataPoints: this.monthly_datewise_patient_registration
    
  }]
  
  
}

addSymbols(e: { value: string | number; }) {
  const suffixes = ["", "K", "M", "B"];

  let order = Math.max(Math.floor(Math.log(Math.abs(Number(e.value))) / Math.log(1000)), 0);
  if (order > suffixes.length - 1)
    order = suffixes.length - 1;

  const suffix = suffixes[order];
  // Ensure e.value is properly converted to a number
  return CanvasJS.formatNumber(Number(e.value) / Math.pow(1000, order)) + suffix;
}


}

