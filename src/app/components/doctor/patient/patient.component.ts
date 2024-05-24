import { DoctorService } from './../doctor.service';
import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss',

})
export class PatientComponent implements OnInit {
  allPatientVisitList: Array<any> = [];
  allPatientVisitCheckedList: Array<any> = [];
  firstCardContent: any;
  icons = freeSet;
  page = 1;
  perPage = 50;
  total = 0;
  checkedpage = 1;
  checkedperPage = 50;
  checkedtotal = 0;
  lead_date: string;
  color: string | undefined;
  patientData: any = {};
  constructor(private _doctorService: DoctorService, private _toastrService: ToastrService,) { this.lead_date = ''; }

  ngOnInit() {
    this.setTodayDate();
    this.getAllPatientVisitCheckedLists();
    this.getAllPatientVisitLists();
  }
  setTodayDate() {
    const today = new Date();
    // Format the date as per your backend requirement
    this.lead_date = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

  }
  //get all Patien tVisit List...
  getAllPatientVisitLists() {
    this._doctorService.getAllPatientVisitLists(this.page, this.perPage,this.lead_date,'').subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allPatientVisitList = res.data;
          this.total = res.pagination.total;
        }
      }
    });
  }
  getAllPatientVisitCheckedLists() {
    this._doctorService.getAllPatientVisitCheckedLists(this.page, this.perPage, this.lead_date).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allPatientVisitCheckedList = res.data;
          this.checkedtotal = res.pagination.total;
        }
      }
    });
  }
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    this.getAllPatientVisitLists();
  }
  onCheckedPageChange(event: PageEvent): void {
    this.checkedpage = event.pageIndex + 1;
    this.checkedperPage = event.pageSize;
    this.getAllPatientVisitCheckedLists();
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
  print(id: any) {
    this._doctorService.getConsultationById(id).subscribe((result: any) => {
      console.log(result);

      this.patientData = result.data

      let popupWin;
      popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
      const dateParts = this.patientData.cts.split('-');
      const formattedDate = `${dateParts[2].split('T')[0]}/${dateParts[1]}/${dateParts[0]}`;
      if (popupWin) {
        popupWin.document.open();
        popupWin.document.write(`
  <html>
  <head>
    <link href="assets/images/nirmiti.png" rel="icon" type="image/x-icon">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
      .pl-4 {
        padding-left: 4rem;
      }
  
      .table-bordered {
        border: 1px solid #000000 !important;
      }
  
      .img-fluid {
        max-width: 100%;
        height: auto;
      }
  
      table {
        font-size: 14px !important;
      }
  
      h3 {
        font-size: 1.3rem;
      }
    </style>
  </head>
  
  <body style="font-size: 14px!important" onload="window.print();window.close()">
    <section class="">
      <div class="container-fuild">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-12 col-xl-12 col-xxl-12 ">
            <header>
              <div class="row mb-3">
                <div class="col-12 col-lg-12 col-xl-12 col-xxl-12 ">
                  <a class="d-flex justify-content-center ">
                    <img src="../../../../../../assets/images/Nirmiti_English.png" class="img-fluid"
                      alt="BootstrapBrain Logo" width="200" height="100">
                  </a>
                  <h3 class="p-0 m-0 d-flex justify-content-center">Nirmiti Cosmetic Surgery Centre</h3>
                  <p class="p-0 m-0 d-flex justify-content-center"><span class="fw-bold">Address</span>: Shanti Sagar
                    Colony, 100 Feet Rd, near Shani Mandir, Sangli, Maharashtra
                    416415 </p>
                  <span class="d-flex justify-content-center">Contact: +91 8690069006, +91 9637222022</span>
                </div>
                <div class="col-12 col-lg-12 col-xl-12 col-xxl-12 ">
                  <address class="m-0">
                    <div class="row pl-4">
                      <div class="col-8">
                        <strong>Dr.Neeraj Bhaban</strong> <br>
                        M.S ( KEM Mumbai ) <br>MCh ( Plastic and Cosmetic surgery)
                      </div>
                      <div class="col-4">
                        <strong>Dr. Mayuri Bhaban</strong> <br>
                        Dip in Cosmetology and Trichology
                      </div>
                    </div>
                    <!-- E-Mail: nirmiticosmeticcentre&#64;gmail.com -->
                  </address>
                </div>
              </div>
              <hr style="border-top:3px solid #000000!important;">
            </header>
            <section>
              <div class="row mb-3 pl-4">
                <div class="col-8">
                  <div class="form-group">
                    <strong> MR NO. : </strong><label for=""> ${this.patientData.mrno_entity_series || '--'} </label>
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-group">
                  <strong> Date : </strong> <label for=""> ${formattedDate}</label>
                  </div>
                </div>
                <div class="col-8">
                  <div class="form-group">
                    <strong>Name : </strong> <label for=""> ${this.patientData.patient_name || '--'}</label>
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-group">
                    <strong>Age/Gender: </strong><label for="">
                      ${this.patientData.age || '--'}/${this.patientData.gender || '--'}</label>
                  </div>
                </div>
              </div>
              <div class="row mb-3 pl-4">
                <div class="col-3">
                  <div class="form-group">
                    <strong>Diagnosis Details:</strong>
                  </div>
                </div>
                <div class="col-9">
                  <div class="form-gr">
                    ${this.patientData.consultationDiagnosisDetails.map((item: any, i: number) => `
                    <label for="">
                      ${item.diagnosis_name || '--'}
                      <span>${i < (this.patientData.consultationDiagnosisDetails.length - 1) ? ',' : ''}</span>
                          <span>${i === (this.patientData.consultationDiagnosisDetails.length - 1) ? '.' : ''}</span>
                    </label>
                    `).join('')}
                  </div>
                </div>
              </div>
              <div class="row mb-3 pl-4">
                <div class="col-3">
                  <div class="form-group">
                    <strong>Treatment Details: </strong>
                  </div>
                </div>
                <div class="col-9">
                  <div class="form-gr">
                    ${this.patientData.consultationTreatmentDetails.map((item: any, i: number) => `
                    <label for="">
                      ${item.treatment_name || '--'}
                      <span>${i < (this.patientData.consultationTreatmentDetails.length - 1) ? ',' : ''}</span>
                          <span>${i === (this.patientData.consultationTreatmentDetails.length - 1) ? '.' : ''}</span>
                    </label>
                    `).join('')}
                  </div>
                </div>
              </div>
              <div class="row mb-3 pl-4">
                <div class="col-12">
                  <div class="table-responsive">
                    <table class="table table-striped table-bordered">
                      <thead>
                        <tr>
                          <th scope="col" class="text-uppercase">Medicine</th>
                          <th scope="col" class="text-uppercase">Dosage</th>
                          <th scope="col" class="text-uppercase text-center">Days</th>
                          <th scope="col" class="text-uppercase">Instructions</th>
                        </tr>
                      </thead>
                      <tbody class="table-group-divider">
                        ${this.patientData.consultationMedicineDetails.map((item: any) => `
                        <tr>
                          <td>${item.medicines_name || '--'}</td>
                          <td>${item.dosage_name || '--'}</td>
                          <td class="text-center">${item.days || '--'}</td>
                          <td>${item.instruction || '--'}</td>
                        </tr>
                        `).join('')}
  
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
            <div class="row mb-3 pl-4">
              <div class="col-12">
                Note:
                <br> <br> <br> <br>
                <br> <br> <br> <br>
              </div>
            </div>
            <footer>
              <div class="row">
                <div class="col-6 text-start pl-4 mt-3">
                  <strong>( Dr.Neeraj Bhaban )</strong>
                </div>
                <div class="col-6 text-end mt-3">
                  <strong>( Dr. Mayuri Bhaban )</strong>
                </div>
              </div>
            </footer>
  
          </div>
        </div>
      </div>
    </section>
  </body>
  </html>
        `);
        popupWin.document.close();
      }

    });



  }
}
