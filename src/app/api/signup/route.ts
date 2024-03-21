import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";
import { validateEmail } from "../helpers/validation";
import otpGenerator from "otp-generator";
import bcrypt from "bcrypt";

export async function GET() {
  console.log("hello");
  return Response.json({
    name: "Veer",
  });
}

export async function POST(request: Request) {
  // 1.check for email, name and password
  const body = await request.json();
  const { email, otp: inputOtp } = body;
  try {
    const token = await prisma.otpToken.findFirst({
      where: {
        email: email,
      },
    });
    console.log({ token });
    //@ts-ignore
    const { otp } = token;
    console.log({ otp });
    var isVerified = await bcrypt.compare(inputOtp, otp);
    console.log({ isVerified });

    if (isVerified) {
      const updatedUser = await prisma.user.update({
        where: {
          email: email, // Specify the user ID
        },
        data: {
          isVerified: true, // Update isVerified to true
        },
      });
    } else {
      return Response.json({
        status: "failed",
        message: "Otp entered is wrong",
      });
    }

    const deletedToken = await prisma.otpToken.delete({
      where: {
        email: email,
      },
    });

    return Response.json({
      type: "success",
      message: "Succefully created the user",
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      type: "error",
      message: "email not found",
    });

    // if(isVerified) {

    // }

    // const {otp} = token;
  }
}
