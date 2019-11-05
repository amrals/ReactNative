using Senai.Cleveland.WebAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.Cleveland.WebAPI.Repositories
{
    public class MedicoRepository
    {
        public List<Medicos> Listar()
        {
            using (ClevelandContext ctx = new ClevelandContext())
            {
                return ctx.Medicos.ToList();
            }
        }
    }
}
