-- CreateTable
CREATE TABLE "Teams" (
    "id" SERIAL NOT NULL,
    "team_name" TEXT NOT NULL,

    CONSTRAINT "Teams_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Teams_team_name_key" ON "Teams"("team_name");
