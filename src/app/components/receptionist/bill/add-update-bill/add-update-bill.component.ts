import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReceptionistService } from '../../receptionist.service';
import { AdminService } from 'src/app/components/admin/admin.service';
import {  Router } from '@angular/router';
import { SuperAdminService } from 'src/app/components/super-admin/super-admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-update-bill',
  templateUrl: './add-update-bill.component.html',
  styleUrl: './add-update-bill.component.scss'
})
export class AddUpdateBillComponent implements OnInit {
  form!: FormGroup;
  form_patient!: FormGroup;
  isEdit = false;
  mrno: any;
  allStateList: Array<any> = [];
  allServiceTypeList:Array<any> = [];
  allServiceList:Array<any> = [];
  allConsultationList: Array<any> = [];
  allEntityList: Array<any> = [];
  isInputVisible: boolean = false;
  isValidMobileNo: boolean = false;
  defaultStateId: any;
  page = 1;
  perPage = 50;
  total = 0;
  isDoctor = false;
  constructor(
    private fb: FormBuilder,
    private _receptionistService: ReceptionistService, private _adminService: AdminService,private _superAdminService: SuperAdminService,
    private _toastrService: ToastrService, private router: Router) { this.defaultStateId = 20;}


  ngOnInit() {
    this.patientForm();
    this.createForm();
    this.getAllStateList();
    this.getAllEntityList();
    this.getAllServiceTypeList();
    this.getAllServiceList();
    this.disableFormFields();

 // by defult cash pATCH dropdown
 this.form.patchValue({
  payment_type: 'Cash'
});

 // Subscribe to value changes of bill amount and discount amount
 this.form.get('bill_amount')?.valueChanges.subscribe(() => {
  this.calculateTotalAmount();
});
this.form.get('discount_amount')?.valueChanges.subscribe(() => {
  this.calculateTotalAmount();
});
  }

  createForm() {
    this.form = this.fb.group({
      mrno: ['', Validators.required],
      entity_id: ['', Validators.required],
      service_type_id: ['', Validators.required],
      service_id: ['', Validators.required],
      bill_amount: ['', Validators.required],
      discount_amount: [null],
      total_amount: ['', [Validators.required]],
      payment_type: ['', Validators.required],
    });

  }
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
  get control() {
    return this.form.controls;
  }
  get controls() {
    return this.form_patient.controls;
  }

//calculate total amount 
  calculateTotalAmount(): void {
    const billAmount = this.form.get('bill_amount')?.value || 0;
    const discountAmount = this.form.get('discount_amount')?.value || 0;
    const totalAmount = billAmount - discountAmount;
    this.form.patchValue({ total_amount: totalAmount });
  }
  //get is PATIENT search data
  getSearchpatientBill(searchQuery: string): void {
    // Make API call with the search query
    this._receptionistService.getAllSearchPatientRegistrationList(this.page, this.perPage, searchQuery).subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allConsultationList = res.data;
         this.getPatientById(res.data[0].mrno) 
          const firstConsultation = res.data[0]; // Assuming you want to use the first item in the list
          this.form.patchValue({
            mrno: firstConsultation.mrno,
            entity_id:firstConsultation.entity_id
          });
        }
      }
    });
  }
  // Other properties and methods

  validateMobileNo(inputValue: string): boolean {
    const mobileNumberPattern = /^\d{10}$/;
    return mobileNumberPattern.test(inputValue);
  }
  isValidInput(inputValue: string): boolean {
    return this.validateMobileNo(inputValue);
  }

  submit() {   Swal.fire({
    title: 'Are you sure?',
    text: 'Do you want to submit the form?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, submit!'
  }).then((result) => {
    if (result.isConfirmed) {
      let paymentType = this.form.get('payment_type')?.value.toUpperCase();
      // If payment type is 'online', set it to 'ONLINE_PAYMENT' in uppercase
      if (paymentType === 'ONLINE PAYMENT') {
        paymentType = 'ONLINE_PAYMENT';
      }
      this.form.get('payment_type')?.setValue(paymentType);
    this.addBill();
    }
  });
    
 
   }

  addBill() {
    if (this.form.valid) {
      this._receptionistService.addBill(this.form.value).subscribe({
        next: (res: any) => {
          if (res.status == 201 || res.status == 200) {
            this._toastrService.success(res.message);
            this.router.navigate(['/receptionist', { outlets: { receptionist_Menu: 'bill' } }])
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
        entity_id: patientData.entity_id,
        mrno_entity_series: patientData.mrno_entity_series,
      })
    });
  }
  // patientform all filed disable
  disableFormFields() {
    Object.keys(this.form_patient.controls).forEach((key) => {
      const control = this.form_patient.get(key);
      if (control) {
        control.disable();
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
      },
    });
  }
    //get service type list...
    getAllServiceTypeList(){
      this._adminService.getAllServiceTypeListWma().subscribe({
        next:(res:any)=>{
          if (res.data.length>0) {
            this.allServiceTypeList= res.data;
          }
        }
      });
    }
    //get service  list...
    getAllServiceList(){
      this._adminService.getAllServiceListWma().subscribe({
        next:(res:any)=>{
          if (res.data.length>0) {
            this.allServiceList= res.data;
          }
        }
      });
    }
}
