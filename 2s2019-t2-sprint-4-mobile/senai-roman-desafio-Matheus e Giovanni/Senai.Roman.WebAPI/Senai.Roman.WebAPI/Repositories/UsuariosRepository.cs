using Senai.Roman.WebAPI.Domains;
using Senai.Roman.WebAPI.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Senai.Roman.WebAPI.Repositories
{
    public class UsuariosRepository
    {
        public List<Usuarios> Listar()
        {
            using (RomanContext ctx = new RomanContext())
            {
                return ctx.Usuarios.ToList();
            }
        }

        public Usuarios BuscarPorEmailESenha(LoginViewModel login)
        {
            using (RomanContext ctx = new RomanContext())
            {
                // buscar os dados no banco e verificar ser os dados são compatíveis
                Usuarios UsuarioBuscado = ctx.Usuarios.FirstOrDefault(x => x.Email == login.Email && x.Senha == login.Senha);
                if (UsuarioBuscado == null)
                    return null;
                return UsuarioBuscado;
            }
        }
    }
}
