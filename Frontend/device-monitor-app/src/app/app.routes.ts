// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ChamberListComponent } from './components/chamber-list/chamber-list.component';
import { ChamberCreateComponent } from './components/chamber-create/chamber-create.component';
import { ChamberDetailComponent } from './components/chamber-detail/chamber-detail.component';
import { ChamberTelemetryComponent } from './components/chamber-telemetry/chamber-telemetry.component';

export const routes: Routes = [
  { path: '', redirectTo: '/chambers', pathMatch: 'full' },
  { path: 'chambers', component: ChamberListComponent },
  { path: 'chambers/create', component: ChamberCreateComponent },
  { path: 'chambers/:id', component: ChamberDetailComponent },
  { path: 'chambers/:id/telemetry', component: ChamberTelemetryComponent }
];