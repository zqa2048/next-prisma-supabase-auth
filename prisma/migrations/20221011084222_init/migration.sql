-- CreateTable
CREATE TABLE "Home" (
    "id" SERIAL NOT NULL,
    "image" TEXT,
    "title" TEXT NOT NULL,
    "descripttion" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "guests" INTEGER NOT NULL,
    "beds" INTEGER NOT NULL,
    "baths" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Home_pkey" PRIMARY KEY ("id")
);
