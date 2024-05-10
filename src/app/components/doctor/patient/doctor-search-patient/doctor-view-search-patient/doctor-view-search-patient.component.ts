import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ReceptionistService } from 'src/app/components/receptionist/receptionist.service';
import { AdminService } from 'src/app/components/admin/admin.service';
import { SuperAdminService } from 'src/app/components/super-admin/super-admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DoctorService } from '../../../doctor.service';

@Component({
  selector: 'app-doctor-view-search-patient',
  templateUrl: './doctor-view-search-patient.component.html',
  styleUrl: './doctor-view-search-patient.component.scss',
})
export class DoctorViewSearchPatientComponent implements OnInit {
  form!: FormGroup;
  baseUrl = environment.baseUrl;
  isEdit = true;
  mrno: any;
  consultation_id: any;
  allStateList: Array<any> = [];
  allEntityList: Array<any> = [];
  allSourceOfPatientList: Array<any> = [];
  allEmployeeList: Array<any> = [];
  allReferedByList: Array<any> = [];
  allConsutlationHistoryList: Array<any> = [];
  isAccordionOpen: number | null = null;
  defaultStateId: any;
  //for cheif compliant
  searchChiefComplaintsValue = '';
  filteredChiefComplaintsArray: Array<any> = [];
  allChiefComplaints: Array<any> = [];
  //for diagnosis
  searchDiagnosisValue = '';
  filteredDiagnosisArray: Array<any> = [];
  allDiagnosis: Array<any> = [];
  //for Treatment
  searchTreatmentValue = '';
  filteredTreatmentArray: Array<any> = [];
  allTreatment: Array<any> = [];
  //for Medicines
  searchMedicinesValue = '';
  filteredMedicinesArray: Array<any> = [];
  allMedicines: Array<any> = [];
  //for Dosages
  searchDosagesValue = '';
  filteredDosagesArray: Array<any> = [];
  allDosages: Array<any> = [];
  //for Instructions
  searchInstructionsValue = '';
  filteredInstructionsArray: Array<any> = [];
  allInstructions: Array<any> = [];
  color: string | undefined;
  apiUrl = environment.baseUrl;

  streetControl = new FormControl();
  i: any;
  @ViewChild('imagePreview') imagePreview!: ElementRef<HTMLImageElement>;
  showImagePreview: boolean[] = [];
  patientData: any = {};
  constructor(
    private fb: FormBuilder,
    private _adminService: AdminService,
    private _doctorService: DoctorService,
    private _superAdminService: SuperAdminService,
    private url: ActivatedRoute
  ) {
    this.defaultStateId = 20;
  }

  ngOnInit() {
    this.createForm();
    this.getAllStateList();
    this.getAllEntityList();
    this.getAllSourceOfPatientList();
    this.getAllEmployeeList();
    this.getAllReferedByList();
    this.disableConsultationFormFields();
    this.getAllMedicinesList();
    this.getAllTreatmentList();
    this.getAllChiefComplaintsList();
    this.getAllDosagesList();
    this.getAllDiagnosisList();
    this.getAllInstructionsList();
    this.form.patchValue({
      registration_date: new Date().toISOString().split('T')[0],
    });
    // url id
    this.consultation_id = this.url.snapshot.params['id'];
    if (this.consultation_id) {
      this.getConsultationId(this.consultation_id);
      this.isEdit = false;
    }
    this.form.patchValue({
      mrno: this.url.snapshot.params['id'],
    });
    // by defult cash pATCH dropdown
    this.form.patchValue({
      payment_type: 'Cash',
    });
  }
  //consultation form
  createForm() {
    this.form = this.fb.group({
      mrno: [''],
      past_history: [''],
      // chief_complaints_id: [''], // Add this line to define chief_complaints_id
      consultationChiefComplaintsDetails: this.fb.array([
        this.newConsultationChiefComplaints(),
      ]),
      consultationDiagnosisDetails: this.fb.array([
        this.newConsultationDiagnosis(),
      ]),
      consultationTreatmentDetails: this.fb.array([
        this.newConsultationTreatment(),
      ]),
      consultationMedicineDetails: this.fb.array([
        this.newConsultationMedicineDetails(),
      ]),
      consultationFileUploadDetails: this.fb.array([
        this.newconsultationFileUploadDetails(),
      ]),
      registration_date: [''],
      patient_name: [''],
      mobile_no: [''],
      gender: [''],
      age: [null],
      address: [null],
      city: [null],
      state_id: [null],
      height: [null],
      weight: [null],
      bmi: [''],
      amount: [null],
      entity_id: [null],
      mrno_entity_series: [null],
      source_of_patient_id: [null],
      employee_id: [null],
      refered_by_id: [null],
      payment_type: [null],
    });
  }
  //form controls
  get control() {
    return this.form.controls;
  }
  // ------------------------------------------------------------------
  //get Chief Complaints list...
  getAllChiefComplaintsList() {
    this._adminService.getAllChiefComplaintsListWma().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allChiefComplaints = res.data;
          this.filteredChiefComplaintsArray = this.allChiefComplaints;
        }
      },
    });
  }
  //Filter chief complaints array
  filterChiefComplaints() {
    if (this.searchChiefComplaintsValue != '') {
      this.filteredChiefComplaintsArray = [];
      const filteredArr = this.allChiefComplaints.filter((obj: any) =>
        obj.chief_complaint
          .toLowerCase()
          .includes(this.searchChiefComplaintsValue)
      );
      this.filteredChiefComplaintsArray = filteredArr;
    } else {
      this.filteredChiefComplaintsArray = this.allChiefComplaints;
    }
  }
  // --------------------------------------------------------------------------
  //-------------------------------------------------------------------
  //get diagnosis list...
  getAllDiagnosisList() {
    this._adminService.getAllDiagnosisListWma().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allDiagnosis = res.data;
          this.filteredDiagnosisArray = this.allDiagnosis;
        }
      },
    });
  }
  //Filter diagnosis array
  filterDiagnosis() {
    if (this.searchDiagnosisValue != '') {
      this.filteredDiagnosisArray = [];
      const filteredArr = this.allDiagnosis.filter((obj: any) =>
        obj.diagnosis_name.toLowerCase().includes(this.searchDiagnosisValue)
      );
      this.filteredDiagnosisArray = filteredArr;
    } else {
      this.filteredDiagnosisArray = this.allDiagnosis;
    }
  }
  //-------------------------------------------------------------------
  //-------------------------------------------------------------------
  //get treatment list...
  getAllTreatmentList() {
    this._adminService.getAllTreatmentListWma().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allTreatment = res.data;
          this.filteredTreatmentArray = this.allTreatment;
        }
      },
    });
  }
  //Filter Treatment array
  filterTreatment() {
    if (this.searchTreatmentValue != '') {
      this.filteredTreatmentArray = [];
      const filteredArr = this.allTreatment.filter((obj: any) =>
        obj.treatment_name.toLowerCase().includes(this.searchTreatmentValue)
      );
      this.filteredTreatmentArray = filteredArr;
    } else {
      this.filteredTreatmentArray = this.allTreatment;
    }
  }
  //-------------------------------------------------------------------
  //-------------------------------------------------------------------
  //get medicines list...
  getAllMedicinesList() {
    this._adminService.getAllMedicinesListWma().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allMedicines = res.data;
          this.filteredMedicinesArray = this.allMedicines;
        }
      },
    });
  }
  //Filter Medicines array
  filterMedicines() {
    if (this.searchMedicinesValue != '') {
      this.filteredMedicinesArray = [];
      const filteredArr = this.allMedicines.filter((obj: any) =>
        obj.medicines_name.toLowerCase().includes(this.searchMedicinesValue)
      );
      this.filteredMedicinesArray = filteredArr;
    } else {
      this.filteredMedicinesArray = this.allMedicines;
    }
  }
  //-------------------------------------------------------------------
  //-------------------------------------------------------------------
  //get dosages list...
  getAllDosagesList() {
    this._adminService.getAllDosagesListWma().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allDosages = res.data;
          this.filteredDosagesArray = this.allDosages;
        }
      },
    });
  }
  //Filter Dosages array
  filterDosages() {
    if (this.searchDosagesValue != '') {
      this.filteredDosagesArray = [];
      const filteredArr = this.allDosages.filter((obj: any) =>
        obj.dosage_name.toLowerCase().includes(this.searchDosagesValue)
      );
      this.filteredDosagesArray = filteredArr;
    } else {
      this.filteredDosagesArray = this.allDosages;
    }
  }
  //-------------------------------------------------------------------
  //-------------------------------------------------------------------
  //get Instructions list...
  getAllInstructionsList() {
    this._adminService.getAllInstructionsWma().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allInstructions = res.data;
          this.filteredInstructionsArray = this.allInstructions;
        }
      },
    });
  }
  //Filter Instructions array
  filterInstructions() {
    if (this.searchInstructionsValue != '') {
      this.filteredInstructionsArray = [];
      const filteredArr = this.allInstructions.filter((obj: any) =>
        obj.instruction.toLowerCase().includes(this.searchInstructionsValue)
      );
      this.filteredInstructionsArray = filteredArr;
    } else {
      this.filteredInstructionsArray = this.allInstructions;
    }
  }
  //-------------------------------------------------------------------

  // patientform all filed disable
  disableConsultationFormFields() {
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      if (control) {
        control.disable();
      }
    });
  }

  //Chief Complaints array controls
  get consultationChiefComplaintsDetailsArray() {
    return this.form.get(
      'consultationChiefComplaintsDetails'
    ) as FormArray<any>;
  }
  newConsultationChiefComplaints(): FormGroup {
    return this.fb.group({
      chief_complaints_id: [null],
    });
  }
  addConsultationChiefComplaints() {
    this.consultationChiefComplaintsDetailsArray.push(
      this.newConsultationChiefComplaints()
    );
  }

  //Diagnosis array controls
  get consultationDiagnosisDetailsArray() {
    return this.form.get('consultationDiagnosisDetails') as FormArray<any>;
  }
  newConsultationDiagnosis(): FormGroup {
    return this.fb.group({
      diagnosis_id: [null],
      notes: [null],
    });
  }
  addConsultationDiagnosis() {
    this.consultationDiagnosisDetailsArray.push(
      this.newConsultationDiagnosis()
    );
  }

  //Treatment array controls
  get consultationTreatmentDetailsArray() {
    return this.form.get('consultationTreatmentDetails') as FormArray<any>;
  }
  newConsultationTreatment(): FormGroup {
    return this.fb.group({
      treatment_id: [null],
      notes: [null],
    });
  }
  addConsultationTreatment() {
    this.consultationTreatmentDetailsArray.push(
      this.newConsultationTreatment()
    );
  }

  //Medicine array controls
  get consultationMedicineDetailsArray() {
    return this.form.get('consultationMedicineDetails') as FormArray<any>;
  }
  newConsultationMedicineDetails(): FormGroup {
    return this.fb.group({
      medicines_id: [null],
      dosages_id: [null],
      days: [null],
      instructions_id: [null],
    });
  }
  addConsultationMedicine() {
    this.consultationMedicineDetailsArray.push(
      this.newConsultationMedicineDetails()
    );
  }

  //FileUpload array controls
  get consultationFileUploadDetailsArray() {
    return this.form.get('consultationFileUploadDetails') as FormArray<any>;
  }

  newconsultationFileUploadDetails(): FormGroup {
    return this.fb.group({
      imageBase64: [null],
      image_name: [null],
      notes: [null],
    });
  }
  addConsultationFileUpload() {
    this.consultationFileUploadDetailsArray.push(
      this.newconsultationFileUploadDetails()
    );
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Convert the file to Base64 string
        const base64Image = e.target.result.split(',')[1];
        // Patch the Base64 image data to the form control
        const imageControl = this.form.get('imageBase64');
        if (imageControl) {
          imageControl.patchValue(base64Image);
        }
        // Preview the selected image
        this.imagePreview.nativeElement.src = e.target.result;
      };
      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
  }

  getConsultationId(id: any) {
    this._doctorService.getConsultationById(id).subscribe((result: any) => {
      this.getConsultationHistory(result.data.mrno);
      const patientData = result.data;
      this.patientData = result.data;
      this.control['entity_id'].patchValue(patientData.entity_id);
      this.control['registration_date'].patchValue(
        new Date(patientData.registration_date).toISOString().split('T')[0]
      );
      this.control['mrno_entity_series'].patchValue(
        patientData.mrno_entity_series
      );
      this.control['patient_name'].patchValue(patientData.patient_name);
      this.control['mobile_no'].patchValue(patientData.mobile_no);
      this.control['gender'].patchValue(patientData.gender);
      this.control['age'].patchValue(patientData.age);
      this.control['address'].patchValue(patientData.address);
      this.control['city'].patchValue(patientData.city);
      this.control['state_id'].patchValue(patientData.state_id);
      this.control['height'].patchValue(patientData.height);
      this.control['weight'].patchValue(patientData.weight);
      this.control['bmi'].patchValue(patientData.bmi);
      this.control['source_of_patient_id'].patchValue(
        patientData.source_of_patient_id
      );
      this.control['refered_by_id'].patchValue(patientData.refered_by_id);
      this.control['employee_id'].patchValue(patientData.employee_id);
      this.control['amount'].patchValue(patientData.amount);
      this.control['past_history'].patchValue(patientData.past_history);
      // this.control['chief_complaints_id'].patchValue(patientData.chief_complaints_id);

      // Patching Chief Complaints  details
      let consultationChiefComplaintsDetails =
        result.data.consultationChiefComplaintsDetails;
      if (consultationChiefComplaintsDetails.length > 0) {
        this.consultationChiefComplaintsDetailsArray.clear();
        for (
          let index = 0;
          index < consultationChiefComplaintsDetails.length;
          index++
        ) {
          const element = consultationChiefComplaintsDetails[index];
          const chiefcomplaintsFormGroup =
            this.newConsultationChiefComplaints();
          this.consultationChiefComplaintsDetailsArray.push(
            chiefcomplaintsFormGroup
          );
          this.consultationChiefComplaintsDetailsArray.at(index).patchValue({
            chief_complaints_id: element.chief_complaints_id,
          });
        }
      }
      this.consultationChiefComplaintsDetailsArray.disable();

      // Patching diagnosis details
      let consultationDiagnosisDetails =
        result.data.consultationDiagnosisDetails;
      if (consultationDiagnosisDetails.length > 0) {
        this.consultationDiagnosisDetailsArray.clear();
        for (
          let index = 0;
          index < consultationDiagnosisDetails.length;
          index++
        ) {
          const element = consultationDiagnosisDetails[index];
          const diagnosisFormGroup = this.newConsultationDiagnosis();
          this.consultationDiagnosisDetailsArray.push(diagnosisFormGroup);
          this.consultationDiagnosisDetailsArray.at(index).patchValue({
            diagnosis_id: element.diagnosis_id,
            notes: element.notes,
          });
        }
      }
      this.consultationDiagnosisDetailsArray.disable();

      // Patching treatment details
      let consultationTreatmentDetails =
        result.data.consultationTreatmentDetails;
      if (consultationTreatmentDetails.length > 0) {
        this.consultationTreatmentDetailsArray.clear();
        for (
          let index = 0;
          index < consultationTreatmentDetails.length;
          index++
        ) {
          const element = consultationTreatmentDetails[index];
          const treatmentFormGroup = this.newConsultationTreatment();
          this.consultationTreatmentDetailsArray.push(treatmentFormGroup);
          this.consultationTreatmentDetailsArray.at(index).patchValue({
            treatment_id: element.treatment_id,
            notes: element.notes,
          });
        }
      }
      this.consultationTreatmentDetailsArray.disable();

      // Patching medicine details
      let consultationMedicineDetails = result.data.consultationMedicineDetails;
      if (consultationMedicineDetails.length > 0) {
        this.consultationMedicineDetailsArray.clear();
        for (
          let index = 0;
          index < consultationMedicineDetails.length;
          index++
        ) {
          const element = consultationMedicineDetails[index];
          const medicineFormGroup = this.newConsultationMedicineDetails();
          this.consultationMedicineDetailsArray.push(medicineFormGroup);
          this.consultationMedicineDetailsArray.at(index).patchValue({
            medicines_id: element.medicines_id,
            dosages_id: element.dosages_id,
            days: element.days,
            instructions_id: element.instructions_id,
          });
        }
      }
      this.consultationMedicineDetailsArray.disable();

      // Patching file upload details
      let consultationFileUploadDetails =
        result.data.consultationFileUploadDetails;
      if (consultationFileUploadDetails.length > 0) {
        this.consultationFileUploadDetailsArray.clear();
        for (
          let index = 0;
          index < consultationFileUploadDetails.length;
          index++
        ) {
          const element = consultationFileUploadDetails[index];
          const fileUploadFormGroup = this.newconsultationFileUploadDetails();
          this.consultationFileUploadDetailsArray.push(fileUploadFormGroup);
          this.consultationFileUploadDetailsArray.at(index).patchValue({
            imageBase64: element.imageBase64,
            notes: element.notes,
          });
        }
      }
      this.consultationFileUploadDetailsArray.disable();
    });
  }

  //get entity list...
  getAllEntityList() {
    this._adminService.getAllEntitiesListWma().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allEntityList = res.data;
        }
      },
    });
  }
  //get source_of_patient list...
  getAllSourceOfPatientList() {
    this._adminService.getAllSourceOfPatientListWma().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allSourceOfPatientList = res.data;
        }
      },
    });
  }
  //get Employee list...
  getAllEmployeeList() {
    this._adminService.getAllEmployeeListWma().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allEmployeeList = res.data;
        }
      },
    });
  }
  //get ReferedBy list...
  getAllReferedByList() {
    this._adminService.getAllReferedByListWma().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allReferedByList = res.data;
        }
      },
    });
  }

  //get  State list...
  getAllStateList() {
    this._superAdminService.allstateList().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allStateList = res.data;
        }
      },
    });
  }

  //get all consutlation view by mrno (history)..
  getConsultationHistory(id: any) {
    this._doctorService.getConsultationHistory(id).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allConsutlationHistoryList = res.data;
          console.log(res.data);
        }
      },
    });
  }
  //history
  toggleAccordion(index: number): void {
    if (this.isAccordionOpen === index) {
      this.isAccordionOpen = null; // Close the currently open accordion item
    } else {
      this.isAccordionOpen = index; // Open the clicked accordion item
    }
  }
  print() {
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
  }
}
