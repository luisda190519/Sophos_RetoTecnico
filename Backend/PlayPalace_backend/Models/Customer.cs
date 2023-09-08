using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace PlayPalace_backend.Models
{
    public class Customer
    {
        public int CustomerID { get; set; }

        public ApplicationUser ApplicationUser { get; set; }
    }
}
