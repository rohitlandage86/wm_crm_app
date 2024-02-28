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
  ],
  imports: [
    AdminRoutingModule,
    SharedModule
    
  ]
})
export class AdminModule { }
