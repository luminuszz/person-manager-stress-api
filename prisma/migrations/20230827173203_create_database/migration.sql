-- CreateTable
CREATE TABLE "Person" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf_cnpj" TEXT NOT NULL,
    "nascimento" TEXT NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seguro" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "personId" TEXT NOT NULL,

    CONSTRAINT "Seguro_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_cpf_cnpj_key" ON "Person"("cpf_cnpj");

-- AddForeignKey
ALTER TABLE "Seguro" ADD CONSTRAINT "Seguro_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
