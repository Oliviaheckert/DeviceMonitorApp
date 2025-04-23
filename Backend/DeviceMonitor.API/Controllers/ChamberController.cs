using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using DeviceMonitor.API.Models;
using DeviceMonitor.API.Repositories;

namespace DeviceMonitor.API.Controllers
{
    /// <summary>
    /// API controller for chamber-related operations
    /// </summary>
    /// <remarks>
    /// ApiController attribute adds automatic model validation and parameter binding
    /// Route attribute defines the base URL for all endpoints in this controller
    /// </remarks>
    [ApiController]
    [Route("api/[controller]")]  // Results in "api/chambers" as the base route
    public class ChambersController : ControllerBase
    {
        // Private fields for injected dependencies
        private readonly IChamberRepository _repository;
        private readonly ILogger<ChambersController> _logger;

        /// <summary>
        /// Constructor with dependency injection
        /// </summary>
        /// <param name="repository">Chamber repository for data access</param>
        /// <param name="logger">Logger for recording operational information</param>
        public ChambersController(IChamberRepository repository, ILogger<ChambersController> logger)
        {
            // Store injected dependencies for use in action methods
            _repository = repository;
            _logger = logger;
        }

        /// <summary>
        /// GET: api/chambers
        /// Retrieves all chambers in the system
        /// </summary>
        /// <returns>List of all chambers</returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Chamber>>> GetAllChambers()
        {
            try
            {
                // Get chambers from repository
                var chambers = await _repository.GetAllChambersAsync();
                
                // Return 200 OK with chambers data
                return Ok(chambers);
            }
            catch (Exception ex)
            {
                // Log the error with details
                _logger.LogError(ex, "Error retrieving chambers");
                
                // Return 500 Internal Server Error
                return StatusCode(500, "Internal server error");
            }
        }

        /// <summary>
        /// GET: api/chambers/{id}
        /// Retrieves a specific chamber by ID
        /// </summary>
        /// <param name="id">ID of the chamber to retrieve</param>
        /// <returns>The requested chamber</returns>
        [HttpGet("{id}")]  // Route parameter in curly braces
        public async Task<ActionResult<Chamber>> GetChamber(int id)
        {
            try
            {
                // Get chamber from repository
                var chamber = await _repository.GetChamberByIdAsync(id);
                
                // Check if chamber exists
                if (chamber == null)
                    return NotFound($"Chamber with ID {id} not found");  // 404 Not Found
                
                // Return 200 OK with chamber data
                return Ok(chamber);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving chamber {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        /// <summary>
        /// POST: api/chambers
        /// Creates a new chamber
        /// </summary>
        /// <param name="chamber">Chamber data to create</param>
        /// <returns>The newly created chamber</returns>
        [HttpPost]
        public async Task<ActionResult<Chamber>> AddChamber(Chamber chamber)
        {
            try
            {
                // Validate request
                if (chamber == null)
                    return BadRequest("Chamber data is null");  // 400 Bad Request
                
                // Add chamber via repository
                var newChamber = await _repository.AddChamberAsync(chamber);
                
                // Return 201 Created with location header and new data
                // CreatedAtAction is RESTful - returns location where new resource can be found
                return CreatedAtAction(
                    nameof(GetChamber),            // Action method name that can retrieve the item
                    new { id = newChamber.Id },    // Route values for that action method
                    newChamber                     // The newly created resource
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding chamber");
                return StatusCode(500, "Internal server error");
            }
        }

        /// <summary>
        /// GET: api/chambers/{id}/telemetry
        /// Gets telemetry data for a specific chamber
        /// </summary>
        /// <param name="id">ID of the chamber</param>
        /// <returns>Current telemetry data</returns>
        [HttpGet("{id}/telemetry")]
        public async Task<ActionResult<ChamberTelemetry>> GetChamberTelemetry(int id)
        {
            try
            {
                // First verify the chamber exists
                var chamber = await _repository.GetChamberByIdAsync(id);
                
                if (chamber == null)
                    return NotFound($"Chamber with ID {id} not found");
                
                // Get telemetry data via repository
                var telemetry = await _repository.GetLatestTelemetryAsync(id);
                
                // Return 200 OK with telemetry data
                return Ok(telemetry);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving telemetry for chamber {id}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}