import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponentBodyComponent } from './app-component-body/app-component-body.component';
import { ThankyouComponent } from './thankyou/thankyou.component';

const routes: Routes = [
 
  { path: '', component:  AppComponentBodyComponent },
  { path: 'thank-you', component:  ThankyouComponent }
  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
}
