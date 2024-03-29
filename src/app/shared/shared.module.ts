import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvatarModule, BadgeModule, BreadcrumbModule, ButtonGroupModule, ButtonModule, CardModule, DropdownModule, FooterModule, FormModule, GridModule, HeaderModule, ListGroupModule, NavModule, ProgressModule, SidebarModule, TableModule, TabsModule, UtilitiesModule } from '@coreui/angular';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { IconModule } from '@coreui/icons-angular';
import { WidgetModule } from '@coreui/angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CardModule,
    SidebarModule,
    NgScrollbarModule,
    ButtonModule,
    ButtonGroupModule,
    TableModule,
    GridModule,
    IconModule,
    FormModule,
    ReactiveFormsModule,
    WidgetModule,
    ChartjsModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    HeaderModule,
    NavModule,
    UtilitiesModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    FormsModule
  ],
  exports:[
    CommonModule,
    CardModule,
    SidebarModule,
    NgScrollbarModule,
    ButtonModule,
    ButtonGroupModule,
    TableModule,
    GridModule,
    IconModule,
    FormModule,
    ReactiveFormsModule,
    WidgetModule,
    ChartjsModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    HeaderModule,
    NavModule,
    UtilitiesModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    FormsModule

    
  ]
})
export class SharedModule { }
