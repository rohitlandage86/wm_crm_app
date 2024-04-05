
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';


@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.scss'
})
export class DoctorDashboardComponent implements OnInit{
  allReceptionistDashboardCount: Array<any> = [];
  firstCardContent: any;
  constructor( private _doctorService:DoctorService,  private cdr: ChangeDetectorRef) {  }

  ngOnInit() {

  //   this.getReceptionistDashboardCount().subscribe((data: any) => {
  //     this.firstCardContent = data;
  //     console.log(data);
  //     this.cdr.detectChanges(); // Trigger change detection
  // });
  }
 
//   getReceptionistDashboardCount(): Observable<any> {

//     return this._receptionistService.getReceptionistDashboardCount();
//  }





 


}

