using DeviceMonitor.API.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
// -----------------------------------------

// Register built-in services for API controllers
builder.Services.AddControllers();

// Register Swagger/OpenAPI tools for API documentation
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register our custom repository as a singleton
// NOTE: In a real app with a database, you would register as scoped instead
// Singleton = one instance for the entire application's lifetime
// Scoped = one instance per HTTP request
builder.Services.AddSingleton<IChamberRepository, ChamberRepository>();

// Add CORS policy to allow our Angular app to call the API
builder.Services.AddCors(options =>
{
    options.AddPolicy("DevPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:4200")  // Angular dev server default port
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Build the application
// -----------------------------------------
var app = builder.Build();

// Configure the HTTP request pipeline (middleware)
// -----------------------------------------

// Enable Swagger UI in development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Redirect HTTP to HTTPS
app.UseHttpsRedirection();

// Enable CORS with our policy
app.UseCors("DevPolicy");

// Enable authorization (though we're not using it in this demo)
app.UseAuthorization();

// Map controller endpoints to routes
app.MapControllers();

// Start the application
app.Run();