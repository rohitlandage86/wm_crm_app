import { NgModule } from '@angular/core';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { SuperAdminDashboardComponent } from './super-admin-dashboard/super-admin-dashboard.component';
import { CustomerTypeComponent } from './customer-type/customer-type.component';
import { AddUpdateCustomerTypeComponent } from './customer-type/add-update-customer-type/add-update-customer-type.component';
import { ModulesComponent } from './modules/modules.component';
import { AddUpdateModulesComponent } from './modules/add-update-modules/add-update-modules.component'

import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    SuperAdminDashboardComponent,
    CustomerTypeComponent,
    AddUpdateCustomerTypeComponent,
    ModulesComponent,
    AddUpdateModulesComponent,
    
  ],
  imports: [
    SuperAdminRoutingModule,
    SharedModule
  ]
})
export class SuperAdminModule { }
