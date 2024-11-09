import { Component, OnInit } from '@angular/core';
import * as slidercategories from '../slider-categories.json';
import { Observable } from 'rxjs';
import { WidgetService } from '../widgetfun/WidgetService';
import { SharedVarService } from '../Services/SharedVarService';
import { tap, map } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubscribeComponent } from '../subscribe/subscribe.component';
import { environment } from '../../environments/environment';
// import { CreateAccountComponent } from '../create-account/create-account.component';


@Component({
  selector: 'app-slider-container',
  templateUrl: './slider-container.component.html',
  styleUrls: ['./slider-container.component.css']
})
export class SliderContainerComponent implements OnInit {
  sliderCategories: any = (slidercategories as any).default;
  SlideOptions = { items: 3, dots: true, nav: true };
  CarouselOptions = { items: 6, dots: true, nav: true };
  baseUrl = environment.baseUrl;
  widgetList$ = new Observable<any>() ;
  public user$ : Observable<any> = new Observable<any>();

  constructor(private sharVarService : SharedVarService, private modalService : NgbModal ) { }

  ngOnInit(): void {
    this.widgetList$ = this.sharVarService.$widgetList.pipe(
      tap(data => {
      if(data.length >0) {
        this.carousel();
      }
    }),
    map(data => data));

    this.user$ = this.sharVarService.$user.pipe(tap(data => {
    }),map(data => data));
  }

  carousel(){
    setTimeout(() => {
      // @ts-ignore
      $('.owl-carousel').owlCarousel({
        // loop: true,
        margin: 30,
        // autoplay: true,
        responsiveClass: true,
        responsive: {
          0: {
            items: 1,
            nav: true
          },
          600: {
            items: 3,
            nav: false
          },
          1000: {
            items: 4,
            nav: true,
            loop: true
          }
        }
      });
    });
  }

  openDownloadModal(fileName){
    const modalRef =this.modalService.open(SubscribeComponent);
    modalRef.componentInstance.fileName = fileName;
  }

}
