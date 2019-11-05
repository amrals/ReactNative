using Senai.Roman.WebAPI.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.Roman.WebAPI.Repositories
{
    public class ProjetosRepository
    {
        public List<Projetos> Listar()
        {
            using (RomanContext ctx = new RomanContext())
            {
                return ctx.Projetos.ToList();
            }
        }

        public void Cadastrar(Projetos projeto)
        {
            using (RomanContext ctx = new RomanContext())
            {
                ctx.Projetos.Add(projeto);
                ctx.SaveChanges();
            }
        }
    }
}
