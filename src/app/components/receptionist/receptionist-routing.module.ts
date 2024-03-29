import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReceptionistDashboardComponent} from './receptionist-dashboard/receptionist-dashboard.component';
import {PatientComponent} from './patient/patient.component';
import { AddUpdatePatientComponent } from './patient/add-update-patient/add-update-patient.component';
import { LeadsComponent } from './leads/leads.component';
import { AddUpdateLeadsComponent } from './leads/add-update-leads/add-update-leads.component';
import { AddUpdateReceptionistDashboardComponent } from './receptionist-dashboard/add-update-receptionist-dashboard/add-update-receptionist-dashboard.component';
import { SearchLeadsComponent } from './leads/search-leads/search-leads.component';
import { SearchPatientComponent } from './patient/search-patient/search-patient.component';
import { ViewSearchPatientComponent } from './patient/search-patient/view-search-patient/view-search-patient.component';
import { ViewSearchLeadsComponent } from './leads/search-leads/view-search-leads/view-search-leads.component';

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
   path: "add-receptionist/:id",  
   component: AddUpdateReceptionistDashboardComponent,
   pathMatch: "full",
   outlet: "receptionist_Menu",
 },
  {
    path: "patient",  
    component: PatientComponent,
    pathMatch: "full",
    outlet: "receptionist_Menu",
  },
  { path: 'add-patient',
  component: AddUpdatePatientComponent,
  outlet: "receptionist_Menu",

 },
 {
   path: "edit-patient/:id",  
   component: AddUpdatePatientComponent,
   pathMatch: "full",
   outlet: "receptionist_Menu",
 },
  {
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
 {
  path: "search-leads",  
  component: SearchLeadsComponent,
  pathMatch: "full",
  outlet: "receptionist_Menu",
},
{
  path: "search-patient",  
  component: SearchPatientComponent,
  pathMatch: "full",
  outlet: "receptionist_Menu",
},
{
  path: "view-search-patient/:id",  
  component: ViewSearchPatientComponent,
  pathMatch: "full",
  outlet: "receptionist_Menu",
},
{
  path: "view-search-leads/:id",  
  component: ViewSearchLeadsComponent,
  pathMatch: "full",
  outlet: "receptionist_Menu",
},

  
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  ReceptionistRoutingModule { }
