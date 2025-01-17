import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SliderComponent } from './slider/slider.component';
import { NewAddedComponent } from './new-added/new-added.component';
import { MostDownloadedComponent } from './most-downloaded/most-downloaded.component';
import { WidgetsComponent } from './widgets/widgets.component';
import { FormsModule } from '@angular/forms';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateAccountComponent } from './create-account/create-account.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './Services/userService';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './Services/authenticationService';
import { AboutComponent } from './about/about.component';
import { WidgetServicesService } from './Services/widget-services.service';
import { WidgetService } from './widgetfun/WidgetService';
import { SharedVarService } from './Services/SharedVarService'
import { MainPipeModule } from './pipes/main-pipe.module';
import { WidgetPreviewComponent } from './widget-preview/widget-preview.component';
import { UploadWidgetComponent } from './upload-widget/upload-widget.component';
import { FlashService} from './Services/flashService'
import { CommentService } from './Services/commentService';
// import { TablesComponent } from './tables/tables.component';
// import { ChartsComponent } from './charts/charts.component';
// import { MapsComponent } from './maps/maps.component';
// import { KpiComponent } from './kpi/kpi.component';
// import { ReportsComponent } from './reports/reports.component';
import { OtherComponent } from './other/other.component';
// import { CustomVisualisationComponent } from './custom-visualisation/custom-visualisation.component';
import { SliderContainerComponent } from './slider-container/slider-container.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
// import { AlertModule } from './alert/alert.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { SubscribeComponent } from './subscribe/subscribe.component'; // <-- import the module
import {ProgressbarModule} from 'ngx-bootstrap/progressbar';    
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    NewAddedComponent,
    SliderContainerComponent,
    MostDownloadedComponent,
    WidgetsComponent,
    HomeScreenComponent,
    MyProfileComponent,
    CreateAccountComponent,
    AboutComponent,
    WidgetPreviewComponent,
    UploadWidgetComponent,
    // TablesComponent,
    // ChartsComponent,
    // MapsComponent,
    // KpiComponent,
    // ReportsComponent,
    OtherComponent,
    // CustomVisualisationComponent,
    StarRatingComponent,
    SubscribeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    MainPipeModule,
    // AlertModule,
    NgxPaginationModule,
    ProgressbarModule.forRoot(),
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [UserService,
    AuthenticationService,
    WidgetServicesService,
    WidgetService,
    SharedVarService,
    MainPipeModule,
    FlashService,CommentService],
  bootstrap: [AppComponent]
})
export class AppModule {}
