using System.Collections.Generic;
using System.Threading.Tasks;
using DeviceMonitor.API.Models;

namespace DeviceMonitor.API.Repositories
{
    /// <summary>
    /// Interface defining operations for chamber data access
    /// </summary>
    /// <remarks>
    /// Using an interface allows us to easily switch implementations
    /// (e.g., from in-memory to database) without changing dependent code
    /// </remarks>
    public interface IChamberRepository
    {
        /// <summary>
        /// Retrieves all chambers in the system
        /// </summary>
        /// <returns>Collection of all chambers</returns>
        Task<IEnumerable<Chamber>> GetAllChambersAsync();
        
        /// <summary>
        /// Retrieves a specific chamber by its ID
        /// </summary>
        /// <param name="id">The ID of the chamber to retrieve</param>
        /// <returns>The requested chamber or null if not found</returns>
        Task<Chamber> GetChamberByIdAsync(int id);
        
        /// <summary>
        /// Adds a new chamber to the system
        /// </summary>
        /// <param name="chamber">The chamber to add</param>
        /// <returns>The newly added chamber with generated ID</returns>
        Task<Chamber> AddChamberAsync(Chamber chamber);
        
        /// <summary>
        /// Retrieves the latest telemetry data for a specific chamber
        /// </summary>
        /// <param name="chamberId">ID of the chamber</param>
        /// <returns>Latest telemetry data for the chamber</returns>
        Task<ChamberTelemetry> GetLatestTelemetryAsync(int chamberId);
    }
}