using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace PlayPalace_backend.Models
{
    public class Customer
    {
        public int CustomerID { get; set; }

        [JsonIgnore]
        public int? ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
    }
}
