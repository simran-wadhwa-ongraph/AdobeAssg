import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSelectModule, MatCardModule, MatInputModule, MatExpansionModule, MatCheckboxModule, MatButtonModule, MatFormFieldModule, MatRadioModule, MatTooltipModule, MatSlideToggleModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HospitalViewComponent } from './components/hospital-view/hospital-view.component';
import { DepratmentViewComponent } from './components/depratment-view/depratment-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { ModalComponent } from './components/modal/modal.component';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    HospitalViewComponent,
    DepratmentViewComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxDatatableModule,
    MatCardModule,
    MatDialogModule,
    ToastrModule.forRoot(), // ToastrModule added
  ],
  exports: [ ModalComponent ],
  entryComponents: [ModalComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
