import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class CommentService {
    BASE_URL;
    private comments: BehaviorSubject<boolean>;
    constructor(private http: HttpClient) {
            this.BASE_URL = environment.baseUrl;
            this.comments = new BehaviorSubject<boolean>(false);
    }

    doComment(comment)
    {
        return this.http.post(this.BASE_URL+'/makeComment',comment);
    }

    getComments(widgetId){
        return this.http.get(this.BASE_URL+'/comment/'+widgetId);
    }



}
