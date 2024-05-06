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
import { DoctorService } from '../../doctor.service';
import { environment } from 'src/environments/environment';
import { MatSelect } from '@angular/material/select';
import { AddUpdateChiefComplaintsComponent } from 'src/app/components/admin/clinical-masters/chief-complaints/add-update-chief-complaints/add-update-chief-complaints.component';
import { MatDialog } from '@angular/material/dialog';
import { AddUpdateDiagnosisComponent } from 'src/app/components/admin/masters/diagnosis/add-update-diagnosis/add-update-diagnosis.component';
import { AddUpdateTreatmentComponent } from 'src/app/components/admin/masters/treatment/add-update-treatment/add-update-treatment.component';
import { ViewLeadFooterComponent } from './view-lead-footer/view-lead-footer.component';
import { AddUpdateMedicinesComponent } from 'src/app/components/admin/clinical-masters/medicines/add-update-medicines/add-update-medicines.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-update-consultation',
  templateUrl: './add-update-consultation.component.html',
  styleUrl: './add-update-consultation.component.scss',
})
export class AddUpdateConsultationComponent implements OnInit {
  allLeadList: Array<any> = [];
  searchQuery: string = '';
  page = 1;
  perPage = 10;
  total = 0;
  baseUrl = environment.baseUrl;
  isAccordionOpen: number | null = null;
  form!: FormGroup;
  form_patient!: FormGroup;
  isEdit = false;
  mrno: any;
  leadHid: any;
  disableButton: boolean = false;
  leadList: Array<any> = [];
  allConsutlationHistoryList: Array<any> = [];
  allStateList: Array<any> = [];
  allEntityList: Array<any> = [];
  allSourceOfPatientList: Array<any> = [];
  allEmployeeList: Array<any> = [];
  allReferedByList: Array<any> = [];
  defaultStateId: any;
  color: string | undefined;
  apiUrl = environment.baseUrl;
  streetControl = new FormControl();
  @ViewChild('imagePreview') imagePreview!: ElementRef<HTMLImageElement>;
  showImagePreview: boolean[] = [];

  @ViewChild('singleSelect') singleSelect: MatSelect | undefined;
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
  formGroup: any;
  patientData: any = {};
  constructor(
    private fb: FormBuilder,
    private _receptionistService: ReceptionistService,
    private _adminService: AdminService,
    private _doctorService: DoctorService,
    private _toastrService: ToastrService,
    private _superAdminService: SuperAdminService,
    private router: Router,
    private url: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.defaultStateId = 20;
  }

  ngOnInit() {
    this.patientForm();
    this.createForm();
    this.getAllStateList();
    this.getAllEntityList();
    this.getAllSourceOfPatientList();
    this.getAllEmployeeList();
    this.getAllReferedByList();
    this.disableFormFields();
    this.getAllMedicinesList();
    this.getAllTreatmentList();
    this.getAllChiefComplaintsList();
    this.getAllDosagesList();
    this.getAllDiagnosisList();
    this.getAllInstructionsList();
    //url id
    this.mrno = this.url.snapshot.params['id'];

    if (this.mrno) {
      this.getPatientById(this.mrno);
      this.getConsultationHistory(this.mrno);
      this.isEdit = true;
    }
    this.form.patchValue({
      mrno: this.url.snapshot.params['id'],
    });
    // by defult cash pATCH dropdown
    this.form_patient.patchValue({
      payment_type: 'Cash',
    });
  }

  //patientform + consultation form
  patientForm() {
    this.form_patient = this.fb.group({
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
      payment_type: [],
    });
  }
  //consultation form
  createForm() {
    this.form = this.fb.group({
      mrno: ['', Validators.required],
      pluse: [null],
      bp: [null],
      past_history: [''],
      // chief_complaints_id: ['', Validators.required],
      appointment_date: [''],
      appointment_time: [''],
      // imageBase64: [null],
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
    });
  }

  //form controls
  get control() {
    return this.form.controls;
  }
  get patientControls() {
    return this.form_patient.controls;
  }

  // ------------------------------------------------------------------
  //get Chief Complaints list...
  getAllChiefComplaintsList() {
    this._adminService.getAllChiefComplaintsListWma().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allChiefComplaints = res.data;
          // this.filteredChiefComplaintsArray = this.allChiefComplaints;
          for (
            let index = 0;
            index < this.consultationChiefComplaintsDetailsArray.value.length;
            index++
          ) {
            this.filteredChiefComplaintsArray[index] = this.allChiefComplaints;
          }
        }
      },
    });
  }
  //Filter chief complaints array
  filterChiefComplaints(i: any) {
    if (this.searchChiefComplaintsValue != '') {
      this.filteredChiefComplaintsArray[i] = [];
      const filteredArr = this.allChiefComplaints.filter((obj) =>
        obj.chief_complaint
          .toLowerCase()
          .includes(this.searchChiefComplaintsValue.toLowerCase())
      );
      this.filteredChiefComplaintsArray[i] = filteredArr;
      let indexPlusOne = i + 1;
      this.filteredChiefComplaintsArray[indexPlusOne] = this.allChiefComplaints;
    } else {
      this.filteredChiefComplaintsArray[i] = this.allChiefComplaints;
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
          // this.filteredDiagnosisArray = this.allDiagnosis;
          for (
            let index = 0;
            index < this.consultationDiagnosisDetailsArray.value.length;
            index++
          ) {
            this.filteredDiagnosisArray[index] = this.allDiagnosis;
          }
        }
      },
    });
  }
  //Filter diagnosis array
  filterDiagnosis(i: any) {
    if (this.searchDiagnosisValue != '') {
      this.filteredDiagnosisArray[i] = [];
      const filteredArr = this.allDiagnosis.filter((obj) =>
        obj.diagnosis_name
          .toLowerCase()
          .includes(this.searchDiagnosisValue.toLowerCase())
      );
      this.filteredDiagnosisArray[i] = filteredArr;
      let indexPlusOne = i + 1;
      this.filteredDiagnosisArray[indexPlusOne] = this.allDiagnosis;
    } else {
      this.filteredDiagnosisArray[i] = this.allDiagnosis;
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
          for (
            let index = 0;
            index < this.consultationTreatmentDetailsArray.value.length;
            index++
          ) {
            this.filteredTreatmentArray[index] = this.allTreatment;
          }
        }
      },
    });
  }
  //Filter Treatment array
  filterTreatment(i: any) {
    if (this.searchTreatmentValue != '') {
      this.filteredTreatmentArray[i] = [];
      const filteredArr = this.allTreatment.filter((obj: any) =>
        obj.treatment_name
          .toLowerCase()
          .includes(this.searchTreatmentValue.toLowerCase())
      );
      this.filteredTreatmentArray[i] = filteredArr;
      let indexPlusOne = i + 1;
      this.filteredTreatmentArray[indexPlusOne] = this.allTreatment;
    } else {
      this.filteredTreatmentArray[i] = this.allTreatment;
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
          // this.filteredMedicinesArray = this.allMedicines;
          for (
            let index = 0;
            index < this.consultationMedicineDetailsArray.value.length;
            index++
          ) {
            this.filteredMedicinesArray[index] = this.allMedicines;
          }
        }
      },
    });
  }
  //Filter Medicines array
  filterMedicines(i: any) {
    if (this.searchMedicinesValue != '') {
      this.filteredMedicinesArray[i] = [];
      const filteredArr = this.allMedicines.filter((obj: any) =>
        obj.medicines_name
          .toLowerCase()
          .includes(this.searchMedicinesValue.toLowerCase())
      );
      this.filteredMedicinesArray[i] = filteredArr;
      let indexPlusOne = i + 1;
      this.filteredMedicinesArray[indexPlusOne] = this.allMedicines;
    } else {
      this.filteredMedicinesArray[i] = this.allMedicines;
    }
  }
  //-------------------------------------------------------------------
  //get dosages list...
  getAllDosagesList() {
    this._adminService.getAllDosagesListWma().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allDosages = res.data;
          for (
            let index = 0;
            index < this.consultationMedicineDetailsArray.value.length;
            index++
          ) {
            this.filteredDosagesArray[index] = this.allDosages;
          }
        }
      },
    });
  }
  //Filter Dosages array
  filterDosages(i: any) {
    if (this.searchDosagesValue != '') {
      this.filteredDosagesArray[i] = [];
      const filteredArr = this.allDosages.filter((obj: any) =>
        obj.dosage_name
          .toLowerCase()
          .includes(this.searchDosagesValue.toLowerCase())
      );
      this.filteredDosagesArray[i] = filteredArr;
      let indexPlusOne = i + 1;
      this.filteredDosagesArray[indexPlusOne] = this.allDosages;
    } else {
      this.filteredDosagesArray[i] = this.allDosages;
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
          for (
            let index = 0;
            index < this.consultationMedicineDetailsArray.value.length;
            index++
          ) {
            this.filteredInstructionsArray[index] = this.allInstructions;
          }
        }
      },
    });
  }
  //Filter Instructions array
  filterInstructions(i: any) {
    if (this.searchInstructionsValue != '') {
      this.filteredInstructionsArray[i] = [];
      const filteredArr = this.allInstructions.filter((obj: any) =>
        obj.instruction
          .toLowerCase()
          .includes(this.searchInstructionsValue.toLowerCase())
      );
      this.filteredInstructionsArray[i] = filteredArr;
      let indexPlusOne = i + 1;
      this.filteredInstructionsArray[indexPlusOne] = this.allInstructions;
    } else {
      this.filteredInstructionsArray[i] = this.allInstructions;
    }
  }
  //-------------------------------------------------------------------

  // patientform all filed disable
  disableFormFields() {
    Object.keys(this.form_patient.controls).forEach((key) => {
      const control = this.form_patient.get(key);
      if (control) {
        control.disable();
      }
    });
  }
  //  //Chief Complaints array controls
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
    for (
      let index = 0;
      index < this.consultationChiefComplaintsDetailsArray.value.length;
      index++
    ) {
      this.filteredChiefComplaintsArray[index] = this.allChiefComplaints;
    }
  }
  deleteConsultationChiefComplaints(i: any) {
    this.consultationChiefComplaintsDetailsArray.removeAt(i);
    for (
      let index = 0;
      index < this.consultationChiefComplaintsDetailsArray.value.length;
      index++
    ) {
      this.filteredChiefComplaintsArray[index] = this.allChiefComplaints;
    }
  }
  //Diagnosis array controls
  get consultationDiagnosisDetailsArray() {
    return this.form.get('consultationDiagnosisDetails') as FormArray<any>;
  }
  newConsultationDiagnosis(): FormGroup {
    return this.fb.group({
      diagnosis_id: [null, Validators.required],
      notes: [null],
    });
  }
  addConsultationDiagnosis() {
    this.consultationDiagnosisDetailsArray.push(
      this.newConsultationDiagnosis()
    );
    for (
      let index = 0;
      index < this.consultationDiagnosisDetailsArray.value.length;
      index++
    ) {
      this.filteredDiagnosisArray[index] = this.allDiagnosis;
    }
  }
  deleteConsultationDiagnosis(i: any) {
    this.consultationDiagnosisDetailsArray.removeAt(i);
    for (
      let index = 0;
      index < this.consultationDiagnosisDetailsArray.value.length;
      index++
    ) {
      this.filteredDiagnosisArray[index] = this.allDiagnosis;
    }
  }
  //Treatment array controls
  get consultationTreatmentDetailsArray() {
    return this.form.get('consultationTreatmentDetails') as FormArray<any>;
  }
  newConsultationTreatment(): FormGroup {
    return this.fb.group({
      treatment_id: [null, Validators.required],
      notes: [null],
    });
  }
  addConsultationTreatment() {
    this.consultationTreatmentDetailsArray.push(
      this.newConsultationTreatment()
    );
    for (
      let index = 0;
      index < this.consultationTreatmentDetailsArray.value.length;
      index++
    ) {
      this.filteredTreatmentArray[index] = this.allTreatment;
    }
  }
  deleteConsultationTreatment(i: any) {
    this.consultationTreatmentDetailsArray.removeAt(i);
    for (
      let index = 0;
      index < this.consultationTreatmentDetailsArray.value.length;
      index++
    ) {
      this.filteredTreatmentArray[index] = this.allTreatment;
    }
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
    for (
      let index = 0;
      index < this.consultationMedicineDetailsArray.value.length;
      index++
    ) {
      this.filteredMedicinesArray[index] = this.allMedicines;
      this.filteredDosagesArray[index] = this.allDosages;
      this.filteredInstructionsArray[index] = this.allInstructions;
    }
  }
  deleteConsultationMedicine(i: any) {
    this.consultationMedicineDetailsArray.removeAt(i);
    for (
      let index = 0;
      index < this.consultationMedicineDetailsArray.value.length;
      index++
    ) {
      this.filteredMedicinesArray[index] = this.allMedicines;
      this.filteredDosagesArray[index] = this.allDosages;
      this.filteredInstructionsArray[index] = this.allInstructions;
    }
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
  deleteConsultationFileUpload(i: any) {
    this.consultationFileUploadDetailsArray.removeAt(i);
  } // Utility function to convert file to base64 format
  fileToBase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  onImageChange(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64Image = reader.result as string;
        this.consultationFileUploadDetailsArray
          .at(index)
          .get('imageBase64')
          ?.patchValue(base64Image.split(',')[1]);
        const fileName = file.name; // Get the file name
        this.consultationFileUploadDetailsArray
          .at(index)
          .get('image_name')
          ?.patchValue(fileName);
        this.showImagePreview[index] = true; // Assuming you want to toggle image preview automatically when a new image is selected
      };
    }
  }
  toggleImagePreview(index: number) {
    this.showImagePreview[index] = !this.showImagePreview[index];
    if (this.showImagePreview[index]) {
      // If image preview is shown, update the image source
      const fileInput = this.consultationFileUploadDetailsArray
        .at(index)
        .get('imageBase64');
      if (fileInput) {
        const file = fileInput.value;
        if (file) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.imagePreview.nativeElement.src = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      }
    }
  }

  submit() {
    this.addConsultation();
  }

  addConsultation() {
    if (this.form.valid) {
      this._doctorService.addConsultation(this.form.value).subscribe({
        next: (res: any) => {
          if (res.status == 201 || res.status == 200) {
            this._toastrService.clear();
            this._toastrService.success(res.message);
            Swal.fire({
              title: 'Are you sure?',
              text: 'Do you want to Print Prescription?',
              icon: 'question',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes'
            }).then((result) => {
              if (result.isConfirmed) {
                if (res.consultation_id) {
                  this.print(res.consultation_id)
                } 
              }
              this.router.navigate(['/doctor', { outlets: { doc_Menu: 'patient' } }]);

            });

          } else {
            this._toastrService.clear();
            this._toastrService.warning(res.message);
          }
        },
        error: (err: any) => {
          if (err.error.status == 422) {
            this._toastrService.warning(err.error.message);
          } else {
            this._toastrService.error('Internal Server Error');
          }
        },
      });
    } else {
      this.form.markAllAsTouched();
      this._toastrService.clear();
      this._toastrService.warning('Fill required fields');
    }
  }
  //get all consutlation view by mrno (history)..
  getConsultationHistory(id: any) {
    this._doctorService.getConsultationHistory(id).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allConsutlationHistoryList = res.data;
        }
      },
    });
  }

  //patient by id patch data
  getPatientById(id: any) {
    this._receptionistService.getPatientById(id).subscribe((result: any) => {
      const patientData = result.data;
      this.getSearchLead(patientData.mobile_no);
      this.form_patient.patchValue({
        registration_date: new Date(patientData.registration_date)
          .toISOString()
          .split('T')[0],
        patient_name: patientData.patient_name,
        mobile_no: patientData.mobile_no,
        gender: patientData.gender,
        age: patientData.age,
        address: patientData.address,
        city: patientData.city,
        state_id: patientData.state_id,
        height: patientData.height,
        weight: patientData.weight,
        bmi: patientData.bmi,
        amount: patientData.amount,
        entity_id: patientData.entity_id,
        mrno_entity_series: patientData.mrno_entity_series,
        source_of_patient_id: patientData.source_of_patient_id,
        employee_id: patientData.employee_id,
        refered_by_id: patientData.refered_by_id,
      });
    });
  }

  //open chief complaints by...
  openDialog(data?: any) {
    const dialogRef = this.dialog.open(AddUpdateChiefComplaintsComponent, {
      data: data,
      width: '50%',
      panelClass: 'mat-mdc-dialog-container',
    });
    dialogRef.afterClosed().subscribe((message: any) => {
      if (message == 'create' || message == 'update') {
        this.getAllChiefComplaintsList();
      } else {
        console.log('nothing happen');
      }
    });
  }

  //open Diagnosis by...
  openDialogDiagnosis(data?: any) {
    const dialogRef = this.dialog.open(AddUpdateDiagnosisComponent, {
      data: data,
      width: '50%',
      panelClass: 'mat-mdc-dialog-container',
    });
    dialogRef.afterClosed().subscribe((message: any) => {
      if (message == 'create' || message == 'update') {
        this.getAllDiagnosisList();
      } else {
        console.log('nothing happen');
      }
    });
  }

  //open Treatment by...
  openDialogTreatment(data?: any) {
    const dialogRef = this.dialog.open(AddUpdateTreatmentComponent, {
      data: data,
      width: '50%',
      panelClass: 'mat-mdc-dialog-container',
    });
    dialogRef.afterClosed().subscribe((message: any) => {
      if (message == 'create' || message == 'update') {
        this.getAllTreatmentList();
      } else {
        console.log('nothing happen');
      }
    });
  }
  //open Medicines by...
  openDialogMedicines(data?: any) {
    const dialogRef = this.dialog.open(AddUpdateMedicinesComponent, {
      data: data,
      width: '50%',
      panelClass: 'mat-mdc-dialog-container',
    });
    dialogRef.afterClosed().subscribe((message: any) => {
      if (message == 'create' || message == 'update') {
        this.getAllMedicinesList();
      } else {
        console.log('nothing happen');
      }
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
  //history
  toggleAccordion(index: number): void {
    if (this.isAccordionOpen === index) {
      this.isAccordionOpen = null; // Close the currently open accordion item
    } else {
      this.isAccordionOpen = index; // Open the clicked accordion item
    }
  }
  onMedicineChange(i: any, event: any) {
    let medicines_id = event.value;
    if (medicines_id) {
      this._adminService.getMedicineById(medicines_id).subscribe({
        next: (res: any) => {
          this.consultationMedicineDetailsArray.at(i).patchValue({
            dosages_id: res.data.dosage_id,
            instructions_id: res.data.instructions_id,
          });
        },
      });
    }
  }

  //get is lead search data
  getSearchLead(searchQuery: string): void {
    // Make API call with the search query
    this._receptionistService
      .getAllSearchLeadHeaderList(this.page, this.perPage, searchQuery)
      .subscribe({
        next: (res: any) => {
          if (res.data.length > 0) {
            this.leadList = res.data[0].lead_hid;
          } else {
            this.disableButton = true;
          }
        },
      });
  }

  // //open lead footer by...
  openDialogLeadInfo(data: string): void {
    let leadHid = this.leadList;
    const dialogRef = this.dialog.open(ViewLeadFooterComponent, {
      data: leadHid,
      width: '80%',
      panelClass: 'mat-mdc-dialog-container',
      maxHeight: '80vh',
    });
    dialogRef.afterClosed().subscribe((message: any) => {
      if (message == 'create' || message == 'update') {
      } else {
        console.log('nothing happen');
      }
    });
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
                    <strong> MR NO. : </strong><label for=""> ${this.patientData.mrno || '--'} </label>
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
