import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ReceptionistService } from 'src/app/components/receptionist/receptionist.service';
import { AdminService } from 'src/app/components/admin/admin.service';
import { SuperAdminService } from 'src/app/components/super-admin/super-admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { DoctorService } from '../../doctor.service';



@Component({
  selector: 'app-add-update-consultation',
  templateUrl: './add-update-consultation.component.html',
  styleUrl: './add-update-consultation.component.scss'
})
export class AddUpdateConsultationComponent implements OnInit {
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
  Cash: any;
  color: string | undefined;

  streets: string[] = ['Champs-Élysées', 'Lombard Street', 'Abbey Road', 'Fifth Avenue'];
  filteredStreets: Observable<string[]> | undefined;
  streetControl = new FormControl();
i: any;


  constructor(
    private fb: FormBuilder,
    private _receptionistService: ReceptionistService, private _adminService: AdminService,private _doctorService: DoctorService,
    private _toastrService: ToastrService, private _superAdminService: SuperAdminService, private router: Router, private url: ActivatedRoute) { 
      this.defaultStateId = 20 ;
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
    this.form_patient.patchValue({
      registration_date: new Date().toISOString().split('T')[0],
    });
    //url id 
    this.mrno = this.url.snapshot.params['id']
    if (this.mrno) {
      this.getPatientById(this.mrno)
      this.isEdit = false;
      this.DiagnosisDetailsAdded = true;
      this.TreatmentDetailsAdded = true;
      this.MedicineDetailAdded = true;
      this.FileUploadDetailsAdded = true;
      

    }

    // by defult cash pATCH dropdown
    this.form_patient.patchValue({
      payment_type: 'Cash'
    });
    //autocomplete
    this.filteredStreets = this.streetControl.valueChanges.pipe(
      startWith(''),
      map((value: string) => this._filter(value))
    );

  }
  //autocomplete
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.streets.filter(street => street.toLowerCase().includes(filterValue));
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
      pluse: ['', Validators.required],
      bp: ['', Validators.required],
      past_history: ['', Validators.required],
      chief_complaints_id: ['', Validators.required],
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
      medicines_id: [null, Validators.required],
      dosages_id: [null, Validators.required],
      days: [null, Validators.required],
      instructions_id: [null, Validators.required],

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
      imageBase64: [null, Validators.required],
      image_name: [null, Validators.required],
      notes: [null, Validators.required],

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
    console.log('update consultation',this.form.value);

  }

  addConsultation() {
    console.log('add consultation',this.form.value);
    
    if (this.form.valid){
      this._doctorService.addConsultation(this.form.value).subscribe({
        next:(res:any)=>{
          if(res.status==201||res.status==200){
            this._toastrService.success(res.message);
            this.router.navigate(['/doctor', { outlets: { doc_Menu: 'patient' } }])
          }else{
            this._toastrService.warning(res.message);
          }
        },
        error:(err:any)=>{
          if(err.error.status== 422){
            this._toastrService.warning(err.error.message);
          }else{
            this._toastrService.error("Internal Server Error");
          }
        }
      });
    }else{
      this.form.markAllAsTouched();
      this._toastrService.warning("Fill required fields");
    }

  }

  //patient by id patch data
  getPatientById(id: any) {
    this._receptionistService.getPatientById(id).subscribe((result: any) => {
      console.log(result);
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




  //get entity list...
  getAllEntityList() {
    this._adminService.getAllEntitiesListWma().subscribe({
      next: (res: any) => {
        console.log(res);
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
        console.log(res);
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
        console.log(res);
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
        console.log(res);
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
        console.log(res);
        if (res.data.length > 0) {
          this.allStateList = res.data;
        }
      }
    });
  }
}
