// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChamberListComponent } from './components/chamber-list/chamber-list.component';
import { ChamberCreateComponent } from './components/chamber-create/chamber-create.component';
import { ChamberDetailComponent } from './components/chamber-detail/chamber-detail.component';
import { ChamberTelemetryComponent } from './components/chamber-telemetry/chamber-telemetry.component';

@NgModule({
  declarations: [
    AppComponent,
    ChamberListComponent,
    ChamberCreateComponent,
    ChamberDetailComponent,
    ChamberTelemetryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,  // For form handling
    NgChartsModule        // For charts in telemetry component
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }