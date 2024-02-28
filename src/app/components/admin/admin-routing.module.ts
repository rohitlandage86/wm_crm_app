import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EntityComponent } from './masters/entity/entity.component';
import { AddUpdateEntityComponent } from './masters/entity/add-update-entity/add-update-entity.component';
import { ServiceTypeComponent } from './masters/service-type/service-type.component';
import { ServiceComponent } from './masters/service/service.component';

const routes: Routes = [
  { path: "", redirectTo: "admin", pathMatch: "full" },
  { path: "", component: AdminDashboardComponent },
  {
    path: "admin",
    component: AdminDashboardComponent,
    pathMatch: "full",
    outlet: "sub_Menu",
  },
  {
    path: "entity",  
    component: EntityComponent,
    pathMatch: "full",
    outlet: "sub_Menu",
  },
  {
    path: "add-entity",  
    component: AddUpdateEntityComponent,
    pathMatch: "full",
    outlet: "sub_Menu",
  },
  {
    path:'service-type',
    component:ServiceTypeComponent,
    pathMatch:"full",
    outlet:"sub_Menu"
  },
  {
    path:'services',
    component:ServiceComponent,
    pathMatch:"full",
    outlet:"sub_Menu"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
