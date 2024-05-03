import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReceptionistService } from '../../../receptionist.service';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/components/admin/admin.service';
import { SuperAdminService } from 'src/app/components/super-admin/super-admin.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-search-patient',
  templateUrl: './view-search-patient.component.html',
  styleUrl: './view-search-patient.component.scss'
})
export class ViewSearchPatientComponent implements OnInit{
  form!: FormGroup;
  mrno: any;
  allPatientVisitList: Array<any> = [];
  allStateList: Array<any> = [];
  allEntityList: Array<any> = [];
  allSourceOfPatientList: Array<any> = [];
  allEmployeeList: Array<any> = [];
  allReferedByList: Array<any> = [];
  color: string | undefined;
  constructor(
    private fb: FormBuilder,
    private _receptionistService: ReceptionistService, private url: ActivatedRoute,private _adminService: AdminService, private _superAdminService: SuperAdminService, private location:Location) { }
  ngOnInit() {
    this.patientForm();
    this.getAllStateList();
    this.getAllEntityList();
    this.getAllSourceOfPatientList();
    this.getAllEmployeeList();
    this.getAllReferedByList();
    this.disableFormFields();
    this.mrno = this.url.snapshot.params['id']
    if (this.mrno) {
      this.getPatientById(this.mrno);
    }
    // by defult cash pATCH dropdown
    this.form.patchValue({
      payment_type: 'Cash'
    });
  }
  
  //patientform + consultation form
  patientForm() {
    this.form = this.fb.group({
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
   //form controls
   get control() {
    return this.form.controls;
  }
    // patientform all filed disable
    disableFormFields() {
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        if (control) {
          control.disable();
        }
      });
    }
      //patient by id patch data
  getPatientById(id: any) {
    this._receptionistService.getPatientById(id).subscribe((result: any) => {
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
    // cancel route location service
    goToback(){
      this.location.back();
    }
}
