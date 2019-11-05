using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Senai.Roman.WebAPI.Domains;
using Senai.Roman.WebAPI.Repositories;
using Senai.Roman.WebAPI.ViewModels;

namespace Senai.Roman.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        UsuariosRepository UsuariosRepository = new UsuariosRepository();

        [HttpPost]
        public IActionResult Login(LoginViewModel login)
        {
            try
            {
                Usuarios Usuario = UsuariosRepository.BuscarPorEmailESenha(login);
                if (Usuario == null)
                {
                    return NotFound(new { mensagem = "Email ou senha inválidos." });
                }

                var claims = new[]
                {
                    // nome
                    new Claim("Nome", Usuario.Nome),
                    // email
                    new Claim(JwtRegisteredClaimNames.Email, Usuario.Email),
                    // id
                    new Claim(JwtRegisteredClaimNames.Jti, Usuario.IdUsuario.ToString()),
                    // é a permissão do usuário
                    new Claim(ClaimTypes.Role, Usuario.TipoUsuario.ToString()),

                    new Claim("Permissao", Usuario.TipoUsuario.ToString()),
                };

                var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("roman-chave-autenticacao"));

                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: "Roman.WebApi",
                    audience: "Roman.WebApi",
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(30),
                    signingCredentials: creds);

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token)
                });

            }
            catch (Exception ex)
            {
                return BadRequest(new { mensagem = "Erro." + ex.Message });
            }
        }
    }
}