using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PlayPalace_backend.Context;
using PlayPalace_backend.Models;

namespace PlayPalace_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public readonly ProjectContext dbContext;
        private readonly UserManager<Customer> _userManager;
        private readonly SignInManager<Customer> _signInManager;

        public AuthController(ProjectContext context, UserManager<Customer> userManager, SignInManager<Customer> signInManager)
        {
            dbContext = context;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> Signup([FromBody] Customer Customer)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid model data.");
                }

                // Check if the username or email is already in use
                var existingUser = await _userManager.FindByNameAsync(Customer.Username);
                if (existingUser != null)
                {
                    return BadRequest("Username is already taken.");
                }

                existingUser = await _userManager.FindByEmailAsync(Customer.Email);
                if (existingUser != null)
                {
                    return BadRequest("Email is already in use.");
                }

                // Create a new Customer entity
                var newCustomer = new Customer
                {
                    Username = Customer.Username,
                    Name = Customer.Name,
                    LastName = Customer.LastName,
                    Address = Customer.Address,
                    Email = Customer.Email,
                    Cellphone = Customer.Cellphone,
                    Gender = Customer.Gender,
                    DocumentType = Customer.DocumentType,
                    YearOfBirth = Customer.YearOfBirth
                };

                // Create the user with a hashed password
                var result = await _userManager.CreateAsync(newCustomer, Customer.Password);

                if (result.Succeeded)
                {
                    // You can optionally sign in the user here if needed.
                    await _signInManager.SignInAsync(newCustomer, isPersistent: false);

                    return Ok("Registration successful.");
                }
                else
                {
                    return BadRequest("Registration failed.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error: {ex.Message}");
            }
        }

        //[HttpPost("signin")]
        //public async Task<IActionResult> Signin([FromBody] SigninModel signinModel)
        //{
        //    // Validate the model and find the user by username.
        //    // Decrypt the password hash from the database.
        //    // Compare the decrypted password hash with the entered password.
        //    // Create a JWT token or session for authentication if successful.
        //    // Return a success message or error response.
        //}


        //[HttpPost("logout")]
        //public async Task<IActionResult> Logout()
        //{
        //    // Perform logout actions, such as token/session invalidation.
        //    // Return a success message.
        //}




    }
}
