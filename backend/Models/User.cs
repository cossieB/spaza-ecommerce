using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace backend.Models;
[Index(nameof(Email), IsUnique = true)]
public class User {
    [Key]
    public Guid UserId {get; set;}
    public string Email { get; set; }
    public string DisplayName { get; set; }
    public byte[] PasswordHash { get; set; }
    public byte[] PasswordSalt { get; set; }
}

public class UserRegistrationDto {
    public string displayName { get; set; }
    public string email { get; set; }
    public string password { get; set; }
    public string confirmPassword { get; set; }
}

public class UserDto {
    public string email { get; set; }
    public string password { get; set; }
}