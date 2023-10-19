using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlayPalace_backend.Context;
using PlayPalace_backend.DTO;
using PlayPalace_backend.Models;

namespace PlayPalace_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public readonly ProjectContext dbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public AuthController(ProjectContext context, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            dbContext = context;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] SignUpDto signUpDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new ApplicationUser
            {
                UserName = signUpDto.Email, // Set UserName to the email address
                Email = signUpDto.Email,
                Name = signUpDto.Name,
                LastName = signUpDto.LastName,
                Address = signUpDto.Address,
                Cellphone = signUpDto.Cellphone,
                Gender = signUpDto.Gender,
                DocumentType = signUpDto.DocumentType,
                Documento = signUpDto.Documento,
                Age = signUpDto.Age,
                IsAdmin = signUpDto.IsAdmin
            };

            var result = await _userManager.CreateAsync(user, signUpDto.Password);

            if (result.Succeeded)
            {
                // User registration was successful
                await _signInManager.SignInAsync(user, isPersistent: false);

                // Create a new Customer and associate it with the user
                var customer = new Customer
                {
                    ApplicationUser = user
                };

                dbContext.Customers.Add(customer);
                await dbContext.SaveChangesAsync();

                var userResponse = new
                {
                    UserId = user.Id,
                    UserName = user.UserName,
                    Email = user.Email,
                    IsAdmin = user.IsAdmin
                };

                return Ok(new
                {
                    message = "User registered successfully.",
                    user = userResponse // Include user information in the response
                });
            }

            // If registration fails, return the error messages
            var errors = result.Errors.Select(e => e.Description);
            return BadRequest(new { errors });
        }


        [HttpPost("signin")]
        public async Task<IActionResult> SignIn([FromBody] SignInDto signInDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _signInManager.PasswordSignInAsync(
                signInDto.Email,
                signInDto.Password,
                isPersistent: false, // Set to true for persistent cookies
                lockoutOnFailure: false);

            if (result.Succeeded)
            {
                // User is signed in successfully
                var user = await _userManager.FindByEmailAsync(signInDto.Email);

                // Include additional user information in the response
                var userResponse = new
                {
                    UserId = user.Id,
                    UserName = user.UserName,
                    Email = user.Email,
                    IsAdmin = user.IsAdmin
                };

                return Ok(new
                {
                    message = "User signed in successfully.",
                    user = userResponse // Include user information in the response
                });
            }

            if (result.IsLockedOut)
            {
                return BadRequest(new { error = "Account is locked out due to multiple failed login attempts." });
            }

            return BadRequest(new { error = "Invalid login attempt." });
        }


        [HttpPost("signout")]
        public async Task<IActionResult> SignOut()
        {
            await _signInManager.SignOutAsync();
            return Ok(new { message = "User signed out successfully." });
        }



    }
}
