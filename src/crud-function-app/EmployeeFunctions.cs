using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using MongoDB.Driver;
using crud_function_app.Data;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using crud_function_app.Models;
using System.IO;
using Newtonsoft.Json;
using System;
using System.Web.Http;

public class EmployeeFunctions
{
    private readonly MongoDbContext _dbContext;

    public EmployeeFunctions(MongoDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [FunctionName("GetAllEmployees")]
    public async Task<IActionResult> Run(
       [HttpTrigger(AuthorizationLevel.Function, "get", Route = "employees")] HttpRequest req,
       ILogger log)
    {
        try
        {
            int.TryParse(req.Query["page"], out int page);
            page = page == 0 ? 1 : page;


            int.TryParse(req.Query["pagesize"], out int pageSize);
            pageSize = pageSize == 0 ? 10 : pageSize;

            var (employees, total) = await _dbContext.GetAllEmployees(page, pageSize);
            var response = new { employees, total, page, pageSize };
            return new OkObjectResult(response);
        }
        catch (Exception ex)
        {
            log.LogError(ex, "Error occured when getting employees");
            return new InternalServerErrorResult();
        }
    }

    [FunctionName("CreateEmployee")]
    public async Task<IActionResult> CreateEmployee(
    [HttpTrigger(AuthorizationLevel.Function, "post", Route = "employee")] HttpRequest req,
    ILogger log)
    {
        string requestBody = "";
        try
        {

            requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var input = JsonConvert.DeserializeObject<Employee>(requestBody);

            await _dbContext.CreateEmployee(input);
            return new OkObjectResult(input);

        }
        catch (Exception ex)
        {
            log.LogError(ex, $"Error occured when creating new employee. body - {requestBody}");
            return new InternalServerErrorResult();
        }
    }

    [FunctionName("GetEmployee")]
    public async Task<IActionResult> GetEmployee(
        [HttpTrigger(AuthorizationLevel.Function, "get", Route = "employee/{id}")] HttpRequest req,
        int id, ILogger log)
    {

        try
        {
            var employee = await _dbContext.GetEmployee(id);
            return employee != null ? new OkObjectResult(employee) : new NotFoundResult();

        }
        catch (Exception ex)
        {
            log.LogError(ex, $"Error occured when getting an employee {id}");
            return new InternalServerErrorResult();
        }
    }


    [FunctionName("UpdateEmployee")]
    public async Task<IActionResult> UpdateEmployee(
        [HttpTrigger(AuthorizationLevel.Function, "put", Route = "employee/{id}")] HttpRequest req,
        int id, ILogger log)
    {
        try
        {
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var updatedEmployee = JsonConvert.DeserializeObject<Employee>(requestBody);

            await _dbContext.UpdateEmployee(id, updatedEmployee);

            return new OkObjectResult(updatedEmployee);

        }
        catch (Exception ex)
        {
            log.LogError(ex, $"Error occured when updating an employee {id}");
            return new InternalServerErrorResult();
        }
    }


    [FunctionName("DeleteEmployee")]
    public async Task<IActionResult> DeleteEmployee(
       [HttpTrigger(AuthorizationLevel.Function, "delete", Route = "employee/{id}")] HttpRequest req,
       int id, ILogger log)
    {
        try
        {
            await _dbContext.DeleteEmployee(id);

            return new NoContentResult();
        }
        catch (Exception ex)
        {
            log.LogError(ex, $"Error occured when deleting an employee {id}");
            return new InternalServerErrorResult();
        }
    }
}



