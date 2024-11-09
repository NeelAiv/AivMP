import { Component, OnInit } from '@angular/core';
import { WidgetService } from '../widgetfun/WidgetService';
import { widget } from '../widgetfun/widget';
import { takeWhile, map, tap } from 'rxjs/operators';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { WidgetServicesService } from '../Services/widget-services.service';
import { CommentService } from '../Services/commentService';
import { SharedVarService } from '../Services/SharedVarService';
import { Router } from '@angular/router'
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubscribeComponent } from '../subscribe/subscribe.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IuserToUpdate } from '../my-profile/my-profile.component';
import { NgForm } from '@angular/forms';
import { environment } from '../../environments/environment';


export const comment = {
  user_id: 0,
  comment: null,
  component_id: 0,
  rate: 0
}

export const commentListConst ={
  comment: '',
  date: '',
  profile_image: '',
  rate_count: 0,
  username: ''
  }

export const widgetConst ={
  category: '',
  comment_id: 0,
  created_date: '',
  description: '',
  details: '',
  download_link: '',
  downloaded: 0,
  features: '',
  file_path: '',
  id: 0,
  image: '',
  last_update_date: '',
  main_page: false,
  no_of_comments: 0,
  price: 0,
  purchase_option: '',
  rate: 0,
  refresh: 0,
  seller_name: '',
  size: 0,
  sub_category: '',
  title: '',
  user_id: 0,
  video_url: ''
  }

export const rating: Irating = {
  component_id: 0,
  five: 0,
  four: 0,
  id: 0,
  one: 0,
  three: 0,
  two: 0,
  total: 0,
  ratingOne : 0,
  ratingTwo : 0,
  ratingThree : 0,
  ratingFour : 0,
  ratingFive : 0
}

@Component({
  selector: 'app-widget-preview',
  templateUrl: './widget-preview.component.html',
  styleUrls: ['./widget-preview.component.css']
})
export class WidgetPreviewComponent implements OnInit {
  isLogin;
  widgetList$ = new Observable<any>();
  user$ = new Observable<any>();
  comment$ = new Observable<any>();
  id;
  widget : Iwidget = widgetConst;
  CommentObj: Icomment = comment;
  currentUser;
  widgetComments : IcommentList = commentListConst  ;
  ratingObject: Irating = rating;
  constructor(private modalService: NgbModal, private route: ActivatedRoute,public sanitizer: DomSanitizer, private router: Router, private widgetHttpService: WidgetServicesService, private commentService: CommentService, private sharVarService: SharedVarService) { }
  baseUrl = environment.baseUrl;
  SlideOptions = { items: 3, dots: true, nav: true };
  CarouselOptions = { items: 6, dots: true, nav: true };
  urlSafe: SafeResourceUrl;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
        this.id = params.get("widgetId");
        this.getWidgetDetailsAndRating();
        // this.CommentObj.component_id= this.id;
        // this.CommentObj.user_id=this.currentUser.id;
      });
    // this.id = this.route.params
    //    .subscribe(params => {
    //       // get id from params
    //       this.id = +params['widgetId'];
    //     });
    // this.id=this.route.snapshot.paramMap.get('widgetId');


    // this.sharVarService.getValue().subscribe(data =>  this.isLogin = data);
    // this.route.paramMap.subscribe(params => {
    //   this.id = params.get("widgetId");
    //   this.CommentObj.component_id= this.id;
    //   this.CommentObj.user_id=this.currentUser.id;
    // });
    // this.widgetHttpService.GetWidgetById(this.id).subscribe(data => {
    //   this.widget=data[0];
    // });
    // this.getWidgetDetailsAndRating();
    this.carousel();
  }

  getWidgetDetailsAndRating(){
    this.widgetList$ = this.sharVarService.$widgetList.pipe(tap( data => {
      data.forEach(element => {
        if(element.id == this.id){
          this.widget=element;
          this.urlSafe=this.sanitizer.bypassSecurityTrustResourceUrl(this.widget.video_url);

        }
      });
    }),map(data => data));
    this.user$ = this.sharVarService.$user.pipe(tap(data =>{ this.currentUser=data; }),map(data => data));
    this.comment$=this.sharVarService.$comments.pipe(map(data => data));
    this.commentService.getComments(this.id).subscribe((data :any) => {
      this.widgetComments = data;
      this.sharVarService.setWidgetComments(data);
      console.log(this.widgetComments);
    });

    this.getWidgetRating();

  }

  // async getWidgetDetailsAndRating() {

  //   this.widgetList$ = await this.sharVarService.$widgetList.pipe(map(data => data));
  //   this.user$ = await this.sharVarService.$user.pipe(tap(data => this.currentUser = data), map(data => data));
  //   this.comment$ = await this.sharVarService.$comments.pipe(map(data => data));
  //   await this.route.paramMap.subscribe(params => {
  //     this.id = params.get("widgetId");
  //     this.CommentObj.component_id = this.id;
  //     this.CommentObj.user_id = this.currentUser.id;
  //     console.log(this.CommentObj.user_id);
  //   });
  //   await this.widgetHttpService.GetWidgetById(this.id).subscribe(data => {
  //     this.widget = data[0];
  //   });
  //   await this.getComment();
  //   await this.getWidgetRating();
  // }

  // getComment() {
  //   this.commentService.getComments(this.id).subscribe(data => {
  //     this.widgetComments = data;
  //     this.sharVarService.setWidgetComments(data);
  //     console.log(this.comment$);
  //     console.log(this.widgetComments);
  //   });
  // }

  // getWidgetAndComment(id) {

  //   this.widgetHttpService.GetWidgetById(id).subscribe(data => {
  //     this.widget = data[0];
  //   });
  //   this.getWidgetRating();
  //   this.commentService.getComments(id).subscribe(data => {
  //     this.widgetComments = data;
  //     console.log(this.widgetComments);
  //   });
  // }

  makeComment(commentForm:NgForm,userId,component_id) {
    this.CommentObj.user_id=userId;
    this.CommentObj.component_id=component_id;
    this.commentService.doComment(this.CommentObj).subscribe((data:any) => {
      if(data.success == true){
        this.commentService.getComments(component_id).subscribe(data => {
          this.sharVarService.setWidgetComments(data);
          commentForm.form.reset();
          //@ts-ignore
          $('#makeComment').click();

        })
      }
    });
  }

  editComponent() {
    this.router.navigate(['/upload/', this.id]);
  }

  deleteComponent() {
    this.widgetHttpService.Delete(this.id).subscribe((data: any) => {
      if (data.affectedRows > 0) {
        console.log("Component deleted Successfully");
        this.router.navigate(['/home']);
      }
    })
  }

  rating(e) {
    this.CommentObj.rate = e;
  }

  getWidgetRating() {
    this.widgetHttpService.getBreakDownRating(this.id).subscribe( (data:any) => {
      if(data.length > 0 ){
        this.ratingObject = data[0];
        this.ratingObject.total = this.ratingObject.one + this.ratingObject.two + this.ratingObject.three + this.ratingObject.four + this.ratingObject.five;
        this.ratingObject.ratingOne= this.ratingObject.one*100/this.ratingObject.total;
        this.ratingObject.ratingTwo= this.ratingObject.two*100/this.ratingObject.total;
        this.ratingObject.ratingThree= this.ratingObject.three*100/this.ratingObject.total;
        this.ratingObject.ratingFour= this.ratingObject.four*100/this.ratingObject.total;
        this.ratingObject.ratingFive= this.ratingObject.five*100/this.ratingObject.total;
      }
    });
  }

  openModal() {
    this.modalService.open(SubscribeComponent);
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  carousel() {
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

  // <!-- [routerLink]="['/preview/',obj.id]" -->
  getNewComponent(component_id){
    this.router.navigate(['preview', component_id]);
    // this.router.navigate(['/preview/', { widgetId: component_id }]);
  }

}
export interface Icomment {
  user_id: number,
  comment: string,
  component_id: number,
  rate: number
}

export interface Irating {
  component_id: number,
  five: number,
  four: number,
  id: number,
  one: number,
  three: number,
  two: number,
  total?: number,
  ratingOne?: number,
  ratingTwo? : number,
  ratingThree? : number,
  ratingFour? : number,
  ratingFive? : number
}

export interface Iwidget{
category: string,
comment_id: number
created_date: string,
description: string,
details: string,
download_link: string,
downloaded: number,
features: string,
file_path: string,
id: number,
image: string,
last_update_date: string,
main_page: boolean,
no_of_comments: number,
price: number,
purchase_option: string,
rate: number,
refresh: number,
seller_name: string,
size: number,
sub_category: string,
title: string
user_id: number
video_url: string
}

export interface IcommentList{
comment: string,
date: string,
profile_image: string,
rate_count: number,
username: string
}
