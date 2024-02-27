using MongoDB.Bson.Serialization.Attributes;

namespace crud_function_app.Models
{
    public class Sequence
    {
        [BsonId]
        public string Name { get; set; }

        public int Value { get; set; }
    }
}
