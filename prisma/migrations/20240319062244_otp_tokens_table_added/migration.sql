-- CreateTable
CREATE TABLE "OtpToken" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "otp" VARCHAR(8) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OtpToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OtpToken_email_key" ON "OtpToken"("email");

-- CreateIndex
CREATE UNIQUE INDEX "OtpToken_email_otp_key" ON "OtpToken"("email", "otp");
