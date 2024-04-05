import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormControl, FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ReceptionistService } from '../../receptionist.service';
import { AdminService } from 'src/app/components/admin/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperAdminService } from 'src/app/components/super-admin/super-admin.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUpdateReferedByComponent } from 'src/app/components/admin/miscellaneous/refered-by/add-update-refered-by/add-update-refered-by.component';

@Component({
  selector: 'app-add-update-patient',
  templateUrl: './add-update-patient.component.html',
  styleUrl: './add-update-patient.component.scss'
})
export class AddUpdatePatientComponent implements OnInit {
  form!: FormGroup;
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
  isDoctor=false;
  constructor(
    private fb: FormBuilder,
    private _receptionistService: ReceptionistService, private _adminService: AdminService, private dialog: MatDialog,
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
         // by defult cash pATCH dropdown
         this.form.patchValue({
          payment_type: 'Cash'
        });
    


  }

  createForm() {
    this.form = this.fb.group({
      registration_date: ['', [Validators.required, this.futureDateValidator()]],
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
      payment_type: [Validators.required],
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
  onEmployeeSelectionChange(event: any) {
    const id = event.target.value;
    this._adminService.getEmployeeById(id).subscribe((result: any) => {
      const employeeData = result.data;
    let designation_name = employeeData.designation_name;
    if (designation_name.trim().toLowerCase() === 'doctor') {
      this.isDoctor = true;
      this.form.get('amount')?.patchValue(employeeData.charges);
    } else {
      this.isDoctor = false;
      this.form.get('amount')?.patchValue(null);
    }
    });
  }
  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2); // Month is zero-based
    const day = ('0' + today.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  futureDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const selectedDate = new Date(control.value);
      const today = new Date();
      if (selectedDate.getTime() > today.getTime()) {
        return { futureDate: true }; // Return error for future dates
      }
      return null; // Return null for valid dates (past or present)
    };
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
  //is lead checked or not checked
  toggleInputVisibility(event: any) {
    this.isInputVisible = event.target.checked;
  }
  //get is lead search data
  getSearchLead(mobileNumber: string): void {
    // Make API call with the mobile number
    this._receptionistService.getAllSearchLeadHeaderList(this.page, this.perPage, mobileNumber).subscribe({
      next: (res: any) => {
        this.control['patient_name'].patchValue(res.data[0].name);
        this.control['mobile_no'].patchValue(res.data[0].mobile_number);
        this.control['city'].patchValue(res.data[0].city);

      }
    });
  }
  // validation only 10 digit is lead mobile no.
  validateMobileNo(value: string): void {
    // Check if the value is a 10-digit number
    this.isValidMobileNo = /^\d{10}$/.test(value);
  }


  submit() { this.isEdit ? this.updatePatient() : this.addPatient(); }

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

  addPatient() {

    if (this.form.valid) {
      this._receptionistService.addPatient(this.form.getRawValue()).subscribe({
        next: (res: any) => {
          if (res.status == 201 || res.status == 200) {
            this._toastrService.success(res.message);
            this.router.navigate(['/receptionist', { outlets: { receptionist_Menu: 'patient' } }])
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
      });

    })
  }

  //open refered by...
  openDialog(data?: any) {
    const dialogRef = this.dialog.open(AddUpdateReferedByComponent, {
      
      data: data,
      width: '50%',
      panelClass: 'mat-mdc-dialog-container'
    });
    dialogRef.afterClosed().subscribe((message: any) => {
      if (message == 'create' || message == 'update') {
        this.getAllReferedByList();
      } else {
        console.log('nothing happen');
      }
    });
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
}
