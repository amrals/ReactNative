using System;
using System.Collections.Generic;

namespace Senai.Roman.WebAPI.Domains
{
    public partial class Usuarios
    {
        public int IdUsuario { get; set; }
        public string Nome { get; set; }
        public bool TipoUsuario { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
    }
}
