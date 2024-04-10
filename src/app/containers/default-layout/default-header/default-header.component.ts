import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

    @Input() sidebarId: string = "sidebar";
    data:any ={}
    public newMessages = new Array(4)
    public newTasks = new Array(5)
    public newNotifications = new Array(5)

  constructor(private classToggler: ClassToggleService) {
    super();
    let userData:any=localStorage.getItem('data');
    if (JSON.parse(userData)) {
      this.data=JSON.parse(userData);
    }
    
  }
}
