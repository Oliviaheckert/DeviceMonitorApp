/**
 * Interface representing telemetry data from a test chamber
 * Properties match the C# ChamberTelemetry class on the backend
 */
export interface ChamberTelemetry {
    chamberId: number;    // ID of the chamber this data is for
    timestamp: Date;      // When was this data collected
    temperature: number;  // Temperature in Celsius
    humidity: number;     // Humidity percentage
    pressure: number;     // Pressure in hPa
    voltage: number;      // Voltage reading
}