import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WidgetServicesService } from '../Services/widget-services.service';
import * as categories from '../categories.json';
import { MathcesCategoryPipe} from'../pipes/MathcesCategoryPipe';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SharedVarService } from '../Services/SharedVarService';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.css']
})
export class WidgetsComponent implements OnInit {
  compCategories: any = (categories as any).default;
  srtName;
  srtPrice="free";
  sortType=false;

  baseUrl = environment.baseUrl;
  widgetType;
  selectedCategory;
  selectedSubCategory;
  widgetList$ = new Observable<any>() ;

  AllWidgets : any=[] ;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private sharVarService : SharedVarService,
    ) {}

  ngOnInit(): void {
    this.widgetList$ = this.sharVarService.$widgetList.pipe(map(data => {console.log("Fetched widget data:", data);
      return data;
    }));
    // this.widgetService.GetAllWidget().subscribe(data => {
    //   this.AllWidgets=data;
    //   console.log(this.AllWidgets);
    // });

    this.route.paramMap.subscribe(params => {
      this.selectedCategory = params.get("catType");
      this.selectedSubCategory = params.get("subCatType");
    })
  }

  openComponent(catValue){
    this.router.navigate(['/component/', catValue]);
  }

  openComponentWithSub(catValue,subCatValue){
    this.router.navigate(['/component/', catValue,subCatValue]);
  }

}
