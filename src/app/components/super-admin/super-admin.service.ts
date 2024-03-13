import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SuperAdminService {
    baseUrl = environment.baseUrl;
    constructor(private http: HttpClient) { }
    // get all customer type.......................
    getAllCustomerypesList(page: any, perPage: any): Observable<any> {
        let params = {
            'page': page,
            'perPage': perPage
        };
        if (page == '' || perPage == '') {
            delete params['page'];
            delete params['perPage'];
        }
        return this.http.get(this.baseUrl + 'api/wm_cutomer_type',{params:params});
    }
    //get All customer type wma...
    getAllCustomerTypeListWma(): Observable<any> {
        return this.http.get(this.baseUrl + 'api/wm_cutomer_type/wma');
    }
    //add new customer type...
    addCustomerType(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'api/wm_cutomer_type', data);
    }
    //update customer type...
    editCustomerType(data: any, id: any): Observable<any> {
        return this.http.put(this.baseUrl + 'api/wm_cutomer_type/' + id, data);
    }
    // customer type status change...
    onCustomerTypeStatusChange(status: any, id: any): Observable<any> {
        const body = { status: status };
        let params = new HttpParams().set('status', status);
        return this.http.patch(this.baseUrl + 'api/wm_cutomer_type/' + id, body, {
            params: params
        });
    }
    // get all Modules.................................
    getAllModulesList(page: any, perPage: any): Observable<any> {
        let params = {
            'page': page,
            'perPage': perPage
        };
        if (page == '' || perPage == '') {
            delete params['page'];
            delete params['perPage'];
        }
        return this.http.get(this.baseUrl + 'api/wm_modules',{params:params});
    } 
    //get All module wma...
    getAllModuleListWma(): Observable<any> {
        return this.http.get(this.baseUrl + 'api/wm_modules/wma');
    }
    //add new Module...
    addModule(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'api/wm_modules', data);
    }
    //update module...
    editModule(data: any, id: any): Observable<any> {
        return this.http.put(this.baseUrl + 'api/wm_modules/' + id, data);
    }
    // Module status change...
    onModuleStatusChange(status: any, id: any): Observable<any> {
        const body = { status: status };
        let params = new HttpParams().set('status', status);
        return this.http.patch(this.baseUrl + 'api/wm_modules/' + id, body, {
            params: params
        });
    }

      // get all customers.......................
      getAllCustomersList(page: any, perPage: any): Observable<any> {
        let params = {
            'page': page,
            'perPage': perPage
        };
        if (page == '' || perPage == '') {
            delete params['page'];
            delete params['perPage'];
        }
        return this.http.get(this.baseUrl + 'api/wm_customer_header',{params:params});
    }
    //get All customers wma...
    getAllCustomersListWma(): Observable<any> {
        return this.http.get(this.baseUrl + 'api/wm_customer_header/wma');
    }
    //add new customers...
    addCustomers(data: any): Observable<any> {
        return this.http.post(this.baseUrl + 'api/wm_customer_header', data);
    }
    //update customers...
    editCustomers(data: any, id: any): Observable<any> {
        return this.http.put(this.baseUrl + 'api/wm_customer_header/' + id, data);
    }
    // customers status change...
    onCustomersStatusChange(status: any, id: any): Observable<any> {
        const body = { status: status };
        let params = new HttpParams().set('status', status);
        return this.http.patch(this.baseUrl + 'api/wm_customer_header/' + id, body, {
            params: params
        });
    }
     //state list
  allstateList(){
    return this.http.get(this.baseUrl + 'api/super_admin/state');
  }
       //lead-status list
  allLeadStatusList(){
    return this.http.get(this.baseUrl + 'api/super_admin/lead-status');
  }
    
    

}
