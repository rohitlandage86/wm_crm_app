import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { LeadComponent } from './lead/lead.component';


const routes: Routes = [
  { path: "", redirectTo: "admin", pathMatch: "full" },
  { path: "", component: DoctorDashboardComponent },
  {
    path: "admin",
    component: DoctorDashboardComponent,
    pathMatch: "full",
    outlet: "doc_Menu",
  },
  {
    path: "lead",  
    component: LeadComponent,
    pathMatch: "full",
    outlet: "doc_Menu",
  },
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
