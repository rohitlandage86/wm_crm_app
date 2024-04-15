import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MatSelect } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { SuperAdminService } from 'src/app/components/super-admin/super-admin.service';
import { DoctorService } from '../../doctor.service';
import { AdminService } from 'src/app/components/admin/admin.service';
import { ReceptionistService } from 'src/app/components/receptionist/receptionist.service';
import { AddUpdateChiefComplaintsComponent } from 'src/app/components/admin/clinical-masters/chief-complaints/add-update-chief-complaints/add-update-chief-complaints.component';
import { AddUpdateDiagnosisComponent } from 'src/app/components/admin/masters/diagnosis/add-update-diagnosis/add-update-diagnosis.component';
import { AddUpdateTreatmentComponent } from 'src/app/components/admin/masters/treatment/add-update-treatment/add-update-treatment.component';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-edit-consultation',
  templateUrl: './edit-consultation.component.html',
  styleUrl: './edit-consultation.component.scss'
})
export class EditConsultationComponent implements OnInit {
  baseUrl = environment.baseUrl
  isAccordionOpen: number | null = null;
  form!: FormGroup;
  form_patient!: FormGroup;
  isEdit = false;
  mrno: any;
  consultation_id: any;
  consultation_diagnosis_id: any;
  consultation_treatment_id: any;
  consultation_medicine_id: any;
  consultation_file_upload_id: any;
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
  selectedImage: any;
  
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

  constructor(
    private fb: FormBuilder,
    private _receptionistService: ReceptionistService,
    private _adminService: AdminService,
    private _doctorService: DoctorService,
    private _toastrService: ToastrService,
    private _superAdminService: SuperAdminService,
    private router: Router,
    private url: ActivatedRoute,
    private dialog: MatDialog,
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
    this.consultation_id = this.url.snapshot.params['id']
    if (this.consultation_id) {
      this.getConsultationId(this.consultation_id);
      this.isEdit = false;
    }
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
      chief_complaints_id: ['', Validators.required], // Add this line to define chief_complaints_id
      appointment_date: [''],
      appointment_time: [''],
      // imageBase64: [null],
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
  get controls() {
    return this.form_patient.controls;
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
          for (let index = 0; index < this.consultationDiagnosisDetailsArray.value.length; index++) {
            this.filteredDiagnosisArray[index] = this.allDiagnosis;
          }
        }
      },
    });
  }
  //Filter diagnosis array
  filterDiagnosis(i:any) {
    if (this.searchDiagnosisValue != "") {
      this.filteredDiagnosisArray[i] = [];
      const filteredArr = this.allDiagnosis.filter((obj) =>
        obj.diagnosis_name.toLowerCase().includes(this.searchDiagnosisValue)
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
          for (let index = 0; index < this.consultationTreatmentDetailsArray.value.length; index++) {
            this.filteredTreatmentArray[index] = this.allTreatment;
          }
        }
      },
    });
  }
  //Filter Treatment array
  filterTreatment(i:any) {
    if (this.searchTreatmentValue != '') {
      this.filteredTreatmentArray[i] = [];
      const filteredArr = this.allTreatment.filter((obj: any) =>
        obj.treatment_name.toLowerCase().includes(this.searchTreatmentValue)
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
          for (let index = 0; index < this.consultationMedicineDetailsArray.value.length; index++) {
            this.filteredMedicinesArray[index] = this.allMedicines;
          }
        }
      },
    });
  }
  //Filter Medicines array
  filterMedicines(i:any) {
    if (this.searchMedicinesValue != '') {
      this.filteredMedicinesArray[i] = [];
      const filteredArr = this.allMedicines.filter((obj: any) =>
        obj.medicines_name.toLowerCase().includes(this.searchMedicinesValue)
      );
      this.filteredMedicinesArray[i] = filteredArr;
      let indexPlusOne = i + 1;
      this.filteredMedicinesArray[indexPlusOne] = this.allMedicines;
    } else {
      this.filteredMedicinesArray[i] = this.allMedicines;
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
          for (let index = 0; index < this.consultationMedicineDetailsArray.value.length; index++) {
            this.filteredDosagesArray[index] = this.allDosages;
          }
        }
      },
    });
  }
  //Filter Dosages array
  filterDosages(i:any) {
    if (this.searchDosagesValue != '') {
      this.filteredDosagesArray[i] = [];
      const filteredArr = this.allDosages.filter((obj: any) =>
        obj.dosage_name.toLowerCase().includes(this.searchDosagesValue)
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
          for (let index = 0; index < this.consultationMedicineDetailsArray.value.length; index++) {
            this.filteredInstructionsArray[index] = this.allInstructions;
          }
        }
      },
    });
  }
  //Filter Instructions array
  filterInstructions(i:any) {
    if (this.searchInstructionsValue != '') {
      this.filteredInstructionsArray[i] = [];
      const filteredArr = this.allInstructions.filter((obj: any) =>
        obj.instruction.toLowerCase().includes(this.searchInstructionsValue)
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
  //Diagnosis array controls
  get consultationDiagnosisDetailsArray() {
    return this.form.get('consultationDiagnosisDetails') as FormArray<any>;

  }
  newConsultationDiagnosis(): FormGroup {
    return this.fb.group({
      consultation_diagnosis_id: [null],
      diagnosis_id: [null, Validators.required],
      notes: [null],
    });
  }
  addConsultationDiagnosis() {
    this.consultationDiagnosisDetailsArray.push(
      this.newConsultationDiagnosis()
    );
    for (let index = 0; index < this.consultationDiagnosisDetailsArray.value.length; index++) {
      this.filteredDiagnosisArray[index] = this.allDiagnosis;
    }
  }
  deleteConsultationDiagnosis(i: any, consultation_diagnosis_id: any) {
    // Open a confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this item!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      if (result.isConfirmed) {
        // If user clicked Yes
        this.consultationDiagnosisDetailsArray.removeAt(i);
        if (consultation_diagnosis_id) {
          this.deleteConsultationsDiagnosis(consultation_diagnosis_id);
        }
        if (this.consultationDiagnosisDetailsArray.length === 0) {
          this.addConsultationDiagnosis();
        }
        for (let index = 0; index < this.consultationDiagnosisDetailsArray.value.length; index++) {
          this.filteredDiagnosisArray[index] = this.allDiagnosis;
        }
        Swal.fire(
          'Deleted!',
          'Your item has been deleted.',
          'success'
        );
      }
    });
  }
  //Treatment array controls
  get consultationTreatmentDetailsArray() {
    return this.form.get('consultationTreatmentDetails') as FormArray<any>;
  }
  newConsultationTreatment(): FormGroup {
    return this.fb.group({
      consultation_treatment_id: [null],
      treatment_id: [null, Validators.required],
      notes: [null],
    });
  }
  addConsultationTreatment() {
    this.consultationTreatmentDetailsArray.push(
      this.newConsultationTreatment()
    );
    for (let index = 0; index < this.consultationTreatmentDetailsArray.value.length; index++) {
      this.filteredTreatmentArray[index] = this.allTreatment;
    }
  }
  deleteConsultationTreatment(i: any, consultation_treatment_id: any) {
    // Open a confirmation dialog
    Swal.fire({
      title: 'Are you sure ?',
      text: 'You will not be able to recover this item!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      if (result.isConfirmed) {
        // If user clicked Yes
        this.consultationTreatmentDetailsArray.removeAt(i);
        if (consultation_treatment_id) {
          this.deleteConsultationsTreatments(consultation_treatment_id);
        }
        if (this.consultationTreatmentDetailsArray.length === 0) {
          this.addConsultationTreatment();
        }
        for (let index = 0; index < this.consultationTreatmentDetailsArray.value.length; index++) {
          this.filteredTreatmentArray[index] = this.allTreatment;
        }
        Swal.fire(
          'Deleted!',
          'Your item has been deleted.',
          'success'
        );
      }

    });
  }
  //Medicine array controls
  get consultationMedicineDetailsArray() {
    return this.form.get('consultationMedicineDetails') as FormArray<any>;
  }
  newConsultationMedicineDetails(): FormGroup {
    return this.fb.group({
      consultation_medicine_id: [null],
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
    for (let index = 0; index < this.consultationMedicineDetailsArray.value.length; index++) {
      this.filteredMedicinesArray[index] = this.allMedicines;
      this.filteredDosagesArray[index]=this.allDosages;
      this.filteredInstructionsArray[index]=this.allInstructions;
  
    }
  }

  deleteConsultationMedicine(i: any, consultation_medicine_id: any) {
    // Open a confirmation dialog
    Swal.fire({
      title: 'Are you sure ?',
      text: 'You will not be able to recover this item!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      if (result.isConfirmed) {
        // If user clicked Yes
        this.consultationMedicineDetailsArray.removeAt(i);
        for (let index = 0; index < this.consultationMedicineDetailsArray.value.length; index++) {
          this.filteredMedicinesArray[index] = this.allMedicines;
          this.filteredDosagesArray[index]=this.allDosages;
          this.filteredInstructionsArray[index]=this.allInstructions;
      
        }
        if (consultation_medicine_id) {
          this.deleteConsultationMedicines(consultation_medicine_id);
        }
        if (this.consultationMedicineDetailsArray.length === 0) {
          this.addConsultationMedicine();
        }
        Swal.fire(
          'Deleted!',
          'Your item has been deleted.',
          'success'
        );
      }
     
    });
  }
  //FileUpload array controls
  get consultationFileUploadDetailsArray() {
    return this.form.get('consultationFileUploadDetails') as FormArray<any>;
  }

  newconsultationFileUploadDetails(): FormGroup {
    return this.fb.group({
      consultation_file_upload_id: [null],
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

  deleteConsultationFileUpload(i: any, consultation_file_upload_id: any) {
    // Open a confirmation dialog
    Swal.fire({
      title: 'Are you sure ?',
      text: 'You will not be able to recover this item!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      if (result.isConfirmed) {
        // If user clicked Yes
        this.consultationFileUploadDetailsArray.removeAt(i);
        if (consultation_file_upload_id) {
          this.deleteConsultationFileUploads(consultation_file_upload_id);
        }
        if (this.consultationFileUploadDetailsArray.length === 0) {
          this.addConsultationFileUpload();
        }
        Swal.fire(
          'Deleted!',
          'Your item has been deleted.',
          'success'
        );
      }
      this.getConsultationId(this.consultation_id);
    });
  }
  // Utility function to convert file to base64 format
  fileToBase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  onImageChange(event: any, index: number) {
    this.previewImage(event)
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64Image = reader.result as string;
        this.consultationFileUploadDetailsArray.at(index).get('imageBase64')?.patchValue(base64Image.split(',')[1])
        const fileName = file.name; // Get the file name
        this.consultationFileUploadDetailsArray.at(index).get('image_name')?.patchValue(fileName);
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
    this.updateConsultation();
  }

  updateConsultation() {
    console.log(this.form.value);
    if (this.form.valid) {

      this._doctorService.editConsultation(this.form.value, this.consultation_id).subscribe({
        next: (res: any) => {
          if (res.status == 200) {
            this._toastrService.success(res.message);
            this.router.navigate([
              '/doctor',
              { outlets: { doc_Menu: 'patient' } },
            ]);
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
        }
      });
    } else {
      this.form.markAllAsTouched();
      this._toastrService.warning("Fill required fields");
    }
  }


  //get all consutlation view by mrno (history)..
  getConsultationHistory(id: any) {

    this._doctorService.getConsultationHistory(id).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allConsutlationHistoryList = res.data;
          console.log(res);

        }
      }
    });
  }

  //patient by id patch data
  getPatientById(id: any) {
    this._receptionistService.getPatientById(id).subscribe((result: any) => {
      const patientData = result.data;

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
  //consutlation by id patch data
  getConsultationId(id: any) {
    this._doctorService.getConsultationById(id).subscribe((result: any) => {
      this.getPatientById(result.data.mrno);
      this.getConsultationHistory(result.data.mrno);
      const consutlationData = result.data;
      console.log('consutlation  data', result.data);

      this.control['mrno'].patchValue(consutlationData.mrno);
      this.control['pluse'].patchValue(consutlationData.pluse);
      this.control['bp'].patchValue(consutlationData.bp);
      this.control['past_history'].patchValue(consutlationData.past_history);
      this.control['chief_complaints_id'].patchValue(consutlationData.chief_complaints_id);

      // Patching diagnosis details
      let consultationDiagnosisDetails = result.data.consultationDiagnosisDetails;
      if (consultationDiagnosisDetails.length > 0) {
        this.consultationDiagnosisDetailsArray.clear();
        for (let index = 0; index < consultationDiagnosisDetails.length; index++) {
          const element = consultationDiagnosisDetails[index];
          const diagnosisFormGroup = this.newConsultationDiagnosis();
          this.consultationDiagnosisDetailsArray.push(diagnosisFormGroup);
          this.consultationDiagnosisDetailsArray.at(index).patchValue({
            diagnosis_id: element.diagnosis_id,
            notes: element.notes
          });
          this.consultationDiagnosisDetailsArray.at(index).get('consultation_diagnosis_id')?.patchValue(element.consultation_diagnosis_id);
        }
        this.getAllDiagnosisList();
      }


      // Patching treatment details
      let consultationTreatmentDetails = result.data.consultationTreatmentDetails;
      if (consultationTreatmentDetails.length > 0) {
        this.consultationTreatmentDetailsArray.clear();
        for (let index = 0; index < consultationTreatmentDetails.length; index++) {
          const element = consultationTreatmentDetails[index];
          const treatmentFormGroup = this.newConsultationTreatment();
          this.consultationTreatmentDetailsArray.push(treatmentFormGroup);
          this.consultationTreatmentDetailsArray.at(index).patchValue({
            treatment_id: element.treatment_id,
            consultation_treatment_id: element.consultation_treatment_id,
            notes: element.notes
          });
        }
        this.getAllTreatmentList();
      }


      // Patching medicine details
      let consultationMedicineDetails = result.data.consultationMedicineDetails;
      if (consultationMedicineDetails.length > 0) {
        this.consultationMedicineDetailsArray.clear();
        for (let index = 0; index < consultationMedicineDetails.length; index++) {
          const element = consultationMedicineDetails[index];
          const medicineFormGroup = this.newConsultationMedicineDetails();
          this.consultationMedicineDetailsArray.push(medicineFormGroup);
          this.consultationMedicineDetailsArray.at(index).patchValue({
            medicines_id: element.medicines_id,
            dosages_id: element.dosages_id,
            days: element.days,
            instructions_id: element.instructions_id,
            consultation_medicine_id: element.consultation_medicine_id
          });
        }
        this.getAllMedicinesList();
        this.getAllDosagesList();
        this.getAllInstructionsList();
      }


      // Patching file upload details
      let consultationFileUploadDetails = result.data.consultationFileUploadDetails;
      if (consultationFileUploadDetails.length > 0) {
        this.consultationFileUploadDetailsArray.clear();
        for (let index = 0; index < consultationFileUploadDetails.length; index++) {
          const element = consultationFileUploadDetails[index];
          const fileUploadFormGroup = this.newconsultationFileUploadDetails();
          this.consultationFileUploadDetailsArray.push(fileUploadFormGroup);
          this.consultationFileUploadDetailsArray.at(index).patchValue({
            imageBase64: element.imageBase64,
            image_name: element.image_name,
            notes: element.notes,
            consultation_file_upload_id: element.consultation_file_upload_id
          });
        }
      }
    });
  }

  //open chief complaints by...
  openDialog(data?: any) {
    const dialogRef = this.dialog.open(AddUpdateChiefComplaintsComponent, {
      data: data,
      width: '50%',
      panelClass: 'mat-mdc-dialog-container'
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
      panelClass: 'mat-mdc-dialog-container'
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
      panelClass: 'mat-mdc-dialog-container'
    });
    dialogRef.afterClosed().subscribe((message: any) => {
      if (message == 'create' || message == 'update') {
        this.getAllTreatmentList();
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
  // delete consutlation diagnosis..
  deleteConsultationsDiagnosis(consultation_diagnosis_id: any) {
    this._doctorService.deleteConsultationDiagnosis(consultation_diagnosis_id, this.consultation_id).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {

        }
      },
    });
  }
  // delete consutlation treatment..
  deleteConsultationsTreatments(consultation_treatment_id: any) {
    this._doctorService.deleteConsultationTreatment(consultation_treatment_id, this.consultation_id).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {

        }
      },
    });
  }
  // delete consutlation treatment..
  deleteConsultationMedicines(consultation_medicine_id: any) {
    this._doctorService.deleteConsultationMedicine(consultation_medicine_id, this.consultation_id).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {

        }
      },
    });
  }
  // delete consutlation FileUploads..
  deleteConsultationFileUploads(consultation_file_upload_id: any) {
    this._doctorService.deleteConsultationFileUpload(consultation_file_upload_id, this.consultation_id).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {

        }
      },
    });
  }
  previewImage(event: any) {
    const index = event.target.getAttribute('data-index');
    const file = event.target.files[0];
    if (file && index !== null) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = {
          index: parseInt(index),
          src: e.target.result
        };
      };
      reader.readAsDataURL(file);
    }
  }
  
}



