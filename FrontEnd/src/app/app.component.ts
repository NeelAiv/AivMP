import { Component } from '@angular/core';
import { WidgetServicesService } from './Services/widget-services.service';
import { WidgetService} from './widgetfun/WidgetService';
import { SharedVarService } from './Services/SharedVarService';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
// import { AlertService } from './alert/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AivMarketplace';
  // private alertService : AlertService,
  constructor(private widgetService : WidgetServicesService,private sharVarService :SharedVarService){}
  public widgetList$ : Observable<any>=new Observable<any>();
  currentUser;
  ngOnInit(): void {

    this.widgetService.GetAllWidget().subscribe(data =>{
      this.sharVarService.setWidgetList(data);
    });
    this.currentUser=(JSON.parse(localStorage.getItem('currentUser')));
    // if(this.currentUser != null && this.currentUser != {} )
    // {
    //   this.sharVarService.setUserObjectValue(this.currentUser);

    // }
    if (this.currentUser != null && Object.keys(this.currentUser).length > 0) {
      this.sharVarService.setUserObjectValue(this.currentUser);
  }

  }

}
