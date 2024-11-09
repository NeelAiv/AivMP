import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WidgetsComponent } from './widgets/widgets.component';
import { NewAddedComponent } from './new-added/new-added.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AboutComponent } from './about/about.component';
import { WidgetPreviewComponent } from './widget-preview/widget-preview.component';
import { UploadWidgetComponent } from './upload-widget/upload-widget.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { from } from 'rxjs';
const routes: Routes = [  
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeScreenComponent },
  { path: 'component/:catType/:subCatType', component: WidgetsComponent },
  { path: 'component/:catType', component: WidgetsComponent },
  { path: 'new-added', component: NewAddedComponent },
  { path: 'my-profile', component: MyProfileComponent },
  { path: 'about', component: AboutComponent },
  { path: 'preview/:widgetId', component : WidgetPreviewComponent},
  { path : 'upload', component : UploadWidgetComponent},
  { path : 'upload/:widgetId', component : UploadWidgetComponent},
  { path : 'star', component : StarRatingComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
