CREATE DATABASE M_Roman;

USE M_Roman;
go
CREATE TABLE Temas(
	IdTema INT IDENTITY PRIMARY KEY,
	Nome VARCHAR(255) NOT NULL
);
go
CREATE TABLE Projetos(
	IdProjeto INT IDENTITY PRIMARY KEY,
	Nome VARCHAR(255) NOT NULL,
	IdTema INT FOREIGN KEY REFERENCES Temas(IdTema)
);
go
CREATE TABLE Usuarios(
	IdUsuario INT IDENTITY PRIMARY KEY,
	Nome VARCHAR(255) NOT NULL,
	TipoUsuario BIT NOT NULL,
	Email VARCHAR(50) NOT NULL,
	Senha VARCHAR(255) NOT NULL
);

INSERT INTO Temas(Nome)
	VALUES('Gestão');

INSERT INTO Projetos(Nome,IdTema)
	VALUES('Controle de Estoque', 1)

INSERT INTO Usuarios(Nome,TipoUsuario,Email,Senha)
	VALUES('Cléber', 1,'admin@admin.com','123456'),('João', 0,'comum@comum.com','123456')

DROP TABLE Usuarios;

SELECT * FROM Usuarios;