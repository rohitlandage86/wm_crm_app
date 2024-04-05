
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

 }
}

