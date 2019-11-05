using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Senai.Cleveland.WebAPI.Repositories;

namespace Senai.Cleveland.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class MedicosController : ControllerBase
    {
        MedicoRepository MedicoRepository = new MedicoRepository();

        [HttpGet]
        public IActionResult Listar()
        {
            return Ok(MedicoRepository.Listar());
        }
    }
}