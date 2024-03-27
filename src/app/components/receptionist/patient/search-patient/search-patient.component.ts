import { Component, OnInit } from '@angular/core';
import { freeSet } from '@coreui/icons';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import {  FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { AdminService } from 'src/app/components/admin/admin.service';
import { SuperAdminService } from 'src/app/components/super-admin/super-admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ReceptionistService } from '../../receptionist.service';



@Component({
  selector: 'app-search-patient',
  templateUrl: './search-patient.component.html',
  styleUrl: './search-patient.component.scss'
})
export class SearchPatientComponent implements OnInit{
  form!: FormGroup;
  allPatientVisitList: Array<any> = [];
  isEdit = false;
  mrno: any
  allStateList: Array<any> = [];
  allEntityList: Array<any> = [];
  allSourceOfPatientList: Array<any> = [];
  allEmployeeList: Array<any> = [];
  allReferedByList: Array<any> = [];
  defaultStateId: any;
  mrnoEntitySeries: any;
  isInputVisible: boolean = false;
  isValidMobileNo: boolean = false;
  page = 1;
  perPage = 10;
  total = 0;
   icons = freeSet;
  constructor(
    private fb: FormBuilder,
    private _receptionistService: ReceptionistService, private _adminService: AdminService,
    private _toastrService: ToastrService, private _superAdminService: SuperAdminService, private router: Router, private url: ActivatedRoute) { this.defaultStateId = 20, this.createForm() }


  ngOnInit() {

    this.createForm();
    this.getAllStateList();
    this.getAllEntityList();
    this.getAllSourceOfPatientList();
    this.getAllEmployeeList();
    this.getAllReferedByList();

    this.form.patchValue({
      registration_date: new Date().toISOString().split('T')[0],
    });
    this.mrno = this.url.snapshot.params['id']

    if (this.mrno) {
      this.getPatientById(this.mrno)
      this.isEdit = true;

    }
    // Listen for changes in the entity_id field
    this.form.get('entity_id')?.valueChanges.subscribe(entityId => {
      // Fetch MR No Entity Series based on the selected entity_id
      const selectedEntity = this.allEntityList.find(entity => entity.id === entityId);
      if (selectedEntity) {
        // Patch the MR No Entity Series field
        this.form.patchValue({
          mrno_entity_series: selectedEntity.mrno_entity_series
        });
      }
    });

  }

  createForm() {
    this.form = this.fb.group({
      registration_date: [''],
      patient_name: ['', Validators.required],
      mobile_no: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      gender: ['', [Validators.required]],
      age: [null, Validators.required],
      address: [null, Validators.required],
      city: [null, Validators.required],
      state_id: [null, Validators.required],
      height: [null],
      weight: [null],
      bmi: [null],
      amount: [null, Validators.required],
      entity_id: [null, Validators.required],
      mrno_entity_series: new FormControl({ value: '', disabled: true }, [Validators.required]),
      source_of_patient_id: [null, Validators.required],
      employee_id: [null, Validators.required],
      refered_by_id: [null,],
      payment_type: ['Cash', Validators.required],
    });

  }

  get control() {
    return this.form.controls;
  }

  onEntitySelectionChange(event: any) {
    let entityId = event.target.value;
    if (entityId) {
      this._adminService.getGenerateMrnoEntitySeries(entityId).subscribe({
        next: (res: any) => {
          console.log(res);
          this.mrnoEntitySeries = res.mrnoEntitySeries;
          this.control['mrno_entity_series'].patchValue(res.mrnoEntitySeries)

        },
        error: (err: any) => {
          console.error("Error fetching MR No Entity Series:", err);
          // Handle the error here
        }
      });
    }
  }

 

 
//get is Patient search data
getSearchPatient(searchQuery: string): void {
  // Make API call with the search query
  this._receptionistService.getAllSearchPatientRegistrationList(this.page, this.perPage, searchQuery).subscribe({
    next: (res: any) => {
      console.log(res);
      
      if (res.data.length > 0) {
        this.allPatientVisitList = res.data;
        this.total = res.pagination.total;
      }
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
  

  submit() {  this.updatePatient() }

  updatePatient() {
    if (this.form.valid) {
      console.log(this.form.value);
      this._receptionistService.editPatient(this.form.value, this.mrno).subscribe({
        next: (res: any) => {
          if (res.status == 200) {

            this._toastrService.success(res.message);
            this.router.navigate(['/receptionist', { outlets: { receptionist_Menu: 'patient' } }])
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

    } else {
      this.form.markAllAsTouched();
      this._toastrService.warning("Fill required fields");
    }
  }


  getPatientById(id: any) {
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
        amount: patientData.amount,
        entity_id: patientData.entity_id,
        mrno_entity_series: patientData.mrno_entity_series,
        source_of_patient_id: patientData.source_of_patient_id,
        employee_id: patientData.employee_id,
        refered_by_id: patientData.refered_by_id,
        payment_type: patientData.payment_type
      });

    })
  }

  getLeadById(id: any) {
    this._receptionistService.getLeadById(id).subscribe((result: any) => {
      console.log(result);
      this.form.patchValue(result.data)
      const leadDate = new Date(result.data.lead_date);
      this.form.get('lead_date')?.patchValue(
        `${leadDate.getFullYear()}-${('0' + (leadDate.getMonth() + 1)).slice(-2)}-${('0' + leadDate.getDate()).slice(-2)}`
      );

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
        if (res.data.length > 0) {
          this.allStateList = res.data;
        }
      }
    });
  }
  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.perPage = event.pageSize;
    // this.getAllLeadsList();
  }
}
