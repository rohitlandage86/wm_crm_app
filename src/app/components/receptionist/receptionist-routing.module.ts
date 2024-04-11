import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReceptionistDashboardComponent} from './receptionist-dashboard/receptionist-dashboard.component';
import {PatientComponent} from './patient/patient.component';
import { AddUpdatePatientComponent } from './patient/add-update-patient/add-update-patient.component';
import { LeadsComponent } from './leads/leads.component';
import { AddUpdateLeadsComponent } from './leads/add-update-leads/add-update-leads.component';
import { AddUpdateReceptionistDashboardComponent } from './receptionist-dashboard/add-update-receptionist-dashboard/add-update-receptionist-dashboard.component';
import { FollowUpComponent } from './leads/follow-up/follow-up.component';
import { SearchLeadsComponent } from './leads/search-leads/search-leads.component';
import { SearchPatientComponent } from './patient/search-patient/search-patient.component';
import { ViewSearchPatientComponent } from './patient/search-patient/view-search-patient/view-search-patient.component';
import { ViewSearchLeadsComponent } from './leads/search-leads/view-search-leads/view-search-leads.component';
import { ReceptionistPatientReportComponent } from './reports/receptionist-patient-report/receptionist-patient-report.component';
import { ReceptionistPatientVisitReportComponent } from './reports/receptionist-patient-visit-report/receptionist-patient-visit-report.component';
import { ReceptionistLeadReportComponent } from './reports/receptionist-lead-report/receptionist-lead-report.component';
import { ReceptionistFollowUpReportComponent } from './reports/receptionist-follow-up-report/receptionist-follow-up-report.component';
import { ReceptionistAppointmentReportComponent } from './reports/receptionist-appointment-report/receptionist-appointment-report.component';
import { AuthGuard } from 'src/app/shared/auth-guard.service';

const routes: Routes = [
  { path: "", redirectTo: "receptionist", pathMatch: "full" },
  { path: "", 
    component: ReceptionistDashboardComponent,
    canActivate:[AuthGuard]
  },
  {
    path: "receptionist",
    component: ReceptionistDashboardComponent,
    pathMatch: "full",
    outlet: "receptionist_Menu",
    canActivate:[AuthGuard]
  },
 {
   path: "add-receptionist/:id",  
   component: AddUpdateReceptionistDashboardComponent,
   pathMatch: "full",
   outlet: "receptionist_Menu",
   canActivate:[AuthGuard]
 },
  {
    path: "patient",  
    component: PatientComponent,
    pathMatch: "full",
    outlet: "receptionist_Menu",
    canActivate:[AuthGuard]
  },
  { path: 'add-patient',
  component: AddUpdatePatientComponent,
  outlet: "receptionist_Menu",
  canActivate:[AuthGuard]

 },
 {
   path: "edit-patient/:id",  
   component: AddUpdatePatientComponent,
   pathMatch: "full",
   outlet: "receptionist_Menu",
   canActivate:[AuthGuard]
 },
  {
    path: "leads",  
    component: LeadsComponent,
    pathMatch: "full",
    outlet: "receptionist_Menu",
    canActivate:[AuthGuard]
  },
  { path: 'add-leads',
  component: AddUpdateLeadsComponent,
  outlet: "receptionist_Menu",
  canActivate:[AuthGuard]

 },
 {
   path: "edit-leads/:id",  
   component: AddUpdateLeadsComponent,
   pathMatch: "full",
   outlet: "receptionist_Menu",
   canActivate:[AuthGuard]
 },
 {
  path: "search-leads",  
  component: SearchLeadsComponent,
  pathMatch: "full",
  outlet: "receptionist_Menu",
  canActivate:[AuthGuard]
},
{
  path: "search-patient",  
  component: SearchPatientComponent,
  pathMatch: "full",
  outlet: "receptionist_Menu",
  canActivate:[AuthGuard]
},
{
  path: "view-search-patient/:id",  
  component: ViewSearchPatientComponent,
  pathMatch: "full",
  outlet: "receptionist_Menu",
  canActivate:[AuthGuard]
},
{
  path: "view-search-leads/:id",  
  component: ViewSearchLeadsComponent,
  pathMatch: "full",
  outlet: "receptionist_Menu",
  canActivate:[AuthGuard]
},

{
  path: "lead-report",  
  component:  ReceptionistLeadReportComponent,
  pathMatch: "full",
  outlet: "receptionist_Menu",
  canActivate:[AuthGuard]
},
{
  path: "lead-follow-up-report",  
  component:  ReceptionistFollowUpReportComponent,
  pathMatch: "full",
  outlet: "receptionist_Menu",
  canActivate:[AuthGuard]
},
{
  path: "follow-up",  
  component: FollowUpComponent,
  pathMatch: "full",
  outlet: "receptionist_Menu",
  canActivate:[AuthGuard]
},
{
  path: "patient-report",  
  component: ReceptionistPatientReportComponent,
  pathMatch: "full",
  outlet: "receptionist_Menu",
  canActivate:[AuthGuard]
},
{
  path: "patient-visit-report",  
  component: ReceptionistPatientVisitReportComponent,
  pathMatch: "full",
  outlet: "receptionist_Menu",
  canActivate:[AuthGuard]
},
{
  path: "appointment",  
  component: ReceptionistAppointmentReportComponent,
  pathMatch: "full",
  outlet: "receptionist_Menu",
  canActivate:[AuthGuard]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  ReceptionistRoutingModule { }
