import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateAccountComponent } from '../create-account/create-account.component';
import { AuthenticationService } from '../Services/authenticationService';
import { SharedVarService } from '../Services/SharedVarService';
import * as categories from '../categories.json';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin;
  activeTab=1;
  compCategories: any = (categories as any).default;
  public user$ : Observable<any> = new Observable<any>();
  constructor(private modalService : NgbModal,
    private authenticationService : AuthenticationService,
    private sharedService : SharedVarService,
    private router: Router,
    private toastr : ToastrService) { }

  ngOnInit(): void {
    this.setData();
    // this.sharedService.getValue().subscribe(data =>  this.isLogin = data);
    this.user$ = this.sharedService.$user.pipe(tap(data => {
    }),map(data => data));
  }

  openComponent(catValue){
    this.router.navigate(['/component/', catValue]);
  }

  openComponentWithSub(catValue,subCatValue){
    this.router.navigate(['/component/', catValue,subCatValue]);
  }

  login_userName : string;
  object : any ={};

  openModal() {
    this.modalService.open(CreateAccountComponent, {backdrop: false});
  }

  closeModal()
  {
    this.modalService.dismissAll();
  }

  setData(){
    this.object = (JSON.parse(localStorage.getItem('currentUser')));
    if(this.object== null){
      this.sharedService.setValue(false);
    }else{
      this.sharedService.setValue(true);
    }
  }

  login(){}

  logout(){
    this.authenticationService.logout();
    this.isLogin=false;
    this.sharedService.setUserObjectValue({});
    localStorage.clear();
    this.toastr.success('Logged out successfully','Logged out',{
      timeOut : 2000,
    });
    this.router.navigate(['/home']);
  }

  onLoginFormSubmit(){
  }
}
