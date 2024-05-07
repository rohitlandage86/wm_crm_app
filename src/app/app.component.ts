import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { SharedService } from './shared/shared.service';
// import { Title } from '@angular/platform-browser';
import { INavData } from '@coreui/angular';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr'
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentChecked {
  baseUrl = environment.baseUrl;
  title: any = 'Nirmiti'
  data: any = {}
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
    private _toastrService: ToastrService
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
    } else if (currentRoute?.split('/')[1] == 'admin') {
      this.isAdminDashboard = true;
      this.isDoctorDashboard = false;
      this.isReceptionistDashboard = false;
      this.isSuperAdminDashboard = false;
    } else if (currentRoute?.split('/')[1] == 'doctor') {
      this.isDoctorDashboard = true;
      this.isAdminDashboard = false;
      this.isReceptionistDashboard = false;
      this.isSuperAdminDashboard = false;
    }
    else if (currentRoute?.split('/')[1] == 'receptionist') {
      this.isAdminDashboard = false;
      this.isDoctorDashboard = false;
      this.isReceptionistDashboard = true;
      this.isSuperAdminDashboard = false;
    } else if (currentRoute?.split('/')[1] == 'super-admin') {
      this.isAdminDashboard = false;
      this.isDoctorDashboard = false;
      this.isReceptionistDashboard = false;
      this.isSuperAdminDashboard = true;
    }
    let userData: any = localStorage.getItem('data');
    if (JSON.parse(userData)) {
      this.data = JSON.parse(userData);
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
          name: 'Title',
          url: ['/admin', { outlets: { sub_Menu: 'title' } }]
        },
        {
          name: 'Source Of Patient',
          url: ['/admin', { outlets: { sub_Menu: 'source_of_patient' } }]
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
          url: ['/admin', { outlets: { sub_Menu: 'employee' } }]
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
      class: 'bg-dark'
    },
    {
      name: 'Consultation',
      iconComponent: { name: 'cilList' },
      children: [
        {
          name: 'Patients',
          url: ['/doctor', { outlets: { doc_Menu: 'patient' } }],

        },
        {
          name: 'Search',
          url: ['/doctor', { outlets: { doc_Menu: 'doctor-search-patient' } }],

        }

      ]
    },
    {
      name: 'Lead',
      iconComponent: { name: 'cilList' },
      children: [
        {
          name: 'Registered',
          url: ['/doctor', { outlets: { doc_Menu: 'lead' } }],

        },
        {
          name: 'Follow up',
          url: ['/doctor', { outlets: { doc_Menu: 'follow-up' } }],

        },
        {
          name: 'Search',
          url: ['/doctor', { outlets: { doc_Menu: 'doctor-search-lead' } }],

        }

      ]
    },
    {
      name: 'Surgery Bill',
      iconComponent: { name: 'cilList' },
      children: [
        {
          name: 'Surgery Bills',
          url: ['/doctor', { outlets: { doc_Menu: 'bills' } }],

        },
        {
          name: 'Search',
          url: ['/doctor', { outlets: { doc_Menu: 'doctor-search-bill' } }],

        }

      ]
    },
    {
      name: 'Reports',
      iconComponent: { name: 'cil-description' },
      class: 'bg-dark'
    },
    {
      name: 'CRM',
      iconComponent: { name: 'cilList' },
      children: [
        {
          name: 'Leads',
          url: ['/doctor', { outlets: { doc_Menu: 'lead-reports' } }],

        },
        {
          name: 'Follow up',
          url: ['/doctor', { outlets: { doc_Menu: 'lead-follow-up-reports' } }],

        },
        {
          name: 'Call Logs',
          url: ['/doctor', { outlets: { doc_Menu: 'todays-call' } }],

        }
      ]
    },
    {
      name: 'OPD',
      iconComponent: { name: 'cilList' },
      children: [

        {
          name: 'Registrations',
          url: ['/doctor', { outlets: { doc_Menu: 'patient-reports' } }],

        },
        {
          name: 'Visits',
          url: ['/doctor', { outlets: { doc_Menu: 'patient-visit-reports' } }],

        },

      ]
    },
  
    {
      name: 'Clinical',
      iconComponent: { name: 'cilList' },
      children: [
        {
          name: 'Diagnosis',
          url: ['/doctor', { outlets: { doc_Menu: 'diagnosis-reports' } }],

        },
        {
          name: 'Treatment',
          url: ['/doctor', { outlets: { doc_Menu: 'treatment-reports' } }],

        }
      ]
    },
    {
      name: 'Surgery Bill',
      iconComponent: { name: 'cilList' },
      children: [
        {
          name: 'Date Wise',
          url: ['/doctor', { outlets: { doc_Menu: 'doctor-bill-reports' } }],

        }
      ]
    },
    {
      name: 'Payment History',
      url: ['/doctor', { outlets: { doc_Menu: 'doctor-payment-history-reports' } }],
      iconComponent: { name: 'cilList' },
    },
    {
      name: 'Appointments',
      url: ['/doctor', { outlets: { doc_Menu: 'appointments' } }],
      iconComponent: { name: 'cilList' },
    },

    {
      name: 'Logout',
      url: '/auth',
      iconComponent: { name: 'cil-account-logout' },
      class: 'bg-dark'
    },

    ];
    //nav receptionist items
    this.navReceptionistItems = [{
      name: 'Dashboard',
      url: ['/receptionist', { outlets: { receptionist_Menu: 'receptionist' } }],
      iconComponent: { name: 'cil-speedometer' },
      class: 'bg-dark'
    },

    {
      name: 'Patients',
      iconComponent: { name: 'cilList' },
      children: [
        {
          name: 'Create',
          url: ['/receptionist', { outlets: { receptionist_Menu: 'patient' } }],

        },
        {
          name: 'Search',
          url: ['/receptionist', { outlets: { receptionist_Menu: 'search-patient' } }],

        }

      ]
    },

    {
      name: 'Leads',
      iconComponent: { name: 'cilList' },
      children: [
        {
          name: 'Create',
          url: ['/receptionist', { outlets: { receptionist_Menu: 'leads' } }],

        },
        {
          name: 'Follow up',
          url: ['/receptionist', { outlets: { receptionist_Menu: 'follow-up' } }],

        },
        {
          name: 'Search',
          url: ['/receptionist', { outlets: { receptionist_Menu: 'search-leads' } }],

        }

      ]
    },
    {
      name: 'Surgery Bill',
      iconComponent: { name: 'cilList' },
      children: [
        {
          name: 'Generate',
          url: ['/receptionist', { outlets: { receptionist_Menu: 'bill' } }],

        },
        {
          name: 'Search',
          url: ['/receptionist', { outlets: { receptionist_Menu: 'search-bill' } }],

        }

      ]
    },
    {
      name: 'Reports',
      iconComponent: { name: 'cil-description' },
      class: 'bg-dark'
    },
    {
      name: 'CRM',
      iconComponent: { name: 'cilList' },
      children: [
        {
          name: 'Leads',
          url: ['/receptionist', { outlets: { receptionist_Menu: 'lead-report' } }],

        },
        {
          name: 'Follow up',
          url: ['/receptionist', { outlets: { receptionist_Menu: 'lead-follow-up-report' } }],

        }

      ]
    },

    {
      name: 'OPD',
      iconComponent: { name: 'cilList' },
      children: [
        {
          name: 'Registrations',
          url: ['/receptionist', { outlets: { receptionist_Menu: 'patient-report' } }],

        },
        {
          name: 'Visits',
          url: ['/receptionist', { outlets: { receptionist_Menu: 'patient-visit-report' } }],

        }
      ]
    },
    {
      name: 'Surgery Bill',
      iconComponent: { name: 'cilList' },
      children: [
        {
          name: 'Date Wise',
          url: ['/receptionist', { outlets: { receptionist_Menu: 'datewise-bill-report' } }],

        }
      ]
    },
    {
      name: 'Appointments',
      url: ['/receptionist', { outlets: { receptionist_Menu: 'appointment' } }],
      iconComponent: { name: 'cilList' },
    },

    {
      name: 'Logout',
      url: '/auth',
      iconComponent: { name: 'cil-account-logout' },
      class: 'bg-dark'
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
