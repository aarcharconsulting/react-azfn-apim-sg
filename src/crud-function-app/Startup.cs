using crud_function_app.Data;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

[assembly: FunctionsStartup(typeof(CrudFunctionApp.Startup))]
namespace CrudFunctionApp
{

    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            var context = builder.GetContext();

            builder.Services.AddSingleton((s) => {
                var config = s.GetService<IConfiguration>();
                var connectionString = config["MongoDbConnectionString"];
                var dbName = config["MongoDbDatabaseName"];
                return new MongoDbContext(connectionString, dbName);
            });
        }
    }
}