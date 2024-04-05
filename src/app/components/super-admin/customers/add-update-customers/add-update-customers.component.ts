import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuperAdminService } from '../../super-admin.service';
import { ToastrService } from 'ngx-toastr';
import { CustomersComponent } from '../customers.component';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-update-customers',
  templateUrl: './add-update-customers.component.html',
  styleUrl: './add-update-customers.component.scss'
})
export class AddUpdateCustomersComponent implements OnInit {
  baseUrl = environment.baseUrl;
  [x: string]: any;
  form!: FormGroup;
  isEdit: boolean = false;
  image: any;
  shortlogoName: any;
  longLogoName: any;
  apiUrl = environment.baseUrl;
  customer_id: any;
  password: string = '';
  passwordVisible: boolean = false;
  allStateList: Array<any> = [];
  @ViewChild('imagePreview') imagePreview!: ElementRef<HTMLImageElement>;
  @ViewChild('shortimagePreview') shortimagePreview!: ElementRef<HTMLImageElement>;
  allCustomerTypeList: Array<any> = [];
  allModuleList: Array<any> = [];

  constructor(private fb: FormBuilder, private _superAdminService: SuperAdminService, private _toastrService: ToastrService, private router: Router, private url: ActivatedRoute) { }

  ngOnInit() {
    this.createForm();
    this.getAllCustomerTypeList();
    this.getAllModuleList();
    this.getAllStateList();
    this.customer_id = this.url.snapshot.params['id']
    if (this.customer_id) {
      // this.prepopulateData(this.customer_id)
      this.getCustomersById(this.customer_id)
      this.isEdit = true;
      this.disablePasswordValidation();
    }
  }
  createForm() {
    const passwordValidators = this.isEdit ? [] : [Validators.required];
    this.form = this.fb.group({
      organization_name: [null, Validators.required],
      customer_name: [null, Validators.required],
      customer_email: [null, [Validators.required, Validators.email]],
      customer_type_id: [null, Validators.required],
      customer_phone: [null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      branch: [null, Validators.required],
      city: [null, Validators.required],
      state_id: [null, Validators.required],
      shortLogoBase64: [null],
      longLogoBase64: [null],
      shortLogoName: [null],
      longLogoName: [null],
      password: [this.isEdit ? [''] : null, passwordValidators],
      customerModelDetails: this.fb.array([this.newCustomerModel()])
    });
  }
  get control() {
    return this.form.controls;
  }
  get customerModelDetailsArray() {
    return this.form.get('customerModelDetails') as FormArray<any>;
  }

  newCustomerModel(): FormGroup {
    return this.fb.group({
      customer_module_id: [null],
      module_id: [null, Validators.required],
      module_name: [null],
    })
  }
  addCustomerModel() {
    this.customerModelDetailsArray.push(this.newCustomerModel())
  }
  deleteCustomerModel(i: any) {
    this.customerModelDetailsArray.removeAt(i)
  }
  onImageChange(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      this.control['longLogoName'].patchValue(file.name);
      reader.onload = (e: any) => {
        const longimage = e.target.result;
        const base64Image = e.target.result.split(',')[1];
        this.control['longLogoBase64'].patchValue(base64Image); // Patch the base64 image to the form control
        this.imagePreview.nativeElement.src = longimage; // Preview the selected image
      };
      reader.readAsDataURL(file);
    }
  }
  onshortImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      this.control['shortLogoName'].patchValue(file.name);
      reader.onload = (e: any) => {
        const shortimage = e.target.result;
        const base64Image = e.target.result.split(',')[1];
        this.control['shortLogoBase64'].patchValue(base64Image); // Patch the base64 image to the form control
        this.shortimagePreview.nativeElement.src = shortimage; // Preview the selected image
      };
      reader.readAsDataURL(file);
    }
  }
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  submit() { this.isEdit ? this.updateCustomers() : this.addCustomers(); }

  updateCustomers() {
    if (this.form.valid) {
      delete this.form.value['password'];
      this._superAdminService.editCustomers(this.form.value, this.customer_id).subscribe({
        next: (res: any) => {
          if (res.status == 200) {
            this._toastrService.success(res.message);
            this.router.navigate(['/super-admin', { outlets: { super_Menu: 'customers' } }])
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

  addCustomers() {
    let data = this.form.value;
    if (this.form.valid) {
      this._superAdminService.addCustomers(data).subscribe({
        next: (res: any) => {
          if (res.status == 201 || res.status == 200) {
            this._toastrService.success(res.message);
            this.router.navigate(['/super-admin', { outlets: { super_Menu: 'customers' } }])
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
      })
    }
    else {
      this.form.markAllAsTouched();
      this._toastrService.warning("Fill required fields");
    }
  }
  getCustomersById(id: any) {
    this._superAdminService.getCustomersById(id).subscribe({
      next: (result: any) => {
        if (result && result.data && Array.isArray(result.data.customerModulesDetails)) {
          this.form.patchValue(result.data);
          this.shortlogoName = result.data.short_logo
          this.longLogoName = result.data.logo

          // Patch long logo
          if (result.data.longLogoBase64) {
            const reader1 = new FileReader();
            reader1.onload = (e: any) => {
              this.control['longLogoName'].patchValue(result.data.longLogoName);
              this.control['longLogoBase64'].patchValue(result.data.longLogoBase64);
              this.imagePreview.nativeElement.src = 'data:image/png;base64,' + result.data.longLogoBase64;
            };
            reader1.readAsDataURL(result.data.longLogoBase64);
          }

          // Patch short logo
          if (result.data.shortLogoBase64) {
            const reader2 = new FileReader();
            reader2.onload = (e: any) => {
              this.control['shortLogoName'].patchValue(result.data.shortLogoName);
              this.control['shortLogoBase64'].patchValue(result.data.shortLogoBase64);
              this.shortimagePreview.nativeElement.src = 'data:image/png;base64,' + result.data.shortLogoBase64;
            };
            reader2.readAsDataURL(result.data.shortLogoBase64);
          }

          let customerModulesDetails = result.data.customerModulesDetails;
          if (customerModulesDetails.length > 0) {
            this.customerModelDetailsArray.clear();
            for (let index = 0; index < customerModulesDetails.length; index++) {
              const element = customerModulesDetails[index];
              this.customerModelDetailsArray.push(this.newCustomerModel());
              this.customerModelDetailsArray.at(index).get('module_id')?.patchValue(element.module_id);
            }
          }
        } else {
          console.error('Customer Model Details not found or not in the correct format in the response');
        }
      },
      error: (error: any) => {
        console.error('Error fetching customer details:', error);
      }
    });
  }

  //get Customer type list...
  getAllCustomerTypeList() {
    this._superAdminService.getAllCustomerTypeListWma().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allCustomerTypeList = res.data;
        }
      }
    });
  }
  //get  Modul list...
  getAllModuleList() {
    this._superAdminService.getAllModuleListWma().subscribe({
      next: (res: any) => {
        if (res.data.length > 0) {
          this.allModuleList = res.data;
        }
      }
    });
  }
  getAllStateList() {
    this._superAdminService.allstateList().subscribe((res: any) => {
      this.allStateList = res.data
    });
  }
  disablePasswordValidation() {
    this.form.get('password')?.clearValidators();
    this.form.get('password')?.updateValueAndValidity();
  }
}
