/* modules */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* services */
import { MessageService } from 'primeng/api';
import { CitiesService } from './service/cities.service';
import { DialogService } from 'primeng/dynamicdialog';

/* components */
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    FileUploadModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    DynamicDialogModule,
    BrowserAnimationsModule
  ],
  providers: [CitiesService, DialogService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
