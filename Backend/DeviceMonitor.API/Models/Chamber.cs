using System;

namespace DeviceMonitor.API.Models
{
    /// <summary>
    /// Represents a test chamber in the system
    /// </summary>
    public class Chamber
    {
        /// <summary>
        /// Unique identifier for the chamber
        /// </summary>
        public int Id { get; set; }
        
        /// <summary>
        /// Name/Label of the chamber
        /// </summary>
        public string Name { get; set; }
        
        /// <summary>
        /// Type of chamber (Environmental, Thermal, etc.)
        /// </summary>
        public string Type { get; set; }
        
        /// <summary>
        /// Indicates if the chamber is currently active in the system
        /// </summary>
        public bool IsActive { get; set; }
        
        /// <summary>
        /// Date when the chamber was last serviced
        /// </summary>
        public DateTime LastMaintenance { get; set; }
        
        /// <summary>
        /// Current operational status of the chamber
        /// </summary>
        public ChamberStatus Status { get; set; }
    }

    /// <summary>
    /// Represents possible operational states of a test chamber
    /// </summary>
    public enum ChamberStatus
    {
        /// <summary>Chamber is disconnected</summary>
        Offline,
        
        /// <summary>Chamber is connected but not running a test</summary>
        Idle,
        
        /// <summary>Chamber is actively running a test</summary>
        Running,
        
        /// <summary>Chamber has encountered an error condition</summary>
        Error,
        
        /// <summary>Chamber is undergoing maintenance</summary>
        Maintenance
    }

    /// <summary>
    /// Represents current telemetry readings from a chamber
    /// </summary>
    public class ChamberTelemetry
    {
        /// <summary>
        /// ID of the chamber this telemetry belongs to
        /// </summary>
        public int ChamberId { get; set; }
        
        /// <summary>
        /// Time when this telemetry reading was taken
        /// </summary>
        public DateTime Timestamp { get; set; }
        
        /// <summary>
        /// Current temperature in degrees Celsius
        /// </summary>
        public double Temperature { get; set; }
        
        /// <summary>
        /// Current humidity percentage
        /// </summary>
        public double Humidity { get; set; }
        
        /// <summary>
        /// Current pressure in hPa
        /// </summary>
        public double Pressure { get; set; }
        
        /// <summary>
        /// Current voltage reading in volts
        /// </summary>
        public double Voltage { get; set; }
    }
}