-- CreateTable
CREATE TABLE "students" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- Install uuid-ossp extension

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
