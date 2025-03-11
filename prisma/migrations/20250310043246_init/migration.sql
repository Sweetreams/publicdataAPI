-- CreateTable
CREATE TABLE "SetDB" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "format_data" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SetDB_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataSet" (
    "id" SERIAL NOT NULL,
    "id_set" INTEGER NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DataSet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DataSet" ADD CONSTRAINT "DataSet_id_set_fkey" FOREIGN KEY ("id_set") REFERENCES "SetDB"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
