namespace API.Errors;

public class ApiException(int statusCode, string message, string? messageDetail)
{
    public int StatusCode { get; set; } = statusCode;
    public string Message { get; set; } = message;
    public string? MessageDetail { get; set; } = messageDetail;
}
