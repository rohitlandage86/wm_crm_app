import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../admin/admin.service';
import { Observable } from 'rxjs';
import { DoctorService } from '../doctor.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReceptionistService } from '../../receptionist/receptionist.service';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrl: './consultation.component.scss'
})
export class ConsultationComponent implements OnInit {
  firstCardContent: any;
  icons = freeSet;
  page = 1;
  perPage = 10;
  total = 0;
  lead_date: string;
  color: string | undefined;
  form!: FormGroup;
  isEdit = false;
  mrno: any
  allStateList: Array<any> = [];
  allEntityList: Array<any> = [];
  allSourceOfPatientList: Array<any> = [];
  allEmployeeList: Array<any> = [];
  allReferedByList: Array<any> = [];
  defaultStateId: any;
  constructor( private fb: FormBuilder,private _adminService: AdminService,private _receptionistService: ReceptionistService, private _doctorService:DoctorService, private _toastrService: ToastrService) { this.lead_date = ''; }

  ngOnInit() {
    // this.setTodayDate();
    // this.getAllLeadFollowUpList();
   this.createForm();
  }
  getFirstCardData(): Observable<any> {
    return this._doctorService.addConsultation(this.form.value); // Make sure this returns an Observable
  }
    
  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2); // Month is zero-based
    const day = ('0' + today.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
  }
  createForm() {
    this.form = this.fb.group({
      mrno: ['', [Validators.required]],
      pulse: ['', Validators.required],
      mobile_no: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      bp: ['', [Validators.required]],
      chief_complaints_id: [null, Validators.required],
      appointment_date:[null],
      appointment_time:[null],
      consultationDiagnosisDetails: this.fb.array([this.newconsultationDiagnosis()]),
      consultationTreatmentDetails: this.fb.array([this.newconsultationTreatment()]),
      consultationMedicineDetails: this.fb.array([this.newconsultationMedicine()]),
      consultationFileUploadDetails: this.fb.array([this.newconsultationFileUpload()]),
    });
  }
  get control() {
    return this.form.controls;
  }
  newconsultationDiagnosis(): FormGroup {
    return this.fb.group({
      diagnosis_id: [null, Validators.required],
      notes: [null, Validators.required],
    })
  }
  newconsultationTreatment(): FormGroup {
    return this.fb.group({
      treatment_id: [null, Validators.required],
      notes: [null, Validators.required],
    })
  }
  newconsultationMedicine(): FormGroup {
    return this.fb.group({
      medicines_id: [null, Validators.required],
      days: [null, Validators.required],
      dosages_id: [null, Validators.required],
      instructions_id: [null, Validators.required],
    })
  }
  newconsultationFileUpload(): FormGroup {
    return this.fb.group({
    })
  }
   // BMI calculation logic
 calculateBMI() {
  const height = this.form.value.height;
  const weight = this.form.value.weight;

  if (height && weight) {
    const heightInMeters = height / 100; // Convert height to meters
    const bmi = weight / (heightInMeters * heightInMeters);
    this.form.patchValue({
      bmi: bmi.toFixed(2) // Round BMI to two decimal places
    });
  }
}
  submit() {  this.addPatient(); }
  addPatient(){
    console.log(this.form.value);
    if (this.form.valid){
      console.log(JSON.stringify(this.form.value));
      
      this._doctorService.addConsultation(this.form.value).subscribe({
        next:(res:any)=>{
          if(res.status==201||res.status==200){
            this._toastrService.success(res.message);
            // this.router.navigate(['/receptionist', { outlets: { receptionist_Menu: 'leads' } }])
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
  getPatientById(id:any){
    this._receptionistService.getPatientById(id).subscribe((result: any) => {
      console.log(result);
      const patientData = result.data; 
      this.form.patchValue({
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
        charges: patientData.charges,
        entity_id: patientData.entity_id,
        mrno_entity_series: patientData.mrno_entity_series,
        source_of_patient_id: patientData.source_of_patient_id,
        employee_id: patientData.employee_id,
        refered_by_id: patientData.refered_by_id,
        payment_type: patientData.payment_type
      });

    })
  }
}
