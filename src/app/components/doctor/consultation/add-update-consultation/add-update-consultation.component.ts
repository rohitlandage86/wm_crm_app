import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ReceptionistService } from 'src/app/components/receptionist/receptionist.service';
import { AdminService } from 'src/app/components/admin/admin.service';
import { SuperAdminService } from 'src/app/components/super-admin/super-admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, ReplaySubject, startWith, Subject, take, takeUntil } from 'rxjs';
import { DoctorService } from '../../doctor.service';
import { environment } from 'src/environments/environment';
import { LoginComponent } from 'src/app/components/auth/login/login.component';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';


@Component({
  selector: 'app-add-update-consultation',
  templateUrl: './add-update-consultation.component.html',
  styleUrl: './add-update-consultation.component.scss'
})
export class AddUpdateConsultationComponent implements OnInit {
  [x: string]: any;
  form!: FormGroup;
  form_patient!: FormGroup;
  isEdit = true;
  DiagnosisDetailsAdded: boolean = false;
  TreatmentDetailsAdded: boolean = false;
  MedicineDetailAdded: boolean = false;
  FileUploadDetailsAdded: boolean = false;
  mrno: any
  allStateList: Array<any> = [];
  allEntityList: Array<any> = [];
  allSourceOfPatientList: Array<any> = [];
  allEmployeeList: Array<any> = [];
  allReferedByList: Array<any> = [];
  defaultStateId: any;
  //consultation array list
  allChiefComplaintsList: Array<any> = [];
  allDiagnosisList: Array<any> = [];
  allTreatmentList: Array<any> = [];
  allMedicinesList: Array<any> = [];
  allDosagesList: Array<any> = [];
  color: string | undefined;
  apiUrl = environment.baseUrl;
  filteredChiefComplaints: Observable<any[]> | undefined;
  filteredDiagnosis: Observable<any[]> | undefined;
  filteredTreatment: Observable<any[]> | undefined;
  filteredMedicines: Observable<any[]> | undefined;
  filteredDosages: Observable<any[]> | undefined;

  streetControl = new FormControl();
  i: any;
  @ViewChild('imagePreview') imagePreview!: ElementRef<HTMLImageElement>;
  showImagePreview: boolean[] = [];


  /** control for the selected bank */
  public bankCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public bankFilterCtrl: FormControl = new FormControl();

  @ViewChild('singleSelect') singleSelect: MatSelect | undefined;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  constructor(
    private fb: FormBuilder,
    private _receptionistService: ReceptionistService, private _adminService: AdminService, private _doctorService: DoctorService,
    private _toastrService: ToastrService, private _superAdminService: SuperAdminService, private router: Router, private url: ActivatedRoute) {
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


    this.form_patient.patchValue({
      registration_date: new Date().toISOString().split('T')[0],
    });
    //url id 
    this.mrno = this.url.snapshot.params['id']
    console.log(this.mrno);

    if (this.mrno) {
      this.getPatientById(this.mrno);
      console.log(this.mrno);
      this.isEdit = false;
      this.DiagnosisDetailsAdded = true;
      this.TreatmentDetailsAdded = true;
      this.MedicineDetailAdded = true;
      this.FileUploadDetailsAdded = true;
    }
    this.form.patchValue({
      mrno: this.url.snapshot.params['id']
    })

    // by defult cash pATCH dropdown
    this.form_patient.patchValue({
      payment_type: 'Cash'
    });

    // Initialize Chief Complaints autocomplete
    this.initChiefComplaintsAutocomplete();
    // Initialize diagnosis autocomplete
    this.initDiagnosisAutocomplete();
    // Initialize treatment autocomplete
    this.initTreatmentAutocomplete();
    // Initialize dosages autocomplete
    this.initDosageAutocomplete();
    // Initialize medicines autocomplete
    this.initMedicineAutocomplete();


    // listen for search field value changes
    this.bankFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {

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
      chief_complaints_id: ['', Validators.required], // Add this line to define chief_complaints_id
      appointment_date: [''],
      appointment_time: [''],
      consultationDiagnosisDetails: this.fb.array([this.newConsultationDiagnosis()]),
      consultationTreatmentDetails: this.fb.array([this.newConsultationTreatment()]),
      consultationMedicineDetails: this.fb.array([this.newConsultationMedicineDetails()]),
      consultationFileUploadDetails: this.fb.array([this.newconsultationFileUploadDetails()]),
    });
  }


  //form controls
  get control() {
    return this.form.controls;
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }


  // Initialize Chief Complaints autocomplete
  initChiefComplaintsAutocomplete() {
    if (this.form && this.form.get('chief_complaints_id')) {
      const chiefComplaintsControl = this.form.get('chief_complaints_id');
      if (chiefComplaintsControl) {
        this.filteredChiefComplaints = chiefComplaintsControl.valueChanges.pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value?.chief_complaint),
          map(chiefComplaint => chiefComplaint ? this.filterChiefComplaints(chiefComplaint) : this.allChiefComplaintsList.slice())
        );
      }
    }
  }
  // Filter chief_complaint
  filterChiefComplaints(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.allChiefComplaintsList.filter((item: { chief_complaint: string }) =>
      item.chief_complaint.toLowerCase().includes(filterValue)
    );
  }
  displayChiefComplaintsName(complaint?: any): string {
    return complaint ? complaint.chief_complaint : '';
  }
  onChiefComplaintsSelected(event: MatAutocompleteSelectedEvent) {
    const selectedChiefComplaints = event.option.value;
    const selectedChiefComplaintsId = selectedChiefComplaints.chief_complaint_id;
    console.log('Selected Chief Complaints Id:', selectedChiefComplaintsId);
    this.control['chief_complaints_id'].patchValue(selectedChiefComplaintsId);


  }

  // Initialize Diagnosis autocomplete
  initDiagnosisAutocomplete() {
    const consultationDiagnosisArray = this.form.get('consultationDiagnosisDetails') as FormArray;
    if (consultationDiagnosisArray && consultationDiagnosisArray.length > 0) {
      const diagnosisControl = consultationDiagnosisArray.at(0).get('diagnosis_id');
      if (diagnosisControl) {
        this.filteredDiagnosis = diagnosisControl.valueChanges.pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value?.diagnosis_name),
          map(diagnosis => diagnosis ? this.filterDiagnosis(diagnosis) : this.allDiagnosisList.slice())
        );
      }
    }

  }
  // Filter diagnosis
  filterDiagnosis(diagnosis: string): any[] {
    const filterValue = diagnosis.toLowerCase();
    return this.allDiagnosisList.filter(item => item.diagnosis_name.toLowerCase().includes(filterValue));
  }
  displayDiagnosisName(diagnosis?: any): string {
    return diagnosis ? diagnosis.diagnosis_name : '';
  }
  onDiagnosisSelected(event: MatAutocompleteSelectedEvent) {
    const selectedDiagnosis = event.option.value;
    const selectedDiagnosisId = selectedDiagnosis.diagnosis_id;
    // Here, you can save the selectedDiagnosisName to the database
    console.log('Selected Diagnosis Id:', selectedDiagnosisId);

  }
  // Initialize Treatment autocomplete
  initTreatmentAutocomplete() {
    const consultationTreatmentArray = this.form.get('consultationTreatmentDetails') as FormArray;
    if (consultationTreatmentArray && consultationTreatmentArray.length > 0) {
      const treatmentControl = consultationTreatmentArray.at(0).get('treatment_id');
      if (treatmentControl) {
        this.filteredTreatment = treatmentControl.valueChanges.pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value?.treatment_name),
          map(treatment => treatment ? this.filterTreatments(treatment) : this.allTreatmentList.slice())
        );
      }
    }
  }
  // Filter treatment
  filterTreatments(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.allTreatmentList.filter(treatment => treatment.treatment_name.toLowerCase().includes(filterValue));
  }
  displayTreatmentsName(treatment?: any): string {
    return treatment ? treatment.treatment_name : '';
  }
  onTreatmentSelected(event: MatAutocompleteSelectedEvent) {
    const selectedTreatment = event.option.value;
    const selectedTreatmentId = selectedTreatment.treatment_id;
    console.log('Selected treatment Id:', selectedTreatmentId);
  }
  // Initialize dosages autocomplete
  initDosageAutocomplete() {
    const consultationMedicineArray = this.form.get('consultationMedicineDetails') as FormArray;
    if (consultationMedicineArray && consultationMedicineArray.length > 0) {
      const dosagesControl = consultationMedicineArray.at(0).get('dosages_id');
      if (dosagesControl) {
        this.filteredDosages = dosagesControl.valueChanges.pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value?.dosage_name),
          map(dosage => dosage ? this.filterDosages(dosage) : this.allDosagesList.slice())
        );
      }
    }
  }
  // Filter Dosages
  filterDosages(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.allDosagesList.filter((item: { dosage_name: string }) =>
      item.dosage_name.toLowerCase().includes(filterValue)
    );
  }
  displayDosagesName(dosages?: any): string {
    return dosages ? dosages.dosage_name : '';
  }
  onDosagesSelected(event: MatAutocompleteSelectedEvent) {
    const selectedDosages = event.option.value;

    const selectedDosagesId = selectedDosages.dosage_id;
    console.log('Selected Dosages Id:', selectedDosagesId);
  }
  // Initialize medicines autocomplete
  initMedicineAutocomplete() {
    const consultationMedicineArray = this.form.get('consultationMedicineDetails') as FormArray;
    if (consultationMedicineArray && consultationMedicineArray.length > 0) {
      const medicinesControl = consultationMedicineArray.at(0).get('medicines_id');
      if (medicinesControl) {
        this.filteredMedicines = medicinesControl.valueChanges.pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value?.medicines_name),
          map(medicine => medicine ? this.filterMedicines(medicine) : this.allMedicinesList.slice())
        );
      }
    }
  }

  // Filter Medicines
  filterMedicines(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.allMedicinesList.filter((item: { medicines_name: string }) =>
      item.medicines_name.toLowerCase().includes(filterValue)
    );
  }
  displayMedicinesName(medicines?: any): string {
    return medicines ? medicines.medicines_name : '';
  }
  onMedicineSelected(event: MatAutocompleteSelectedEvent) {
    const selectedMedicine = event.option.value;
    const selectedMedicineId = selectedMedicine.medicines_id;
    console.log('Selected Medicine Id:', selectedMedicineId);

  }

  // Utility function to convert file to base64 format
  fileToBase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
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

  toggleImagePreview(index: number) {
    this.showImagePreview[index] = !this.showImagePreview[index];
    if (this.showImagePreview[index]) {
      // If image preview is shown, update the image source
      const fileInput = this.consultationFileUploadDetailsArray.at(index).get('imageBase64');
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
  // patientform all filed disable
  disableFormFields() {
    Object.keys(this.form_patient.controls).forEach(key => {
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
      diagnosis_id: [null, Validators.required],
      notes: [null, Validators.required],

    })
  }
  addConsultationDiagnosis() {
    this.consultationDiagnosisDetailsArray.push(this.newConsultationDiagnosis());
    this.DiagnosisDetailsAdded = true;
  }
  deleteConsultationDiagnosis(i: any) {
    this.consultationDiagnosisDetailsArray.removeAt(i)
  }
  //Treatment array controls
  get consultationTreatmentDetailsArray() {
    return this.form.get('consultationTreatmentDetails') as FormArray<any>;

  }
  newConsultationTreatment(): FormGroup {
    return this.fb.group({
      treatment_id: [null, Validators.required],
      notes: [null, Validators.required],

    })
  }
  addConsultationTreatment() {
    this.consultationTreatmentDetailsArray.push(this.newConsultationTreatment());
    this.TreatmentDetailsAdded = true;
  }
  deleteConsultationTreatment(i: any) {
    this.consultationTreatmentDetailsArray.removeAt(i)
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

    })
  }
  addConsultationMedicine() {
    this.consultationMedicineDetailsArray.push(this.newConsultationMedicineDetails());
    this.MedicineDetailAdded = true;
  }
  deleteConsultationMedicine(i: any) {
    this.consultationMedicineDetailsArray.removeAt(i)
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

    })
  }
  addConsultationFileUpload() {
    this.consultationFileUploadDetailsArray.push(this.newconsultationFileUploadDetails());
    this.FileUploadDetailsAdded = true;
  }
  deleteConsultationFileUpload(i: any) {
    this.consultationFileUploadDetailsArray.removeAt(i)
  }



  submit() { this.isEdit ? this.updateConsultation() : this.addConsultation(); }

  updateConsultation() {

  }

  addConsultation() {
    if (this.form.valid) {

      this._doctorService.addConsultation(this.form.value).subscribe({
        next: (res: any) => {
          if (res.status == 201 || res.status == 200) {
            this._toastrService.success(res.message);
            this.router.navigate(['/doctor', { outlets: { doc_Menu: 'patient' } }]);
          } else {
            this._toastrService.warning(res.message);
          }
        },
        error: (err: any) => {
          if (err.error.status == 422) {
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

  //patient by id patch data
  getPatientById(id: any) {
    this._receptionistService.getPatientById(id).subscribe((result: any) => {
      const patientData = result.data;
      this.form_patient.patchValue({
        registration_date: new Date(patientData.registration_date).toISOString().split('T')[0],
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

    })
  }
  getConsultationId(id: any) {
    this._doctorService.getConsultationById(id).subscribe((result: any) => {
      this.form.patchValue(result.data)
      // patch diagnosis 
      let consultationDiagnosisDetails = result.data.consultationDiagnosisDetails;
      if (consultationDiagnosisDetails.length > 0) {
        this.consultationDiagnosisDetailsArray.clear();
        for (let index = 0; index < consultationDiagnosisDetails.length; index++) {
          const element = consultationDiagnosisDetails[index];
          this.consultationDiagnosisDetailsArray.push(this.newConsultationDiagnosis())
          this.consultationDiagnosisDetailsArray.at(index).get('diagnosis_id')?.patchValue(element.diagnosis_id)
          this.consultationDiagnosisDetailsArray.at(index).get('notes')?.patchValue(element.notes);

        }
      }
      //patch treatment
      let consultationTreatmentDetails = result.data.consultationTreatmentDetails;
      if (consultationTreatmentDetails.length > 0) {
        this.consultationTreatmentDetailsArray.clear();
        for (let index = 0; index < consultationTreatmentDetails.length; index++) {
          const element = consultationTreatmentDetails[index];
          this.consultationTreatmentDetailsArray.push(this.newConsultationTreatment())
          this.consultationTreatmentDetailsArray.at(index).get('treatment_id')?.patchValue(element.treatment_id)
          this.consultationTreatmentDetailsArray.at(index).get('notes')?.patchValue(element.notes);

        }
      }
      //patch Medicine
      let consultationMedicineDetails = result.data.consultationMedicineDetails;
      if (consultationMedicineDetails.length > 0) {
        this.consultationMedicineDetailsArray.clear();
        for (let index = 0; index < consultationMedicineDetails.length; index++) {
          const element = consultationMedicineDetails[index];
          this.consultationMedicineDetailsArray.push(this.newConsultationMedicineDetails())
          this.consultationMedicineDetailsArray.at(index).get('medicines_id')?.patchValue(element.medicines_id)
          this.consultationMedicineDetailsArray.at(index).get('dosages_id')?.patchValue(element.dosages_id);
          this.consultationMedicineDetailsArray.at(index).get('days')?.patchValue(element.days);
          this.consultationMedicineDetailsArray.at(index).get('instructions_id')?.patchValue(element.instructions_id);
        }
      }

      //patch File Uplode
      let consultationFileUploadDetails = result.data.consultationFileUploadDetails;
      if (consultationFileUploadDetails.length > 0) {
        this.consultationFileUploadDetailsArray.clear();
        for (let index = 0; index < consultationFileUploadDetails.length; index++) {
          const element = consultationFileUploadDetails[index];
          this.consultationFileUploadDetailsArray.push(this.newconsultationFileUploadDetails())
          this.consultationFileUploadDetailsArray.at(index).get('imageBase64')?.patchValue(element.imageBase64)
          this.consultationFileUploadDetailsArray.at(index).get('notes')?.patchValue(element.notes);
        }
      }
    })



  }



  //get entity list...
  getAllEntityList() {
    this._adminService.getAllEntitiesListWma().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allEntityList = res.data;
        }
      }
    });

  }
  //get source_of_patient list...
  getAllSourceOfPatientList() {
    this._adminService.getAllSourceOfPatientListWma().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allSourceOfPatientList = res.data;
        }
      }
    });

  }
  //get Employee list...
  getAllEmployeeList() {
    this._adminService.getAllEmployeeListWma().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allEmployeeList = res.data;
          console.log(res.data);

        }
      }
    });
  }

  //get ReferedBy list...
  getAllReferedByList() {
    this._adminService.getAllReferedByListWma().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allReferedByList = res.data;
        }
      }
    });
  }

  //get  State list...
  getAllStateList() {
    this._superAdminService.allstateList().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allStateList = res.data;
        }
      }
    });
  }
  //get Chief Complaints list...
  getAllChiefComplaintsList() {
    this._adminService.getAllChiefComplaintsListWma().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allChiefComplaintsList = res.data;
        }
      }
    });

  }
  //get diagnosis list...
  getAllDiagnosisList() {
    this._adminService.getAllDiagnosisListWma().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allDiagnosisList = res.data;
        }
      }
    });

  }
  //get treatment list...
  getAllTreatmentList() {
    this._adminService.getAllTreatmentListWma().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allTreatmentList = res.data;
        }
      }
    });
  }
  //get medicines list...
  getAllMedicinesList() {
    this._adminService.getAllMedicinesListWma().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allMedicinesList = res.data;
        }
      }
    });
  }
  //get dosages list...
  getAllDosagesList() {
    this._adminService.getAllDosagesListWma().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allDosagesList = res.data;
        }
      }
    });
  }
}
