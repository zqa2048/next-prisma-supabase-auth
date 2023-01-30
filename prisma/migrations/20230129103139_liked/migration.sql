-- CreateTable
CREATE TABLE "_favoriteHomesRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_favoriteHomesRelation_AB_unique" ON "_favoriteHomesRelation"("A", "B");

-- CreateIndex
CREATE INDEX "_favoriteHomesRelation_B_index" ON "_favoriteHomesRelation"("B");

-- AddForeignKey
ALTER TABLE "_favoriteHomesRelation" ADD CONSTRAINT "_favoriteHomesRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "Home"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favoriteHomesRelation" ADD CONSTRAINT "_favoriteHomesRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
