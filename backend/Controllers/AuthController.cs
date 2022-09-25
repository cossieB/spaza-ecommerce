using System.Security.Cryptography;
using System.Text.RegularExpressions;
using AutoMapper;
using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("/api/auth")]
public class AuthController : ControllerBase {
    private readonly DataContext db;
    public AuthController(DataContext db) {
        this.db = db;
    }
    [HttpPost("register")]
    public async Task<IActionResult> Register(UserRegistrationDto request) {
        var errors = new Error();
        if (request.password != request.confirmPassword) {
            errors.errors.Add("Passwords do not match");
        }
        if (request.displayName.Length < 3 || request.displayName.Length > 20) {
            errors.errors.Add("Username must be between 3 and 20 characters");
        }
        if (errors.errors.Count > 0) return BadRequest(errors);
        CreatePasswordHash(request.password, out byte[] hash, out byte[] salt);
        
        var user = new User();
        user.PasswordHash = hash;
        user.PasswordSalt = salt;
        user.Email = request.email;
        user.DisplayName = request.displayName;

        return Ok(user);
    }
    private void CreatePasswordHash(string password, out byte[] hash, out byte[] salt) {
        using (var hmac = new HMACSHA512()) {
            salt = hmac.Key;
            hash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }
    }
}