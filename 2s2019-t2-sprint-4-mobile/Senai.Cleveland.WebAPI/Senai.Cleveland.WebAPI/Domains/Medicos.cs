using System;
using System.Collections.Generic;

namespace Senai.Cleveland.WebAPI.Domains
{
    public partial class Medicos
    {
        public int IdMedico { get; set; }
        public string Nome { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Crm { get; set; }
    }
}
