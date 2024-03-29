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
import { ReceptionistPatientReportComponent } from './reports/receptionist-patient-report/receptionist-patient-report.component';
import { ReceptionistPatientVisitReportComponent } from './reports/receptionist-patient-visit-report/receptionist-patient-visit-report.component';
import { ReceptionistLeadReportComponent } from './reports/receptionist-lead-report/receptionist-lead-report.component';
import { ReceptionistFollowUpReportComponent } from './reports/receptionist-follow-up-report/receptionist-follow-up-report.component';
import { ReceptionistAppointmentReportComponent } from './reports/receptionist-appointment-report/receptionist-appointment-report.component';

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
   path: "edit-receptionist/:id",  
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
  path: "lead-report",  
  component:  ReceptionistLeadReportComponent,
  pathMatch: "full",
  outlet: "receptionist_Menu",
},
{
  path: "lead-follow-up-report",  
  component:  ReceptionistFollowUpReportComponent,
  pathMatch: "full",
  outlet: "receptionist_Menu",
},
{
  path: "patient-report",  
  component: ReceptionistPatientReportComponent,
  pathMatch: "full",
  outlet: "receptionist_Menu",
},
{
  path: "patient-visit-report",  
  component: ReceptionistPatientVisitReportComponent,
  pathMatch: "full",
  outlet: "receptionist_Menu",
},
{
  path: "appointment",  
  component: ReceptionistAppointmentReportComponent,
  pathMatch: "full",
  outlet: "receptionist_Menu",
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  ReceptionistRoutingModule { }
