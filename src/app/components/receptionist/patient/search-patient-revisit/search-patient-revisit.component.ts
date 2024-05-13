import { Component, Inject, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReceptionistService } from '../../receptionist.service';
import { DoctorService } from 'src/app/components/doctor/doctor.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PatientComponent } from '../patient.component';
import { AdminService } from 'src/app/components/admin/admin.service';

@Component({
  selector: 'app-search-patient-revisit',
  templateUrl: './search-patient-revisit.component.html',
  styleUrl: './search-patient-revisit.component.scss'
})
export class SearchPatientRevisitComponent implements OnInit {
  allPatientVisitList: Array<any> = [];
  icons = freeSet;
  page = 1;
  perPage = 50;
  total = 0;
  color: string | undefined;
  mrno: any;
  lead_date: string;
  visitType: any;
  constructor(private _adminService: AdminService, private dialogRef: MatDialogRef<PatientComponent>,private _toastrService: ToastrService,private _receptionistService: ReceptionistService, private router: Router,   private _doctorService: DoctorService,@Inject(MAT_DIALOG_DATA) public data: any) {  
    this.lead_date = '';    this.allPatientVisitList = data.patients;
  }

  ngOnInit() {
    this.setTodayDate();
    if (this.data) {
      this.total = this.data.patients.length;    
    }
  }

  setTodayDate() {
    const today = new Date();
    // Format the date as per your backend requirement
    this.lead_date = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    event.length = this.total;
  }
  getAllPatientVisitList() {
    this._adminService.getAllPatientVisitList(this.page, this.perPage, null).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allPatientVisitList = res.data;
          this.total = res.pagination.total;
        }
      }
    });
  }
 
// Patient Revist type change
submit(mrno:any) {
  // Assuming this.visitType contains the updated visit type
  const updatedData = { "visit_type":"RE_VISIT"};
  console.log("revisit");
  this._receptionistService.editPatientRevist(mrno, updatedData).subscribe({
    next: (res: any) => {
      if (res.status == 200) {
        this._toastrService.success(res.message);
        this.getAllPatientVisitList(),
        this.closeDialog("Revisit");
      } else {
        this._toastrService.warning(res.message);
      }
    },
    error: (err: any) => {
      if (err.error.status == 401 || err.error.status == 422) {
        this._toastrService.warning(err.error.message);
      } else {
        this._toastrService.error("Internal Server Error");
      }
    },
  });
}

// Patient Renew change case paper
renew(mrno:any){
const updatedData = { "visit_type":"RE_VISIT"};
this._receptionistService.PatientRenew(mrno, updatedData).subscribe({
  next: (res: any) => {
    if (res.status == 200) {
      this._toastrService.success(res.message);
      this.getAllPatientVisitList();
      this.closeDialog("Renew");
    } else {
      this._toastrService.warning(res.message);
    }
  },
  error: (err: any) => {
    if (err.error.status == 401 || err.error.status == 422) {
      this._toastrService.warning(err.error.message);
    } else {
      this._toastrService.error("Internal Server Error");
    }
  },
});
}
closeDialog(message?: any) {
  this.dialogRef.close(message);
  // window.location.reload();
  
}
}
