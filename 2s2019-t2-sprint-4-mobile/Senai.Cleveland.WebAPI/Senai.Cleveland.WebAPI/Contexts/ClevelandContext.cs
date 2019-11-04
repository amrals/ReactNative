using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Senai.Cleveland.WebAPI.Domains
{
    public partial class ClevelandContext : DbContext
    {
        public ClevelandContext()
        {
        }

        public ClevelandContext(DbContextOptions<ClevelandContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Medicos> Medicos { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=.\\SqlExpress;Initial Catalog=M_Cleveland;User Id=sa;Pwd=132");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Medicos>(entity =>
            {
                entity.HasKey(e => e.IdMedico);

                entity.Property(e => e.Crm)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);

                entity.Property(e => e.DataNascimento).HasColumnType("date");

                entity.Property(e => e.Nome)
                    .IsRequired()
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });
        }
    }
}
