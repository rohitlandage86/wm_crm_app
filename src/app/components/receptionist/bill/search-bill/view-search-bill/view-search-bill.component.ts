import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/components/admin/admin.service';
import { SuperAdminService } from 'src/app/components/super-admin/super-admin.service';
import { ReceptionistService } from '../../../receptionist.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-search-bill',
  templateUrl: './view-search-bill.component.html',
  styleUrl: './view-search-bill.component.scss'
})
export class ViewSearchBillComponent implements OnInit{
  form!: FormGroup;
  form_patient!: FormGroup;
  isEdit = false;
  bill_id: any;
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

  constructor(
    private fb: FormBuilder,
    private _receptionistService: ReceptionistService, private _adminService: AdminService,  private _superAdminService: SuperAdminService,private url: ActivatedRoute
) { this.defaultStateId = 20;}


  ngOnInit() {
    this.createForm();
    this.getAllStateList();
    this.getAllEntityList();
    this.getAllServiceTypeList();
    this.getAllServiceList();
     this.disableBillFormFields();
    // by defult cash pATCH dropdown
    this.form.patchValue({
      payment_type: 'Cash'
    });
    this.bill_id = this.url.snapshot.params['id']
    if (this.bill_id) {
      this.getBillById(this.bill_id);
    }
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
      mrno_entity_series: [null],
      source_of_patient_id: [null],
      employee_id: [null],
      refered_by_id: [null],
    });
  }

  get control() {
    return this.form.controls;
  }
 

  getBillById(id: any) {
    this._receptionistService.getBillById(id).subscribe((result: any) => {
      const BillData = result.data;
      this.form.patchValue({
        entity_id: BillData.entity_id,
        service_id: BillData.service_id,
        service_type_id: BillData.service_type_id,
        bill_amount: BillData.bill_amount,
        discount_amount: BillData.discount_amount,
        total_amount: BillData.total_amount,
        payment_type: BillData.payment_type,
        patient_name: BillData.patient_name,
        mobile_no: BillData.mobile_no,
        gender: BillData.gender,
        age: BillData.age,
        address: BillData.address,
        city: BillData.city,
        state_id: BillData.state_id,
        mrno_entity_series: BillData.mrno_entity_series,
      })
    });
  }

    // bill form all filed disable
    disableBillFormFields() {
      Object.keys(this.form.controls).forEach((key) => {
        const control = this.form.get(key);
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
