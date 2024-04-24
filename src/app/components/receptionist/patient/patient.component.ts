import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { PageEvent } from '@angular/material/paginator';
import { ReceptionistService } from './../receptionist.service';
import { AdminService } from '../../admin/admin.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss'
})
export class PatientComponent implements OnInit {
  allPatientVisitList: Array<any> = [];
  allPatientVisitCheckedList: Array<any> = [];
  icons = freeSet;
  page = 1;
  perPage = 10;
  total = 0
  color: string | undefined;
  mrno: any;
  visitType: any;
  constructor(private _adminService: AdminService,private _toastrService: ToastrService,private _receptionistService: ReceptionistService, private router: Router,) { }

  ngOnInit() {
    this.getAllPatientVisitList();
    this.getAllPatientVisitCheckedLists();
  }
  //get all PatientVisit List...
  getAllPatientVisitList() {
    this._adminService.getAllPatientVisitList(this.page, this.perPage).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allPatientVisitList = res.data;
          this.total = res.pagination.total;
        }
      }
    });
  }
  getAllPatientVisitCheckedLists() {
    // this._doctorService.getAllPatientVisitCheckedLists(this.page, this.perPage).subscribe({
    //   next: (res: any) => {
    //     if (res.data.length > 0) {
    //       this.allPatientVisitCheckedList = res.data;
    //       console.log('Checked',res.data);
  
    //       this.total = res.pagination.total;
    //     }
    //   }
    // });
  }
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getAllPatientVisitList();
    this.getAllPatientVisitCheckedLists();
  }
  //get is Patient search data
  getSearchPatient(searchQuery: string): void {
    // Make API call with the search query
    this._receptionistService.getAllSearchPatientRegistrationList(this.page, this.perPage, searchQuery).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          const patient = res.data[0]; // Assuming you only expect one patient in the response
          this.mrno =  res.data[0].mrno;
          this.total = res.pagination.total;
          const message = `Patient Name: ${patient.patient_name} MRNO: ${patient.mrno  }`;
          Swal.fire({
            title: "Patient Details Found!",
            text: message,
            icon: "success",
            showCancelButton: true,
            confirmButtonText: "OK"
          }).then((result) => {
            if (result.isConfirmed) {
              this.submit();
            }
          });
        } else {
          Swal.fire({
            title: "Patient Not Found!",
            text: "No patient found with the provided details.",
            icon: "warning"
          });
        }
      },
      error: (err: any) => {
        Swal.fire({
          title: "Error!",
          text: "Failed to retrieve patient details.",
          icon: "error"
        });
      }
    });
  }
  // Other properties and methods
  isValidName(inputValue: string): boolean {
    const namePattern = /^[A-Za-z\s]+$/;
    return namePattern.test(inputValue);
  }
  validateMobileNo(inputValue: string): boolean {
    const mobileNumberPattern = /^\d{10}$/;
    return mobileNumberPattern.test(inputValue);
  }

  isValidInput(inputValue: string): boolean {
    return this.validateMobileNo(inputValue) || this.isValidName(inputValue);
  }
// Patient Revist type change
submit() {
  // Assuming this.visitType contains the updated visit type
  const updatedData = { "visit_type":"RE_VISIT"};

  this._receptionistService.editPatientRevist(this.mrno, updatedData).subscribe({
    next: (res: any) => {
      if (res.status == 200) {
        this._toastrService.success(res.message);
        this.getAllPatientVisitList();
        this.router.navigate(['/receptionist', { outlets: { receptionist_Menu: 'patient' } }], { skipLocationChange: true }).then(() => {
          this.router.navigate(['/receptionist', { outlets: { receptionist_Menu: 'patient' } }]);
        });
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

}
