namespace netcore_webapi.Models
{
    public class Blog
    {
        public long Id { get; set; }
        public string Title { get; set; } = null!;
        public string Author { get; set; } = null!;
        public string Body { get; set; } = null!;
    }
}