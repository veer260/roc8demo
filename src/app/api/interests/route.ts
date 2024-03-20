//@ts-nocheck

import prisma from "@/app/lib/db";
import { cookies } from "next/headers";
import * as jose from "jose";

export async function POST(request: Request) {
  console.log("in interests post handler");
  const { isSelected: selectedInterests } = await request.json();
  console.log({ selectedInterests });
  try {
    // selectedInterests.for
    // const selectedInterestsTitles = selectedInterests.ke
    const cookie = cookies().get("authorization");

    // const interest = await

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const jwt = cookie.value;
    console.log({ jwt, secret });
    const { payload } = await jose.jwtVerify(jwt, secret, {});
    //  const user = await prisma.userInterest.create({
    //    data: {
    //      userId: payload.sub,
    //    },
    //  });

    for (let key in selectedInterests) {
      // console.log(key + ": " + myObject[key]);

      if (selectedInterests[key]) {
        // console.log(selectedInterests[key]);
        const interest = await prisma.interest.findFirst({
          where: {
            title: key,
          },
        });
        const existingInterest = await prisma.userInterest.findFirst({
          where: {
            userId: +payload.sub,
            interestId: interest.id,
          },
        });

        if (existingInterest) {
          continue;
          // return Response.json({
          //   status: "failed",
          //   message: "interest already registered",
          // });
        }
        const res = await prisma.userInterest.create({
          data: {
            userId: +payload.sub,
            interestId: interest.id,
          },
        });
      } else if (selectedInterests[key] == false) {
        const interest = await prisma.interest.findFirst({
          where: {
            title: key,
          },
        });

        const deletedUserInterest = await prisma.userInterest.delete({
          where: {
            userId_interestId: {
              userId: +payload.sub,
              interestId: interest.id,
            },
          },
        });
      }
    }
    return Response.json({
      status: "success",
      message: "all interests created",
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      status: "failed",
      message: "something went wrong in creating interest",
    });
  }
}
