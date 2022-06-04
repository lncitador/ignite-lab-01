-- CreateTable
CREATE TABLE "customers" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- Install uuid-ossp extension

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
