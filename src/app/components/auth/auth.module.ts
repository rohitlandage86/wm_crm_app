import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { IconModule } from '@coreui/icons-angular';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../../shared/shared.module'

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    IconModule,
    SharedModule
  ]
})
export class AuthModule { }
