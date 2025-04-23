import { Component, OnInit } from '@angular/core';
import { ChamberService } from '../../services/chamber.service';
import { Chamber } from '../../models/chamber.model';

@Component({
  selector: 'app-chamber-list',
  templateUrl: './chamber-list.component.html',
  styleUrl: './chamber-list.component.scss'
})
export class ChamberListComponent implements OnInit {
  // Properties to hold component state
  chambers: Chamber[] = [];        // List of chambers to display
  loading = true;                  // Loading state for UI
  error: string | null = null;     // Error message if request fails

  /**
   * Constructor with ChamberService injection
   */
  constructor(private chamberService: ChamberService) { }

  /**
   * Angular lifecycle hook that runs when component initializes
   * Perfect place to load initial data
   */
  ngOnInit(): void {
    this.loadChambers();
  }

  /**
   * Load chambers from the API
   */
  loadChambers(): void {
    this.loading = true;

  // Call the service method which returns an Observable
  this.chamberService.getAllChambers()
  .subscribe({
    // Success handler - data returned successfully
    next: (data) => {
      this.chambers = data;
      this.loading = false;
    },
    // Error handler - API call failed
    error: (err) => {
      console.error('Error loading chambers', err);
      this.error = 'Failed to load chambers. Please try again.';
      this.loading = false;
      }
    }); 
  }
}
