// src/app/components/chamber-detail/chamber-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ChamberService } from '../../services/chamber.service';
import { Chamber } from '../../models/chamber.model';

@Component({
  selector: 'app-chamber-detail',
  templateUrl: './chamber-detail.component.html',
  styleUrls: ['./chamber-detail.component.scss']
})
export class ChamberDetailComponent implements OnInit {
  chamber: Chamber | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private chamberService: ChamberService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loadChamber();
  }

  loadChamber(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'Chamber ID not found';
      this.loading = false;
      return;
    }

    this.chamberService.getChamberById(Number(id))
      .subscribe({
        next: (chamber) => {
          this.chamber = chamber;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading chamber details', err);
          this.error = 'Failed to load chamber details. Please try again.';
          this.loading = false;
        }
      });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Running': return 'bg-success';
      case 'Idle': return 'bg-warning';
      case 'Error': return 'bg-danger';
      case 'Offline': return 'bg-secondary';
      case 'Maintenance': return 'bg-info';
      default: return 'bg-secondary';
    }
  }

  goBack(): void {
    this.location.back();
  }
}