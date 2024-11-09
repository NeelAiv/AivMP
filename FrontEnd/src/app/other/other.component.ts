import { Component, OnInit } from '@angular/core';
import { SharedVarService } from '../Services/SharedVarService';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.css']
})
export class OtherComponent implements OnInit {

  constructor(private sharVarService : SharedVarService ) { }

  SlideOptions = { items: 3, dots: true, nav: true };
  CarouselOptions = { items: 6, dots: true, nav: true };
  baseUrl = environment.baseUrl;
  widgetList$ = new Observable<any>() ;

  ngOnInit(): void {
    this.widgetList$ = this.sharVarService.$widgetList.pipe(map(data => data));
    this.carousel();
  }

  carousel(){
    setTimeout(() => {
      // @ts-ignore
      $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 30,
        autoplay: true,
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
    }, 2000);
  }


}
