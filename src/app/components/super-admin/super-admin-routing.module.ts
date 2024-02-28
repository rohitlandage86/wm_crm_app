import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminDashboardComponent } from './super-admin-dashboard/super-admin-dashboard.component';
import { CustomerTypeComponent } from './customer-type/customer-type.component';
import { ModulesComponent } from './modules/modules.component';

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
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
