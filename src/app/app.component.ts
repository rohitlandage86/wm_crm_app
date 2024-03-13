import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { SharedService } from './shared/shared.service';
// import { Title } from '@angular/platform-browser';
import { INavData } from '@coreui/angular';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentChecked {
  title: any = 'OPD'

  isSuperAdminDashboard = false;
  isAdminDashboard = false;
  isDoctorDashboard = false;
  isReceptionistDashboard = false;

  navAdminItems!: INavData[];
  navDoctorItems!: INavData[];
  navReceptionistItems!: INavData[];
  navSuperAdminItems!: INavData[];

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
    private _sharedService: SharedService,
    private _toastrService:ToastrService
  ) {
    titleService.setTitle(this.title);
    // iconSet singleton
    iconSetService.icons = { ...iconSubset };
  }
  ngOnInit() {
    this.navItemList();
  }
  ngAfterContentChecked() {
    let currentRoute = this.router.routerState.snapshot.url;
    if (currentRoute == "/" || currentRoute == "/auth" || currentRoute == "/auth/sign-up") {
      this.isAdminDashboard = false;
      this.isDoctorDashboard = false;
      this.isReceptionistDashboard = false;
      this.isSuperAdminDashboard = false;
    } else if (currentRoute.split('/')[1] == 'admin') {
      this.isAdminDashboard = true;
      this.isDoctorDashboard = false;
      this.isReceptionistDashboard = false;
      this.isSuperAdminDashboard = false;
    } else if (currentRoute.split('/')[1] == 'doctor') {
      this.isDoctorDashboard = true;
      this.isAdminDashboard = false;
      this.isReceptionistDashboard = false;
      this.isSuperAdminDashboard = false;
    } else if (currentRoute.split('/')[1] == 'receptionist') {
      this.isAdminDashboard = false;
      this.isDoctorDashboard = false;
      this.isReceptionistDashboard = true;
      this.isSuperAdminDashboard = false;
    } else if (currentRoute.split('/')[1] == 'super-admin') {
      this.isAdminDashboard = false;
      this.isDoctorDashboard = false;
      this.isReceptionistDashboard = false;
      this.isSuperAdminDashboard = true;
    }

    // currentRoute.split('/')[1] == 'admin' ? this.route = ['/admin', { outlets: { sub_Menu: 'admin' } }] : this.route = ['/org', { outlets: { org_Menu: 'admin' } }];
  }
  navItemList() {
    //nav super admin items
    this.navSuperAdminItems = [{
      name: 'Dashboard',
      url: ['/super-admin', { outlets: { super_Menu: 'super-admin' } }],
      iconComponent: { name: 'cil-speedometer' },
    },
    {
      name: 'Customers',
      url: ['/super-admin', { outlets: { super_Menu: 'customers' } }],
      iconComponent: { name: 'cil-people' }
    },
    {
      name: 'Customer Type',
      url: ['/super-admin', { outlets: { super_Menu: 'customer-type' } }],
      iconComponent: { name: 'cil-drop' }
    },
    {
      name: 'Modules',
      url: ['/super-admin', { outlets: { super_Menu: 'modules' } }],
      iconComponent: { name: 'cilList' }
    },
    {
      name: 'Logout',
      url: '/auth',
      iconComponent: { name: 'cil-account-logout' }
    },
    ];
    //nav admin items
    this.navAdminItems = [{
      name: 'Dashboard',
      url: ['/admin', { outlets: { sub_Menu: 'admin' } }],
      iconComponent: { name: 'cil-speedometer' },
    },

    {
      name: 'Masters',
      url: '/masters',
      iconComponent: { name: 'cil-puzzle' },
      children: [
        {
          name: 'Entities',
          url: ['/admin', { outlets: { sub_Menu: 'entity' } }]
        },
        {
          name: 'Services',
          url: ['/admin', { outlets: { sub_Menu: 'services' } }]
        },
        {
          name: 'Service Type',
          url: ['/admin', { outlets: { sub_Menu: 'service-type' } }]
        },
        {
          name: 'Treatment Advice',
          url: ['/admin', { outlets: { sub_Menu: 'treatment' } }]
        },
        {
          name: 'Diagnosis',
          url: ['/admin', { outlets: { sub_Menu: 'diagnosis' } }]
        }, 
        {
          name: 'Category',
          url: ['/admin', { outlets: { sub_Menu: 'category' } }]
        },     
      ]
    },
    
    {
      name: 'Clinical Masters',
      url: '/masters',
      iconComponent: { name: 'cil-puzzle' },
      children: [
        {
          name: 'Medicines',
          url: ['/admin', { outlets: { sub_Menu: 'medicines' } }]
        },
        {
          name: 'Dosages',
          url: ['/admin', { outlets: { sub_Menu: 'dosages' } }]
        },
        {
          name: 'Instructions',
          url: ['/admin', { outlets: { sub_Menu: 'instructions' } }]
        },
        {
          name: 'Chief Complaint',
          url: ['/admin', { outlets: { sub_Menu: 'chief_complaints' } }]
        },
             
      ]
    },
    {
      name: 'Miscellaneous',
      url: '/masters',
      iconComponent: { name: 'cil-puzzle' },
      children: [
        {
          name: 'Payment Type',
          url: ['/admin', { outlets: { sub_Menu: 'payment_type' } }]
        },
        {
          name: 'Title',
          url: ['/admin', { outlets: { sub_Menu: 'title' } }]
        },
        {
          name: 'Source Of Patient',
          url: ['/admin', { outlets: { sub_Menu: 'source_of_patient' } }]
        },
        {
          name: 'Lead Status',
          url: '/base/carousel'
        },
        {
          name: 'Refered By',
          url: ['/admin', { outlets: { sub_Menu: 'refered_by' } }]
        },
           
      ]
    },
    {
      name: 'Employee',
      url: '/masters',
      iconComponent: { name: 'cil-puzzle' },
      children: [
        {
          name: 'Designation',
          url: ['/admin', { outlets: { sub_Menu: 'designation' } }]
        },
        {
          name: 'Employee',
          url:['/admin', { outlets: { sub_Menu: 'employee' } }]
        },        
      ]
    },
    {
      name: 'Logout',
      url: '/auth',
      iconComponent: { name: 'cil-account-logout' }
    },
    ];
    //nav doctor items
    this.navDoctorItems = [{
      name: 'Dashboard',
      url: ['/doctor', { outlets: { doc_Menu: 'admin' } }],
      iconComponent: { name: 'cil-speedometer' },
    },

    {
      name: 'lead',
      url: ['/doctor', { outlets: { doc_Menu: 'lead' } }],
      iconComponent: { name: 'cil-drop' }
    },
    {
      name: 'Logout',
      url: '/auth',
      iconComponent: { name: 'cil-account-logout' }
    },

    ];
    //nav receptionist items
    this.navReceptionistItems = [{
      name: 'Dashboard',
      url: ['/receptionist', { outlets: { receptionist_Menu: 'receptionist' } }],
      iconComponent: { name: 'cil-speedometer' },
    },
    {
      name: 'Patient',
      url: ['/receptionist', { outlets: { receptionist_Menu: 'patient' } }],
      iconComponent: { name: 'cil-drop' }
    },
    {
      name: 'Leads',
      url: ['/receptionist', { outlets: { receptionist_Menu: 'leads' } }],
      iconComponent: { name: 'cilList' }
    },
    {
      name: 'Logout',
      url: '/auth',
      iconComponent: { name: 'cil-account-logout' }
    },
    ];
  }
  logout() {
    // Clear localStorage on logout
    localStorage.clear();
    // Redirect to the login page
    window.location.href = '/auth'; // Assuming '/auth' is your login page
  }
}
