import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {SubscriptionService} from '../Services/subscriptionService'
@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeComponent implements OnInit {

  constructor(private modalService : NgbModal,private subscriptionService : SubscriptionService) { }
  requestObj : IrequestObject = requestObject;
  @Input() public fileName;

  ngOnInit(): void {
    console.log(this.fileName);
  }

  closeModal()
  {
    this.modalService.dismissAll();
  }

  subscribeForDownload(){
    this.subscriptionService.subscribeCustomer(this.requestObj).subscribe((data:any) =>{
      if(data.success == true){
          this.subscriptionService.downloadFile(this.fileName).subscribe(data => console.log(data));
      }
    });
    // console.log(this.requestObj.email);
  }

}

export interface IrequestObject{
  email : string;
}

export const requestObject = {
  email : ''
}