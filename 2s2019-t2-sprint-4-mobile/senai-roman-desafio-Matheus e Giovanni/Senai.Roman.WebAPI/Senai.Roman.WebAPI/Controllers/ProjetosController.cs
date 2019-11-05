using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Senai.Roman.WebAPI.Domains;
using Senai.Roman.WebAPI.Repositories;

namespace Senai.Roman.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class ProjetosController : ControllerBase
    {
        ProjetosRepository ProjetosRepository = new ProjetosRepository();

        //[Authorize]
        [HttpGet]
        public IActionResult Listar()
        {
            return Ok(ProjetosRepository.Listar());
        }

        //[Authorize]
        [HttpPost]
        public IActionResult Cadastrar(Projetos projeto)
        {
            ProjetosRepository.Cadastrar(projeto);
            return Ok();
        }
    }
}