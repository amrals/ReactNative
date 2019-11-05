using System;
using System.Collections.Generic;

namespace Senai.Roman.WebAPI.Domains
{
    public partial class Projetos
    {
        public int IdProjeto { get; set; }
        public string Nome { get; set; }
        public int? IdTema { get; set; }

        public Temas IdTemaNavigation { get; set; }
    }
}
