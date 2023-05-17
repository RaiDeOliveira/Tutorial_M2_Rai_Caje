BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Experiencia" (
	"nome_empresa"	TEXT NOT NULL,
	"ano_inicial"	INTEGER,
	"ano_final"	INTEGER,
	"cargo"	TEXT,
	"descricao"	TEXT,
	"id_usuario"	INTEGER,
	PRIMARY KEY("nome_empresa")
);
CREATE TABLE IF NOT EXISTS "Formacao" (
	"nome_curso"	TEXT,
	"ano_inicial"	INTEGER,
	"ano_final"	INTEGER,
	"descricao"	TEXT,
	PRIMARY KEY("nome_curso")
);
CREATE TABLE IF NOT EXISTS "Usuario" (
	"id_usuario"	INTEGER,
	"nome"	TEXT,
	"cargo"	TEXT,
	"endereco"	TEXT,
	"telefone"	TEXT,
	"email"	TEXT,
	"resumo"	TEXT,
	FOREIGN KEY("id_usuario") REFERENCES "Experiencia"("id_usuario"),
	FOREIGN KEY("id_usuario") REFERENCES "Realizacao"("id_usuario"),
	FOREIGN KEY("id_usuario") REFERENCES "Formacao"("descricao"),
	CONSTRAINT "pk_Usuario" UNIQUE("id_usuario")
);
CREATE TABLE IF NOT EXISTS "Realizacao" (
	"nome_realizacao"	TEXT,
	"ano"	INTEGER,
	"descricao"	TEXT,
	"id_usuario"	INTEGER,
	CONSTRAINT "pk_Realizacao" UNIQUE("nome_realizacao")
);
CREATE UNIQUE INDEX IF NOT EXISTS "unq_Experiencia_id_usuario" ON "Experiencia" (
	"id_usuario"
);
CREATE UNIQUE INDEX IF NOT EXISTS "unq_Formacao_descricao" ON "Formacao" (
	"descricao"
);
CREATE UNIQUE INDEX IF NOT EXISTS "unq_Realizacao_id_usuario" ON "Realizacao" (
	"id_usuario"
);
CREATE VIEW "teste" AS SELECT * FROM "main"."Experiencia" WHERE "nome_empresa" LIKE '%Inteli%' ESCAPE '\' AND "ano_inicial" LIKE '%2023%' ESCAPE '\' AND "ano_final" LIKE '%2026%' ESCAPE '\' AND "cargo" LIKE '%Estudante%' ESCAPE '\' AND "descricao" LIKE '%CienciaDaComputacao%' ESCAPE '\' AND "id_usuario" LIKE '%1234%' ESCAPE '\';
COMMIT;
