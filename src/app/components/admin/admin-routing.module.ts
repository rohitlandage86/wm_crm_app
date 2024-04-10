import { SourceOfPatientComponent } from './miscellaneous/source-of-patient/source-of-patient.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EntityComponent } from './masters/entity/entity.component';
import { AddUpdateEntityComponent } from './masters/entity/add-update-entity/add-update-entity.component';
import { ServiceTypeComponent } from './masters/service-type/service-type.component';
import { ServiceComponent } from './masters/service/service.component';
import { TreatmentComponent } from './masters/treatment/treatment.component';
import { DiagnosisComponent } from './masters/diagnosis/diagnosis.component';
import { CategoryComponent } from './masters/category/category.component';
import { MedicinesComponent } from './clinical-masters/medicines/medicines.component';
import { DosagesComponent } from './clinical-masters/dosages/dosages.component';
import { InstructionsComponent } from './clinical-masters/instructions/instructions.component';
import { ChiefComplaintsComponent } from './clinical-masters/chief-complaints/chief-complaints.component';
import { TitleComponent } from './miscellaneous/title/title.component';
import { ReferedByComponent } from './miscellaneous/refered-by/refered-by.component';
import { DesignationComponent } from './employee/designation/designation.component';
import { EmployeeComponent } from './employee/employee/employee.component';
import { AuthGuard } from 'src/app/shared/auth-guard.service';

const routes: Routes = [
  { path: "", redirectTo: "admin", pathMatch: "full" },
  { path: "", 
    component: AdminDashboardComponent,
    canActivate:[AuthGuard]
  },
  {
    path: "admin",
    component: AdminDashboardComponent,
    pathMatch: "full",
    outlet: "sub_Menu",
    canActivate:[AuthGuard]
  },
  {
    path: "entity",  
    component: EntityComponent,
    pathMatch: "full",
    outlet: "sub_Menu",
    canActivate:[AuthGuard]
  },
  {
    path: "add-entity",  
    component: AddUpdateEntityComponent,
    pathMatch: "full",
    outlet: "sub_Menu",
    canActivate:[AuthGuard]
  },
  {
    path:'service-type',
    component:ServiceTypeComponent,
    pathMatch:"full",
    outlet:"sub_Menu",
    canActivate:[AuthGuard]
  },
  {
    path:'services',
    component:ServiceComponent,
    pathMatch:"full",
    outlet:"sub_Menu",
    canActivate:[AuthGuard]
  },
  {
    path:'treatment',
    component:TreatmentComponent,
    pathMatch:"full",
    outlet:"sub_Menu",
    canActivate:[AuthGuard]
  },
  {
    path:'diagnosis',
    component:DiagnosisComponent,
    pathMatch:"full",
    outlet:"sub_Menu",
    canActivate:[AuthGuard]
  },
  {
    path:'category',
    component:CategoryComponent,
    pathMatch:"full",
    outlet:"sub_Menu",
    canActivate:[AuthGuard]
  },
  {
    path:'medicines',
    component:MedicinesComponent,
    pathMatch:"full",
    outlet:"sub_Menu",
    canActivate:[AuthGuard]
  },
  {
    path:'dosages',
    component:DosagesComponent,
    pathMatch:"full",
    outlet:"sub_Menu",
    canActivate:[AuthGuard]
  },
  {
    path:'instructions',
    component:InstructionsComponent,
    pathMatch:"full",
    outlet:"sub_Menu",
    canActivate:[AuthGuard]
  },
  {
    path:'chief_complaints',
    component:ChiefComplaintsComponent,
    pathMatch:"full",
    outlet:"sub_Menu",
    canActivate:[AuthGuard]
  },
  {
    path:'title',
    component:TitleComponent,
    pathMatch:"full",
    outlet:"sub_Menu",
    canActivate:[AuthGuard]
  },
  {
    path:'source_of_patient',
    component:SourceOfPatientComponent,
    pathMatch:"full",
    outlet:"sub_Menu",
    canActivate:[AuthGuard]
  },
  {
    path:'refered_by',
    component:ReferedByComponent,
    pathMatch:"full",
    outlet:"sub_Menu",
    canActivate:[AuthGuard]
  },
  {
    path:'designation',
    component:DesignationComponent,
    pathMatch:"full",
    outlet:"sub_Menu",
    canActivate:[AuthGuard]
  },
  {
    path:'employee',
    component:EmployeeComponent,
    pathMatch:"full",
    outlet:"sub_Menu",
    canActivate:[AuthGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
