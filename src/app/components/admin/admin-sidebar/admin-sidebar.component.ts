import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.scss'
})
export class AdminSidebarComponent {
navItems:any =[{
  name: 'Dashboard',
  url: ['/admin', { outlets: { sub_Menu: 'admin' } }],
  iconComponent: { name: 'cil-speedometer' },
  // badge: {
  //   color: 'info',
  //   text: 'NEW'
  // }
},

{
  name: 'Entity',
  url: ['/admin', { outlets: { sub_Menu: 'entity' } }],
  iconComponent: { name: 'cil-drop' }
},
{
  name: 'Services',
  url: 'services',
  linkProps: { fragment: 'someAnchor' },
  iconComponent: { name: 'cil-pencil' }
},

]

}
