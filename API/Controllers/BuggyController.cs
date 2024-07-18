using API.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class BuggyController(DataContext context) : BaseApiController
{
    [HttpGet("server-error")]
    public ActionResult<string> GetServerError()
    {
        var thing = context.Users.Find(-1).ToString();
        return "secret text";
    }
}
