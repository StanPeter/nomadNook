using System.Net;
using System.Text.Json;
using API.Errors;

namespace API.Middleware;

public class ExceptionMiddleware(
    RequestDelegate next,
    ILogger<ExceptionMiddleware> logger,
    IHostEnvironment environment
)
{
    private static readonly JsonSerializerOptions JsonSerializerOptions =
        new() { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception error)
        {
            logger.LogError(error, error.Message);
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var response = environment.IsDevelopment()
                ? new ApiException(context.Response.StatusCode, error.Message, error.StackTrace)
                : new ApiException(
                    context.Response.StatusCode,
                    error.Message,
                    "Internal server error"
                );

            var json = JsonSerializer.Serialize(response, JsonSerializerOptions);
            await context.Response.WriteAsync(json);
        }
    }
}
