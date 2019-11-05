using Senai.Roman.WebAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.Roman.WebAPI.Repositories
{
    public class TemasRepository
    {
        public List<Temas> Listar()
        {
            using (RomanContext ctx = new RomanContext())
            {
                return ctx.Temas.ToList();
            }
        }
    }
}
