import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChamberListComponent } from './components/chamber-list/chamber-list.component';
import { ChamberCreateComponent } from './components/chamber-create/chamber-create.component';
import { ChamberDetailComponent } from './components/chamber-detail/chamber-detail.component';
import { ChamberTelemetryComponent } from './components/chamber-telemetry/chamber-telemetry.component';

/**
 * Application routes configuration
 * Maps URLs to components
 */
const routes: Routes = [
  // Default route - redirect to chambers list
  { path: '', redirectTo: 'chambers', pathMatch: 'full' },
  
  // Chambers list page
  { path: 'chambers', component: ChamberListComponent },
  
  // Create new chamber page
  { path: 'chambers/new', component: ChamberCreateComponent },
  
  // Chamber detail page
  { path: 'chambers/:id', component: ChamberDetailComponent },

  // Chamber telemetry page
  { path: 'chambers/:id/telemetry', component: ChamberTelemetryComponent },
  
  // Fallback route - redirect to chambers list
  { path: '**', redirectTo: 'chambers' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }