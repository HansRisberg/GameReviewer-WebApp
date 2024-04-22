//using Microsoft.Extensions.Configuration;
//using Microsoft.IdentityModel.Tokens;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Text;

//namespace GameReviewer.DataAccess.Authentication
//{
//    public class JwtTokenGenerator
//    {
//        private readonly string _jwtSecret;

//        public JwtTokenGenerator(IConfiguration configuration)
//        {
//            _jwtSecret = configuration["Jwt:SecretKey"];
//        }
//        public string GenerateJwtToken(string email)
//        {
//            var tokenHandler = new JwtSecurityTokenHandler();
//            var key = Encoding.ASCII.GetBytes(_jwtSecret);
//            var tokenDescriptor = new SecurityTokenDescriptor
//            {
//                Subject = new ClaimsIdentity(new[]
//                {
//                new Claim(ClaimTypes.Email, email)
//                // Add other claims as needed
//            }),
//                Expires = DateTime.UtcNow.AddHours(1), // Token expiration time
//                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
//            };
//            var token = tokenHandler.CreateToken(tokenDescriptor);
//            return tokenHandler.WriteToken(token);
//        }
//    }

//}

using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace GameReviewer.DataAccess.Authentication
{
    public class JwtTokenGenerator
    {
        private readonly string _jwtSecret;
        private readonly string _jwtIssuer;
        private readonly string _jwtAudience;

        public JwtTokenGenerator(IConfiguration configuration)
        {
            _jwtSecret = configuration["Jwt:SecretKey"];
            _jwtIssuer = configuration["Jwt:Issuer"];
            _jwtAudience = configuration["Jwt:Audience"];
        }

        public string GenerateJwtToken(string email)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtSecret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Email, email)
                    // Add other claims as needed
                }),
                Expires = DateTime.UtcNow.AddHours(1), // Token expiration time
                Audience = _jwtAudience,
                Issuer = _jwtIssuer,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}


