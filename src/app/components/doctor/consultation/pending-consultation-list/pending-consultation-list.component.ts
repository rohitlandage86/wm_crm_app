import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { DoctorService } from '../../doctor.service';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pending-consultation-list',
  templateUrl: './pending-consultation-list.component.html',
  styleUrl: './pending-consultation-list.component.scss'
})
export class PendingConsultationListComponent implements OnInit {
  allPatientVisitList: Array<any> = [];
  firstCardContent: any;
  icons = freeSet;
  page = 1;
  perPage = 50;
  total = 0;

  color: string | undefined;
  patientData: any = {};
  constructor(private _doctorService: DoctorService, private _toastrService: ToastrService,) {  }

  ngOnInit() {
    this.getAllPatientVisitLists();
  }
  //get all Patient Visit List...
  getAllPatientVisitLists() {
    this._doctorService.getAllPatientVisitLists(this.page, this.perPage,null).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allPatientVisitList = res.data;
          this.total = res.pagination.total;
        } else {
          this.allPatientVisitList = [];
          this.total = 0;
        }
      }
    });
  }
 
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getAllPatientVisitLists();
  }

  //table column visit type name show changes 
  transformVisitType(visitType: string): string {
    switch (visitType) {
      case 'FIRST_VISIT':
        return 'First Visit';
      case 'Follow_UP':
        return 'Follow Up';
      case 'RE_VISIT':
        return 'Re Visit';

      default:
        return visitType;
    }
  }
 
}
