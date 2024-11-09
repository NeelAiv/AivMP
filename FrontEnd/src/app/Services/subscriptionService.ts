import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  BASE_URL = environment.baseUrl;
  BASE_URL_DOWNLOAD = `${this.BASE_URL}/uploads/files/`;

  constructor(private http: HttpClient) { }


  subscribeCustomer(emailObject){
    return this.http.post(this.BASE_URL + '/subscribe', emailObject);
    // this.http.post(emailObject){
    //     this.http.post(this.BASE_URL)
    // }
  }

  downloadFile(filename): any {
    return this.http.get(this.BASE_URL_DOWNLOAD+filename, {responseType: 'blob'});
  }

}
