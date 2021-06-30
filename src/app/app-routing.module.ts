import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HospitalViewComponent} from './components/hospital-view/hospital-view.component';
import {DepratmentViewComponent} from './components/depratment-view/depratment-view.component';
const routes: Routes = [
  { path: '', component: HospitalViewComponent },
  { path: 'hospital', component: HospitalViewComponent },
  {path: 'department', component: DepratmentViewComponent},
  {path: 'department/:name', component: DepratmentViewComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
