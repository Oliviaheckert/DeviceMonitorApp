import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chamber } from '../models/chamber.model';
import { ChamberTelemetry } from '../models/chamber-telemetry.model';

/**
 * Service to handle all API communication related to chambers
 */
@Injectable({
    providedIn: 'root' // This makes the service a singleton available app-wide
})
export class ChamberService {
    // Base URL for the API - update port if your backend uses a different one
    private apiUrl = 'https://localhost:7123/api/chambers';
  
    /**
     * Constructor with HttpClient dependency injection
     * @param http Angular's HttpClient for making API calls
     */
    constructor(private http: HttpClient) { }
  
    /**
     * Get all chambers from the API
     * @returns Observable of Chamber array
     */
    getAllChambers(): Observable<Chamber[]> {
    // GET request to /api/chambers
    return this.http.get<Chamber[]>(this.apiUrl);
    }
  
    /**
     * Get a specific chamber by ID
     * @param id The chamber ID to retrieve
     * @returns Observable of a single Chamber
     */
    getChamberById(id: number): Observable<Chamber> {
    // GET request to /api/chambers/{id}
    return this.http.get<Chamber>(`${this.apiUrl}/${id}`);
      }
    
    /**
     * Create a new chamber
     * @param chamber The chamber data to create
     * @returns Observable of the created Chamber with ID
     */
    addChamber(chamber: Chamber): Observable<Chamber> {
    // POST request to /api/chambers
    return this.http.post<Chamber>(this.apiUrl, chamber);
    }
    
    /**
     * Get telemetry data for a specific chamber
     * @param id The chamber ID to get telemetry for
     * @returns Observable of chamber telemetry data
     */
    getChamberTelemetry(id: number): Observable<ChamberTelemetry> {
    // GET request to /api/chambers/{id}/telemetry
    return this.http.get<ChamberTelemetry>(`${this.apiUrl}/${id}/telemetry`);
    }
}    