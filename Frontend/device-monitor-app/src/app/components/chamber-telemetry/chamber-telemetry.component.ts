// src/app/components/chamber-telemetry/chamber-telemetry.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { interval, Subscription } from 'rxjs';
import { Chamber } from '../../models/chamber.model';
import { ChamberTelemetry } from '../../models/chamber-telemetry.model';
import { ChamberService } from '../../services/chamber.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-chamber-telemetry',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BaseChartDirective],
  templateUrl: './chamber-telemetry.component.html',
  styleUrls: ['./chamber-telemetry.component.scss']
})
export class ChamberTelemetryComponent implements OnInit {
  chamber: Chamber | null = null;
  telemetry: ChamberTelemetry | null = null;
  telemetryHistory: ChamberTelemetry[] = [];
  
  loading = true;
  error: string | null = null;
  
  // For real-time updates
  updateInterval: Subscription | null = null;
  
  // Chart configuration
  tempChartData: any = {
    labels: [],
    datasets: [
      {
        label: 'Temperature (°C)',
        data: [],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.4
      }
    ]
  };
  
  humidityChartData: any = {
    labels: [],
    datasets: [
      {
        label: 'Humidity (%)',
        data: [],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
        tension: 0.4
      }
    ]
  };
  
  pressureChartData: any = {
    labels: [],
    datasets: [
      {
        label: 'Pressure (hPa)',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4
      }
    ]
  };
  
  voltageChartData: any = {
    labels: [],
    datasets: [
      {
        label: 'Voltage (V)',
        data: [],
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
        tension: 0.4
      }
    ]
  };
  
  chartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false
      }
    }
  };
  
  constructor(
    private chamberService: ChamberService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loadChamber();
  }
  
  ngOnDestroy(): void {
    // Unsubscribe from interval when component is destroyed
    if (this.updateInterval) {
      this.updateInterval.unsubscribe();
    }
  }

  loadChamber(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'Chamber ID not found';
      this.loading = false;
      return;
    }
    
    this.chamberService.getChamberById(Number(id)).subscribe({
      next: (chamber) => {
        this.chamber = chamber;
        // After loading chamber details, load telemetry
        this.loadTelemetry();
        
        // Set up simulated real-time updates (every 3 seconds)
        this.setupTelemetryUpdates();
      },
      error: (err) => {
        console.error('Error loading chamber:', err);
        this.error = `Error loading chamber: ${err.message || 'Unknown error'}`;
        this.loading = false;
      }
    });
  }
  
  loadTelemetry(): void {
    if (!this.chamber?.id) return;
    
    this.chamberService.getChamberTelemetry(this.chamber.id).subscribe({
      next: (telemetry) => {
        this.telemetry = telemetry;
        this.loading = false;
        
        // Add to history
        this.telemetryHistory.unshift({...telemetry});
        
        // Keep history at max 20 items
        if (this.telemetryHistory.length > 20) {
          this.telemetryHistory = this.telemetryHistory.slice(0, 20);
        }
        
        // Update chart data
        this.updateCharts(telemetry);
      },
      error: (err) => {
        console.error('Error loading telemetry:', err);
        this.error = `Error loading telemetry: ${err.message || 'Unknown error'}`;
        this.loading = false;
      }
    });
  }
  
  setupTelemetryUpdates(): void {
    // Simulate real-time updates with interval
    this.updateInterval = interval(3000) // 3 seconds
      .subscribe(() => {
        this.loadTelemetry();
      });
  }
  
  updateCharts(telemetry: ChamberTelemetry): void {
    const timeLabel = new Date(telemetry.timestamp).toLocaleTimeString();
    
    // Add new point to each chart
    this.tempChartData.labels.push(timeLabel);
    this.tempChartData.datasets[0].data.push(telemetry.temperature);
    
    this.humidityChartData.labels.push(timeLabel);
    this.humidityChartData.datasets[0].data.push(telemetry.humidity);
    
    this.pressureChartData.labels.push(timeLabel);
    this.pressureChartData.datasets[0].data.push(telemetry.pressure);
    
    this.voltageChartData.labels.push(timeLabel);
    this.voltageChartData.datasets[0].data.push(telemetry.voltage);
    
    // Keep charts to last 10 data points for better visualization
    if (this.tempChartData.labels.length > 10) {
      this.tempChartData.labels.shift();
      this.tempChartData.datasets[0].data.shift();
      
      this.humidityChartData.labels.shift();
      this.humidityChartData.datasets[0].data.shift();
      
      this.pressureChartData.labels.shift();
      this.pressureChartData.datasets[0].data.shift();
      
      this.voltageChartData.labels.shift();
      this.voltageChartData.datasets[0].data.shift();
    }
    
    // Force update of chart objects by creating new references
    this.tempChartData = { ...this.tempChartData };
    this.humidityChartData = { ...this.humidityChartData };
    this.pressureChartData = { ...this.pressureChartData };
    this.voltageChartData = { ...this.voltageChartData };
  }
  
  isValueInRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
  }
  
  getTempStatus(temp: number): string {
    if (temp < 0) return 'bg-info';
    if (temp > 50) return 'bg-danger';
    if (temp > 30) return 'bg-warning';
    return 'bg-success';
  }
  
  getHumidityStatus(humidity: number): string {
    if (humidity < 20) return 'bg-danger';
    if (humidity > 80) return 'bg-warning';
    return 'bg-success';
  }
  
  getPressureStatus(pressure: number): string {
    if (pressure < 990) return 'bg-warning';
    if (pressure > 1030) return 'bg-warning';
    return 'bg-success';
  }
  
  getVoltageStatus(voltage: number): string {
    if (voltage < 5) return 'bg-danger';
    if (voltage > 20) return 'bg-warning';
    return 'bg-success';
  }
  
  goBack(): void {
    this.location.back();
  }
}