import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { ReceptionistService } from './../receptionist.service';
import { Observable } from 'rxjs';
import { CanvasJS } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-receptionist-dashboard',
  templateUrl: './receptionist-dashboard.component.html',
  styleUrl: './receptionist-dashboard.component.scss'
})
export class ReceptionistDashboardComponent implements OnInit {
  allLeadFollowUpList: Array<any> = [];
  allReceptionistDashboardCount: Array<any> = [];
  firstCardContent: any;
  icons = freeSet;
  page = 1;
  perPage = 10;
  total = 0;
  lead_date: string;
  color: string | undefined;
  constructor(private _receptionistService: ReceptionistService, private _toastrService: ToastrService,private cdr: ChangeDetectorRef) { this.lead_date = ''; }

  ngOnInit() {
    this.setTodayDate();
    this.getAllLeadFollowUpList();
    this.getReceptionistDashboardCount();
    this.getReceptionistDashboardCount().subscribe((data: any) => {
      this.firstCardContent = data;
      console.log(data);
      this.cdr.detectChanges(); // Trigger change detection
  });
  }
 
  getReceptionistDashboardCount(): Observable<any> {

    return this._receptionistService.getReceptionistDashboardCount();
 }

  setTodayDate() {
    const today = new Date();
    // Format the date as per your backend requirement
    this.lead_date = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
  }
  //get all LeadFollowUp List...
  getAllLeadFollowUpList() {
    this._receptionistService.getAllLeadFollowUpList(this.page, this.perPage, this.lead_date).subscribe({
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
  chartOptions = {
    title:{
      text: "Angular Column Chart"  
    },
    animationEnabled: true,
    data: [{        
      type: "column",
      dataPoints: [
        { x: 10, y: 71 },
        { x: 20, y: 55 },
        { x: 30, y: 50 },
        { x: 40, y: 65 },
        { x: 50, y: 95 },
        { x: 60, y: 68 },
        { x: 70, y: 28 },
        { x: 80, y: 34 },
        { x: 90, y: 14 }
      ]
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
