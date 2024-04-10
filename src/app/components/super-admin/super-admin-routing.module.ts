import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminDashboardComponent } from './super-admin-dashboard/super-admin-dashboard.component';
import { CustomerTypeComponent } from './customer-type/customer-type.component';
import { ModulesComponent } from './modules/modules.component';
import { CustomersComponent } from './customers/customers.component';
import { AddUpdateCustomersComponent } from './customers/add-update-customers/add-update-customers.component';
import { AuthGuard } from 'src/app/shared/auth-guard.service';

const routes: Routes = [
  { path: "", redirectTo: "super-admin", pathMatch: "full" },
  { path: "", 
    component: SuperAdminDashboardComponent,
    canActivate:[AuthGuard]
  },
  {
    path: "super-admin",
    component: SuperAdminDashboardComponent,
    pathMatch: "full",
    outlet: "super_Menu",
    canActivate:[AuthGuard]
  },
  {
    path: "customer-type",  
    component: CustomerTypeComponent,
    pathMatch: "full",
    outlet: "super_Menu",
    canActivate:[AuthGuard]
  },
  {
    path: "modules",  
    component: ModulesComponent,
    pathMatch: "full",
    outlet: "super_Menu",
    canActivate:[AuthGuard]
  },
  {
    path: "customers",  
    component: CustomersComponent,
    pathMatch: "full",
    outlet: "super_Menu",
    canActivate:[AuthGuard]
  },
  
  { path: 'add-customer',
   component: AddUpdateCustomersComponent,
   outlet: "super_Menu",
   canActivate:[AuthGuard]

  },
  {
    path: "edit-customers/:id",  
    component: AddUpdateCustomersComponent,
    pathMatch: "full",
    outlet: "super_Menu",
    canActivate:[AuthGuard]
  },
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
