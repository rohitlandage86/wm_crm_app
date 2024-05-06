import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { PageEvent } from '@angular/material/paginator';
import { ReceptionistService } from './../receptionist.service';
import { AdminService } from '../../admin/admin.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../../doctor/doctor.service';
import { MatDialog } from '@angular/material/dialog';
import { SearchPatientRevisitComponent } from './search-patient-revisit/search-patient-revisit.component';

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
  perPage = 50;
  total = 0
  color: string | undefined;
  mrno: any;
  lead_date: string;
  visitType: any;
  constructor(private _adminService: AdminService,private _toastrService: ToastrService,private _receptionistService: ReceptionistService,private dialog: MatDialog, private router: Router,   private _doctorService: DoctorService,) {  this.lead_date = ''; }

  ngOnInit() {
    this.setTodayDate();
    this.getAllPatientVisitList();
    this.getAllPatientVisitCheckedLists();
   
  }

  setTodayDate() {
    const today = new Date();
    // Format the date as per your backend requirement
    this.lead_date = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
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
    this._doctorService.getAllPatientVisitCheckedLists(this.page, this.perPage,this.lead_date).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allPatientVisitCheckedList = res.data;
          this.total = res.pagination.total;
        }
      }
    });
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
        console.log('data =',res);
        
        if (res.data.length === 1) {
          const patient = res.data[0];
          this.mrno = patient.mrno;
          this.total = res.pagination.total;
          let message = `1. Patient Name: ${patient.patient_name} & 2.MRNO: ${patient.mrno}`;
          // Check if patientIsrenewly is 0
          if (patient.patientIsrenewly === 0) {
            message = "\n  Warning: Case paper expired!";
            Swal.fire({
              title: "Renew Case Paper...!",
              text: message,
              icon: "warning", 
              showCancelButton: true,
              confirmButtonText: "Renew",
              cancelButtonText: "Cancel", 
            }).then((result) => {
              if (result.isConfirmed) {
                // Handle renewal action here
                this.renew();
              }
            });
          } else {
            // If patientIsrenewly is not 0, show the default success message
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
          }
        } else if (res.data.length > 1) {
          // Open MatDialog with multiple patients
          const dialogRef = this.dialog.open(SearchPatientRevisitComponent, {
            width: '70%',
            data: { patients: res.data } // Pass the array of patients to your dialog
            
          });
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            // Dialog box close hone ke baad yaha page reload kar sakte hain
            this.reloadPage();
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
// Patient Renew  change case paper
renew(){ 
  const updatedData = { "visit_type":"RE_VISIT"};

this._receptionistService.PatientRenew(this.mrno, updatedData).subscribe({
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
// Patient Revisit type change
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
reloadPage() {
  this.getAllPatientVisitList();
}
}
