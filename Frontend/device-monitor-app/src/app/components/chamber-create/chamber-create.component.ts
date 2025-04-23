import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ChamberService } from '../../services/chamber.service';
import { Chamber, ChamberStatus } from '../../models/chamber.model';

@Component({
  selector: 'app-chamber-create',
  templateUrl: './chamber-create.component.html',
  styleUrl: './chamber-create.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
})
export class ChamberCreateComponent {
  // Reactive form group for chamber creation
  chamberForm: FormGroup;
  
  // Component state properties
  submitted = false;     // Has form been submitted?
  loading = false;       // Is form submission in progress?
  error: string | null = null;  // Error message
  
  // Expose enum values for template to use in dropdown
  chamberStatusOptions = Object.values(ChamberStatus);
  
  /**
   * Constructor with dependency injection
   * @param formBuilder Angular FormBuilder for reactive forms
   * @param chamberService Our service for API communication
   * @param router Angular Router for navigation after form submit
   */
  constructor(
    private formBuilder: FormBuilder,
    private chamberService: ChamberService,
    private router: Router
  ) {
    // Initialize the form with validators
    this.chamberForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      type: ['', [Validators.required]],
      isActive: [true],  // Default to active
      lastMaintenance: [new Date().toISOString().substring(0, 10), [Validators.required]],
      status: [ChamberStatus.Idle, [Validators.required]]
    });
  }
  
  /**
   * Handle form submission
   */
  onSubmit(): void {
    this.submitted = true;
    
    // If form is invalid, stop here
    if (this.chamberForm.invalid) {
      return;
    }
    
    this.loading = true;
    const newChamber: Chamber = this.chamberForm.value;
    
    // Call service to create chamber
    this.chamberService.addChamber(newChamber)
      .subscribe({
        // Success handler - navigate back to chamber list
        next: () => {
          this.loading = false;
          this.router.navigate(['/chambers']);
        },
        // Error handler
        error: (err) => {
          console.error('Error creating chamber', err);
          this.error = 'Failed to create chamber. Please try again.';
          this.loading = false;
        }
      });
  }
}
