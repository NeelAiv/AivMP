import { Component, OnInit } from '@angular/core';
import * as categories from '../categories.json';
import { ActivatedRoute } from '@angular/router';
import { FlashService } from '../Services/flashService';
import { WidgetServicesService } from '../Services/widget-services.service'
import { IloginForm } from '../create-account/create-account.component';
import JSZip, { files } from 'jszip';
import { ToastrService } from 'ngx-toastr';
import { SharedVarService } from '../Services/SharedVarService';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const uploadConst = {
  title: null,
  category: null,
  sub_category: null,
  rate: 0,
  description: null,
  image: null,
  purchase_option: 'free',
  size: 0,
  downloaded: 0,
  refresh: 0,
  no_of_comments: null,
  download_link: null,
  details: null,
  features: null,
  seller_name: null,
  comment_id: null,
  file_path: null,
  price: 0,
  video_url: null,
  created_date: null,
  last_update_date: null,
  user_id: 0
}

@Component({
  selector: 'app-upload-widget',
  templateUrl: './upload-widget.component.html',
  styleUrls: ['./upload-widget.component.css']
})
export class UploadWidgetComponent implements OnInit {
  upload_url = "assets/duser.jpg";
  constructor(private route: ActivatedRoute,
              private widgetService: WidgetServicesService,
              private toastr : ToastrService,
              private sharVarService : SharedVarService) { }
  compCategories: any = (categories as any).default;
  Categories;
  SubCategories;
  // =================
  widgetId;
  widgetImages = [];
  coverpageLable = "Cover Widget Image";
  dataLoading = false;
  location: any;
  subCat = false;
  upload: Iupload = uploadConst ;
  user$ = new Observable<any>();
  currentUser;
  zipFile: JSZip = new JSZip();
  uploadFile = {
    widgetFile: null,
    widgetCoverImage: null,
    widgetImages: []
  }

  ngOnInit(): void {
    this.Categories = Object.keys(this.compCategories);
    this.currentUser = (JSON.parse(localStorage.getItem('currentUser')));
    // this.user$ = this.sharVarService.$user.pipe(tap(data =>{ this.currentUser=data;console.log("current user"); console.log(this.currentUser); }),map(data => data));
    console.log(this.currentUser);
    this.route.paramMap.subscribe(params => {
      this.widgetId = params.get("widgetId");
    });
    if (this.widgetId) {
      this.widgetService.GetWidgetById(this.widgetId).subscribe(data => {
        this.upload = data[0];
      });
    }
    this.upload.user_id = this.currentUser.id;
    console.log(this.upload.user_id);
  }

  onsubmit() {
    if (this.widgetId) {
      this.editWidget();
    } else {
      this.uploadFileValidate();
    }
    this.dataLoading = false;
  }

  getWidgetDetails() {
    if (this.widgetId) {
      this.widgetService.GetWidgetById(this.widgetId).subscribe(data => this.upload = data[0]);
    }
  }

  method($event) {
    if (this.compCategories[this.upload.category].subCategories.length > 0) {
      this.subCat = true;
      this.SubCategories = this.compCategories[this.upload.category].subCategories;
    } else {
      this.subCat = false;
    }
  }
  method1() {
  }

  editWidget() {
    var formData = new FormData();
    for (var key in this.upload) {
      formData.append(key, this.upload[key]);
    }
    if (this.uploadFile['widgetFile']) {
      formData.append('widgetFile', this.uploadFile['widgetFile'], this.uploadFile['widgetFile'].name);
    }
    if (this.uploadFile['widgetCoverImage']) {
      formData.append('coverImage', this.uploadFile['widgetCoverImage'], this.uploadFile['widgetCoverImage'].name);
    }
    this.widgetService.EditWidget(this.widgetId, formData).subscribe(data => {
      setTimeout(() => {
        console.log(data);
      }, 1500);
    })
  }

  saveCoverImage(e: any) {

    let file = e.target.files[0];
    if (file) {
      const aReader = new FileReader();
      aReader.readAsText(file, "UTF-8");
      aReader.onload = (e) => {
        let fileName = file.name;
        this.coverpageLable = fileName;
        this.uploadFile['widgetCoverImage'] = file;
        let url = URL.createObjectURL(file);
        // @ts-ignore
        $('#customImg').attr('src', url);
      }
      aReader.onerror = (e) => {
        this.uploadFile['widgetCoverImage'] = null;
        console.log('Error while Image read');
        // @ts-ignore
        $('#customImg').attr('src', 'images/dflwidg.png');
      }
    } else {
      this.uploadFile['widgetCoverImage'] = null;
      // @ts-ignore
      $('#customImg').attr('src', 'images/dflwidg.png');
    }
  }

  // uploadImage(file) {
  //   if (file) {
  //     const aReader = new FileReader();
  //     aReader.readAsText(file, "UTF-8");
  //     aReader.onload = function (e) {
  //       let fileName = file.name;
  //       () =>{
  //         this.coverpageLable = fileName;
  //         this.uploadFile['widgetCoverImage'] = file;
  //       };
  //       let url = URL.createObjectURL(file);
  //       // @ts-ignore
  //       $('#customImg').attr('src', url);
  //     }
  //     aReader.onerror($evt) {
  //       this.apply(function () { this.uploadFile['widgetCoverImage'] = null; });
  //       console.log('Error while Image read');
  //       // @ts-ignore
  //       $('#customImg').attr('src', 'images/dflwidg.png');
  //     }
  //   } else {
  //     this.apply(function () { this.uploadFile['widgetCoverImage'] = null; });
  //     // @ts-ignore
  //     $('#customImg').attr('src', 'images/dflwidg.png');
  //   }
  // }

  uploadFileValidate() {
    var formData = new FormData();
    for (var key in this.upload) {
      formData.append(key, this.upload[key]);
    }
    // angular.forEach(this.upload, function (value, key) {
    //   formData.append(key, value);
    // });

    if (this.uploadFile['widgetFile']) {
      formData.append('widgetFile', this.uploadFile['widgetFile'], this.uploadFile['widgetFile'].name);
    } else {
      this.toastr.error("Upload Widget File","Error");
      console.log("Upload Widget File");
      return;
    }
    if (this.uploadFile['widgetCoverImage']) {
      formData.append('coverImage', this.uploadFile['widgetCoverImage'], this.uploadFile['widgetCoverImage'].name);
    } else {
      this.toastr.error("Upload Cover Image with dimentions 800px X 800px","Error");
      console.log("Upload Cover Image with dimentions 800px X 800px");
      return;
    }
    this.widgetService.uploadWidget(formData).subscribe((data:any) => {

      if(data.success == true ){
        this.toastr.success('Component uploaded successfully','Success')
      }else{
        this.toastr.success('Component uploading failed.','Success')

      }
    })
    // then(function (res) {
    //   if (res.message == 'success') {
    //     $location.path('/widgets');
    //     $timeout(function () {
    //       FlashService.Success(res.message);
    //     }, 1500);
    //   } else {
    //     FlashService.Error(res.message);
    //   }
    // });
  }

  // saveCoverImage(e : any){
  //   // var fileName = e.target.files[0].name;
  //   setTimeout(() => {
  //     console.log("image file uploading ");
  //     // this.uploadWidget(e.target.files[0]);
  //   },1500);
  // }

  saveWidgetFile(e: any) {
    var file = e.target.files[0];
    if (file) {
      console.log("file printed here ");
      console.log(file);
      if( file.type == 'application/vnd.microsoft.portable-executable' ||
      file.type == 'application/x-msdownload' ||
      file.type == 'application/exe' ||
      file.type == 'application/octet-stream' ||
      file.type == 'application/exe' ||
      file.type == 'application/x-exe' ||
      file.type == 'application/dos-exe' ||
      file.type == 'vms/exe' ||
      file.type == 'application/x-winexe' ||
      file.type == 'application/msdos-windows' ||
      file.type == 'application/x-msdos-program' ||
      file.type == 'application/application/x-sh' ||
      file.type == 'application/x-shar' ||
      file.type == 'text/x-script.sh' ||
      file.type == 'application/x-bsh')
      {
        this.toastr.error("Invalid File Type.");
        console.log("invalid file types");
      }
      else if(file.type == 'application/zip' || file.type == 'application/x-zip-compressed' || file.type == 'application/x-7z-compressed'){
        this.zipFile.loadAsync(file).then((zip) => {
          Object.keys(zip.files).forEach((filename) => {
            // console.log(filename);
            if(filename.endsWith('.exe') || filename.endsWith('.sh') || filename.endsWith('.batch')){
              this.toastr.error('found invalid file in zip.',"Invalid File Type.")
              // console.log('found invalid file type in zip.');
             return;
            }
            // zip.files[filename].async('string').then((fileData) => {
            //   console.log(fileData);
            // })
          })
        })

      }
      else{

        const aReader = new FileReader();
        aReader.readAsText(file, "UTF-8");
        aReader.onload = (e) => {
        let fileContent = aReader.result;
        // var fileName = file.name;
        this.upload['size'] = file.size;
        this.upload['title'] = file.name;
        this.upload['type'] = file.type;
        this.uploadFile['widgetFile'] = file;
      }
      aReader.onerror = (e) => {
        this.toastr.error('Error while file read','Error')
        console.log('Error while file read');
        this.uploadFile['widgetFile'] = null;
        //   $apply(function () { this.uploadFile['widgetFile'] = null; });
      }

      }

    }

    // setTimeout(() => {
    //   console.log("widget file uploading ");
    //   this.uploadWidget(e.target.files[0]);
    // },1500);

  }

  // uploadWidget(file) {
  //   if (file) {
  //     const aReader = new FileReader();
  //     aReader.readAsText(file, "UTF-8");
  //     aReader.onload() {
  //       let fileContent = aReader.result;
  //       // var fileName = file.name;
  //         this.upload['size'] = file.size;
  //         this.upload['title'] = fileContent.widget.widgetName;
  //         this.upload['type'] = fileContent.widget.widgetType;
  //         this.uploadFile['widgetFile'] = file;
  //     }
  //     aReader.onerror = function (evt) {
  //       console.log('Error while file read');
  //       this.uploadFile['widgetFile'] = null;
  //       //   $apply(function () { this.uploadFile['widgetFile'] = null; });
  //     }
  //   }
  // }

  // highlightedItems = document.querySelectorAll('.custom-file-input');
  // highlightedItems.forEach(function (item) {
  //   item.addEventListener('change', function (e) {
  //     if (e.target.files.length == 1) {
  //       var fileName = e.target.files[0].name;
  //       var nextSibling = e.target.nextElementSibling
  //       nextSibling.querySelector('.cst_fnm_lbl').innerText = fileName;
  //       if (e.target.parentElement.id == "2") { // widget upload
  //         $scope.uploadWidget(e.target.files[0]);
  //       } else if (e.target.parentElement.id == "1") { // Image upload
  //         //@ts-ignore
  //         $timeout($scope.uploadImage(e.target.files[0]));
  //       }
  //     } else {
  //       var fileName = [];
  //       angular.forEach(e.target.files, function (value, key) {
  //         fileName.push(value.name);
  //       });
  //       var nextSibling = e.target.nextElementSibling
  //       nextSibling.querySelector('.cst_fnm_lbl').innerText = fileName.join(', ');
  //       if (e.target.parentElement.id == "3") { // Widget Images
  //         $scope.uploadWidgetshowCase(e.target.files);
  //       }
  //     }
  //   });
  // });


}

export interface Iupload {
  title?: string,
  category?: string,
  sub_category?: string,
  rate?: number,
  description?: string,
  image?: string,
  purchase_option?: string,
  size?: number,
  downloaded?: number,
  refresh?: number,
  no_of_comments?: number,
  download_link?: string,
  details?: string,
  features?: string,
  seller_name?: string,
  comment_id?: string,
  file_path?: string,
  price?: number,
  video_url?: string,
  created_date?: string,
  last_update_date?: string,
  user_id: number
}

// editWidget(){
//   var formData = new FormData();
//   for (var key in this.upload) {
//     formData.append(key, this.upload[key]);
//   }
  // angular.forEach(this.upload, function (value, key) {
  //   formData.append(key, value);
  // });
  // if (this.uploadFile['widgetFile']) {
  //   formData.append('widgetFile', this.uploadFile['widgetFile'], this.uploadFile['widgetFile'].name);
  // }
  // if (this.uploadFile['widgetCoverImage']) {
  //   formData.append('coverImage', this.uploadFile['widgetCoverImage'], this.uploadFile['widgetCoverImage'].name);
  // }

  // this.widgetService.EditWidget(this.widgetId, formData).subscribe(data => {
  //   setTimeout(() => {
  //     console.log(data);
  //   }, 1500);
  // })
  // .then(function (res) {
  //   setTimeout(function () {
  //     FlashService.Success(res.message);
  //   }, 1500);
  // });
// }
// oncancel() {
//   this.location.path('/widget_details/' + this.widgetId);
// }

// uploadWidgetshowCase(File) {
//   if (File) {
//     angular.forEach(files, function (file) {
//       const aReader = new FileReader();
//       // aReader.readAsText(file, "UTF-8");
//       aReader.onload = function (evt) {
//         let fileName = file.name;
//         $scope.$apply(function () {
//           // $scope.upload['size'] = file.size;
//           // $scope.upload['title'] = fileContent.widget.widgetName;
//           // $scope.upload['type'] = fileContent.widget.widgetType;
//           // $scope.uploadFile['widgetFile'] = file;
//           const objectURL = window.URL.createObjectURL(new Blob([evt.target.result], { type: file.type }))
//           $scope.widgetImages.push(evt.target.result);
//           $scope.uploadFile.widgetImages.push(file);

//         });
//       }
//       aReader.readAsDataURL(file);

//       aReader.onerror = function (evt) {
//         FlashService.Error('Error while file read');
//         $scope.$apply(function () { this.uploadFile['widgetFile'] = null; });
//       }
//     });
//   }
// }

// loadImage(event, x) {
//   event.target.src = window.URL.createObjectURL(x);
// }
