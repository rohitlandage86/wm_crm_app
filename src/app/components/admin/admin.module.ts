import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { EntityComponent } from './masters/entity/entity.component';
import { AddUpdateEntityComponent } from './masters/entity/add-update-entity/add-update-entity.component';
import { ServiceComponent } from './masters/service/service.component';
import { AddUpdateServiceComponent } from './masters/service/add-update-service/add-update-service.component';
import { ServiceTypeComponent } from './masters/service-type/service-type.component';
import { AddUpdateServiceTypeComponent } from './masters/service-type/add-update-service-type/add-update-service-type.component';
import { TreatmentComponent } from './masters/treatment/treatment.component';
import { AddUpdateTreatmentComponent } from './masters/treatment/add-update-treatment/add-update-treatment.component';
import { DiagnosisComponent } from './masters/diagnosis/diagnosis.component';
import { AddUpdateDiagnosisComponent } from './masters/diagnosis/add-update-diagnosis/add-update-diagnosis.component';
import { CategoryComponent } from './masters/category/category.component';
import { AddUpdateCategoryComponent } from './masters/category/add-update-category/add-update-category.component';
import { MedicinesComponent } from './clinical-masters/medicines/medicines.component';
import { AddUpdateMedicinesComponent } from './clinical-masters/medicines/add-update-medicines/add-update-medicines.component';
import { DosagesComponent } from './clinical-masters/dosages/dosages.component';
import { AddUpdateDosagesComponent } from './clinical-masters/dosages/add-update-dosages/add-update-dosages.component';
import { InstructionsComponent } from './clinical-masters/instructions/instructions.component';
import { AddUpdateInstructionsComponent } from './clinical-masters/instructions/add-update-instructions/add-update-instructions.component';
import { ChiefComplaintsComponent } from './clinical-masters/chief-complaints/chief-complaints.component';
import { AddUpdateChiefComplaintsComponent } from './clinical-masters/chief-complaints/add-update-chief-complaints/add-update-chief-complaints.component';
import { TitleComponent } from './miscellaneous/title/title.component';
import { AddUpdateTitleComponent } from './miscellaneous/title/add-update-title/add-update-title.component';
import { SourceOfPatientComponent } from './miscellaneous/source-of-patient/source-of-patient.component';
import { AddUpdateSourceOfPatientComponent } from './miscellaneous/source-of-patient/add-update-source-of-patient/add-update-source-of-patient.component';
import { ReferedByComponent } from './miscellaneous/refered-by/refered-by.component';
import { AddUpdateReferedByComponent } from './miscellaneous/refered-by/add-update-refered-by/add-update-refered-by.component';
import { DesignationComponent } from './employee/designation/designation.component';
import { AddUpdateDesignationComponent } from './employee/designation/add-update-designation/add-update-designation.component';
import { EmployeeComponent } from './employee/employee/employee.component';
import { AddUpdateEmployeeComponent } from './employee/employee/add-update-employee/add-update-employee.component';


@NgModule({
  declarations: [
    AdminSidebarComponent,
    AdminDashboardComponent,
    EntityComponent,
    AddUpdateEntityComponent,
    ServiceComponent,
    AddUpdateServiceComponent,
    ServiceTypeComponent,
    AddUpdateServiceTypeComponent,
    TreatmentComponent,
    AddUpdateTreatmentComponent,
    DiagnosisComponent,
    AddUpdateDiagnosisComponent,
    CategoryComponent,
    AddUpdateCategoryComponent,
    MedicinesComponent,
    AddUpdateMedicinesComponent,
    DosagesComponent,
    AddUpdateDosagesComponent,
    InstructionsComponent,
    AddUpdateInstructionsComponent,
    ChiefComplaintsComponent,
    AddUpdateChiefComplaintsComponent,
    TitleComponent,
    AddUpdateTitleComponent,
    SourceOfPatientComponent,
    AddUpdateSourceOfPatientComponent,
    ReferedByComponent,
    AddUpdateReferedByComponent,
    DesignationComponent,
    AddUpdateDesignationComponent,
    EmployeeComponent,
    AddUpdateEmployeeComponent

  ],
  imports: [
    AdminRoutingModule,
    SharedModule
    
  ]
})
export class AdminModule { }
