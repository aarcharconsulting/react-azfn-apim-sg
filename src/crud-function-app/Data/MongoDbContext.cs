using crud_function_app.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace crud_function_app.Data
{
    public class MongoDbContext
    {
        private readonly IMongoCollection<Employee> _employees;
        private readonly IMongoCollection<Sequence> _sequences;

        public MongoDbContext(string connectionString, string dbName)
        {
            var client = new MongoClient(connectionString);
            var database = client.GetDatabase(dbName);
            _employees = database.GetCollection<Employee>("employees");
            _sequences = database.GetCollection<Sequence>("sequences");
        }

        public async Task<(List<Employee>, long)> GetAllEmployees(int page, int pageSize)
        {
            var skip = (page - 1) * pageSize;
            var employees = await _employees.Find(_ => true).Skip(skip).Limit(pageSize).ToListAsync();
            var total = await _employees.CountDocumentsAsync(new BsonDocument());

            return (employees, total);
        }

        public async Task<Employee> GetEmployee(int id)
        {
            var employee = await _employees.Find(emp => emp.Id == id).FirstOrDefaultAsync();
            return employee;
        }

        public async Task CreateEmployee(Employee employee)
        {
            var sequence = await GetNextSequenceValue("employeeId");
            employee.Id = sequence;
            await _employees.InsertOneAsync(employee);
        }

        public async Task UpdateEmployee(int id, Employee employee)
        {
            var filter = Builders<Employee>.Filter.Eq(e => e.Id, id);
            await _employees.ReplaceOneAsync(filter, employee);
        }

        public async Task DeleteEmployee(int id)
        {
            var filter = Builders<Employee>.Filter.Eq(e => e.Id, id);
            await _employees.DeleteOneAsync(filter);
        }

        private async Task<int> GetNextSequenceValue(string sequenceName)
        {
            var filter = Builders<Sequence>.Filter.Eq(s => s.Name, sequenceName);
            var update = Builders<Sequence>.Update.Inc(s => s.Value, 1);
            var options = new FindOneAndUpdateOptions<Sequence>
            {
                ReturnDocument = ReturnDocument.After,
                IsUpsert = true
            };

            var sequence = await _sequences.FindOneAndUpdateAsync(filter, update, options);
            return sequence.Value;
        }
    }

}
