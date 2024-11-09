import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../model';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from '../Services/userService';
import { WidgetServicesService } from '../Services/widget-services.service';
import { Router } from '@angular/router';
import { SharedVarService } from '../Services/SharedVarService';
import { ToastrService } from 'ngx-toastr';

export interface IuserToUpdate{
  first_name : string,
  last_name : string,
  username : string;
  password : string;
  phone_number? : number,
  role : string,
  address : string,
  city : string,
  state : string,
  coutry : string,
  company_name : string,
  email : string,
  id : number
}


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})

export class MyProfileComponent implements OnInit,OnDestroy {
  currentUser;
  userToUpdate;
  passwordToCheck;
  widgetsByUser;
  upload_url = "assets/duser.jpg";
  baseUrl="http://localhost:3000";
  selected_file_name ="Please select a file."
  uploadFile = {
    profile_imageFile: null
  }
  constructor(private userService : UserService,
    private router : Router,
    private widgetService : WidgetServicesService,
    private sharVarService : SharedVarService,
    private tostr :ToastrService) {}
  ngOnDestroy(): void {
  
  }

  ngOnInit(): void {
    this.setUser();
    this.getWidgetOfUser()
  }

  setUser(){
    this.currentUser=(JSON.parse(localStorage.getItem('currentUser')));
    this.userToUpdate=this.currentUser;
    this.userToUpdate.password='';
  }

  editUser(){
    var formData = new FormData();
    for (var key in this.userToUpdate){
      formData.append(key,this.userToUpdate[key]);
    }
    if(this.uploadFile['profile_imageFile']){
      formData.append('profile_image',this.uploadFile['profile_imageFile'],this.uploadFile['profile_imageFile'].name);
    }
    this.userService.updateUser(formData).subscribe( (data:any) => {
      if(data.success == true ){
        this.userService.GetById(this.userToUpdate.id).subscribe( datatoupdate =>{
          this.sharVarService.setUserObjectValue(datatoupdate[0]);
        })  
        this.setUser();
        this.tostr.success(data.message,'Success');  
      }
        else{
          this.tostr.error(data.message,'Error');
          console.log("Error while editing user");
        }    
    });
    // this.userService.updateUser(this.userToUpdate).subscribe(data => {
    //   console.log(data);
    // });
  }
  
  getWidgetOfUser(){
    this.widgetService.GetWidgetByUserId(this.currentUser.id).subscribe(data =>{
      this.widgetsByUser=data;
    })
  }

  deleteComponent(id){
    this.widgetService.Delete(id).subscribe((data:any) =>{
      if(data.success == true){
        this.tostr.success('Component deleted Successfully','Success');
        this.router.navigate(['/my-profile']);
        this.getWidgetOfUser(); 
      }
      else{
        this.tostr.error('Delete failed','Error');
      }
    })
  }

  saveProfileImage(e : any){
    let file =e.target.files[0];
    if (file) {
      const aReader = new FileReader();
      aReader.readAsText(file, "UTF-8");
      aReader.onload = (e) =>{
        let fileName = file.name;
        console.log(fileName);
        this.uploadFile['profile_imageFile'] = file;
        let url = URL.createObjectURL(file);
        // @ts-ignore
        $('#customImg').attr('src', url);
        // @ts-ignore
        $('#profile_title').html(fileName);
        // selected_file_name = fileName;
      }
      aReader.onerror=(e)=> {
         this.uploadFile['profile_imageFile'] = null;
         console.log('Error while Image read');
        // @ts-ignore
        $('#customImg').attr('src', 'images/dflwidg.png');
      }
    } else {
       this.uploadFile['profile_imageFile'] = null;
      // @ts-ignore
      $('#customImg').attr('src', 'images/dflwidg.png');
    }
  }
}

export interface IuserToUpdate{
  first_name : string,
  last_name : string,
  username : string;
  password : string;
  phone_number? : number,
  role : string,
  address : string,
  city : string,
  state : string,
  coutry : string,
  company_name : string,
  email : string,
  id : number
}
