import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminDashboardComponent } from './super-admin-dashboard/super-admin-dashboard.component';
import { CustomerTypeComponent } from './customer-type/customer-type.component';
import { ModulesComponent } from './modules/modules.component';
import { CustomersComponent } from './customers/customers.component';
import { AddUpdateCustomersComponent } from './customers/add-update-customers/add-update-customers.component';

const routes: Routes = [
  { path: "", redirectTo: "super-admin", pathMatch: "full" },
  { path: "", component: SuperAdminDashboardComponent },
  {
    path: "super-admin",
    component: SuperAdminDashboardComponent,
    pathMatch: "full",
    outlet: "super_Menu",
  },
  {
    path: "customer-type",  
    component: CustomerTypeComponent,
    pathMatch: "full",
    outlet: "super_Menu",
  },
  {
    path: "modules",  
    component: ModulesComponent,
    pathMatch: "full",
    outlet: "super_Menu",
  },
  {
    path: "customers",  
    component: CustomersComponent,
    pathMatch: "full",
    outlet: "super_Menu",
  },
  
  { path: 'add-customer',
   component: AddUpdateCustomersComponent,
   outlet: "super_Menu",

  },
  {
    path: "edit-customers/:id",  
    component: AddUpdateCustomersComponent,
    pathMatch: "full",
    outlet: "super_Menu",
  },
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
