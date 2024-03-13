import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReceptionistDashboardComponent} from './receptionist-dashboard/receptionist-dashboard.component';
import {PatientComponent} from './patient/patient.component';
import { LeadsComponent } from './leads/leads.component';
import { AddUpdateLeadsComponent } from './leads/add-update-leads/add-update-leads.component';

const routes: Routes = [
  { path: "", redirectTo: "receptionist", pathMatch: "full" },
  { path: "", component: ReceptionistDashboardComponent },
  {
    path: "receptionist",
    component: ReceptionistDashboardComponent,
    pathMatch: "full",
    outlet: "receptionist_Menu",
  },
  {
    path: "patient",  
    component: PatientComponent,
    pathMatch: "full",
    outlet: "receptionist_Menu",
  },  {
    path: "leads",  
    component: LeadsComponent,
    pathMatch: "full",
    outlet: "receptionist_Menu",
  },
  { path: 'add-leads',
  component: AddUpdateLeadsComponent,
  outlet: "receptionist_Menu",

 },
 {
   path: "edit-leads/:id",  
   component: AddUpdateLeadsComponent,
   pathMatch: "full",
   outlet: "receptionist_Menu",
 },
  
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  ReceptionistRoutingModule { }
