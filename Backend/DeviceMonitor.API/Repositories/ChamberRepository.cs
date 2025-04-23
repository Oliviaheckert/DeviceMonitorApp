using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DeviceMonitor.API.Models;

namespace DeviceMonitor.API.Repositories
{
    /// <summary>
    /// In-memory implementation of IChamberRepository
    /// </summary>
    /// <remarks>
    /// For a real application, you would typically implement this
    /// using Entity Framework Core or another ORM to access a database
    /// </remarks>
    public class ChamberRepository : IChamberRepository
    {
        // In-memory collection of chambers (simulates database)
        // Static so data persists between requests during the application lifetime
        private static List<Chamber> _chambers = new List<Chamber>
        {
            // Add some sample data for testing
            new Chamber 
            { 
                Id = 1, 
                Name = "Chamber A", 
                Type = "Environmental", 
                IsActive = true,
                LastMaintenance = DateTime.Now.AddMonths(-2),
                Status = ChamberStatus.Running
            },
            new Chamber 
            { 
                Id = 2, 
                Name = "Chamber B", 
                Type = "Thermal", 
                IsActive = true,
                LastMaintenance = DateTime.Now.AddMonths(-1),
                Status = ChamberStatus.Idle
            }
        };

        // Track the next available ID (would be handled by database in real app)
        private static int _nextId = 3;

        // For generating random telemetry data
        private readonly Random _random = new Random();

        /// <summary>
        /// Retrieves all chambers in the system
        /// </summary>
        /// <returns>A task that represents the asynchronous operation, containing all chambers</returns>
        public async Task<IEnumerable<Chamber>> GetAllChambersAsync()
        {
            // Simulate async database call with Task.FromResult
            // In a real app, this would be "return await dbContext.Chambers.ToListAsync();"
            return await Task.FromResult(_chambers);
        }

        /// <summary>
        /// Retrieves a specific chamber by its ID
        /// </summary>
        /// <param name="id">The chamber ID to look up</param>
        /// <returns>The requested chamber or null if not found</returns>
        public async Task<Chamber> GetChamberByIdAsync(int id)
        {
            // Using LINQ's FirstOrDefault to find the first matching chamber or return null
            // FirstOrDefault is a common LINQ method in C# development
            return await Task.FromResult(_chambers.FirstOrDefault(c => c.Id == id));
        }

        /// <summary>
        /// Adds a new chamber to the system
        /// </summary>
        /// <param name="chamber">Chamber data to add</param>
        /// <returns>The added chamber with its assigned ID</returns>
        public async Task<Chamber> AddChamberAsync(Chamber chamber)
        {
            // Assign a new ID (would be handled by database in real app)
            chamber.Id = _nextId++;
            
            // Add to our collection
            _chambers.Add(chamber);
            
            // Return the created chamber
            return await Task.FromResult(chamber);
        }

        /// <summary>
        /// Generates simulated telemetry data for a chamber
        /// </summary>
        /// <param name="chamberId">ID of the chamber</param>
        /// <returns>Randomly generated telemetry data</returns>
        public async Task<ChamberTelemetry> GetLatestTelemetryAsync(int chamberId)
        {
            // Generate random telemetry values (simulate real device readings)
            var telemetry = new ChamberTelemetry
            {
                ChamberId = chamberId,
                Timestamp = DateTime.Now,
                // Generate realistic values with appropriate ranges
                Temperature = Math.Round(_random.NextDouble() * 100, 2),  // 0-100°C
                Humidity = Math.Round(_random.NextDouble() * 100, 2),     // 0-100%
                Pressure = Math.Round(_random.NextDouble() * 10 + 1000, 2), // 1000-1010 hPa
                Voltage = Math.Round(_random.NextDouble() * 24, 2)        // 0-24V
            };

            return await Task.FromResult(telemetry);
        }
    }
}