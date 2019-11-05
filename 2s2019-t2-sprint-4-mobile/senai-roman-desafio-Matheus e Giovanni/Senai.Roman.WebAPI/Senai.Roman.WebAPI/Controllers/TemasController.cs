using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Senai.Roman.WebAPI.Repositories;

namespace Senai.Roman.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    [ApiController]
    public class TemasController : ControllerBase
    {
        TemasRepository TemasRepository = new TemasRepository();

        [HttpGet]
        public IActionResult Listar()
        {
            return Ok(TemasRepository.Listar());
        }
    }
}