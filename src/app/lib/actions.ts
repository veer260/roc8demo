//@ts-nocheck
"use server";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import prisma from "./db";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { error } from "console";
import { use } from "react";

const schema = z.object({
  email: z.string({
    invalid_type_error: "Invalid Email",
  }),
  name: z.string(),
  password: z.string().min(4).max(8),
});
export async function handleForm(prevState: any, formData: FormData) {
  "use server";
  //   console.log("handle form called");

  // const deleteduser = await prisma.user.delete({
  //   where: {
  //     email: "zarvisalpha258@gmail.com",
  //   },
  // });

  // const deleteToken = await prisma.otpToken.delete({
  //   where: {
  //     email: "zarvisalpha258@gmail.com",
  //   },
  // });

  // return;

  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  console.log({ name, email, password });

  const validatedFields = schema.safeParse({
    name,
    email,
    password,
  });

  if (!validatedFields.success) {
    console.log("here is error");
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      type: "error",
      //@ts-ignore
      message: error.email || errors.name || errors.password,
    };
  }

  //   console.log("here");

  //querying the database for email already in use;

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      return {
        type: "error",
        message: "email already in use",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      type: "error",
      message: "something went wrong in database query",
    };
  }

  const salt = bcrypt.genSaltSync(8);
  const hash = bcrypt.hashSync(password, salt);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        username: name,
        password: hash,
        // isVerified: false,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      type: "error",
      message: "something went wrong in creating the user",
    };
  }

  //   if(existin)

  console.log("here");

  // console.log(process.env.SMTP_PASSWORD);
  // const transport = await nodemailer.createTransport({
  //   // const {SMTP_EMAIL, SMTP_PASSWORD} = process.env;
  //   service: "gmail",
  //   auth: {
  //     user: process.env.SMTP_EMAIL,
  //     password: process.env.SMTP_PASSWORD,
  //   },
  // });
  sendOtp({ email });

  redirect(`/otpform/?email=${email}`);

  //   console.log("sending email");

  // console.log(formData.get("name"));
  // const;
  // const res = await fetch("http://localhost:3000/api/signup", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ name, email, password }),
  // });
  // const data = await res.json();
  // console.log(data);
  // return {};
}
// const handleFormSubmit = async (formData: FormData) => {
// };

async function sendOtp({ email }) {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    const testResult = await transport.verify();
  } catch (error) {
    throw error;
  }
  const generatedOtp = otpGenerator.generate(8, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  //   cookies().set({
  //     name: "email",
  //     value: `${email}`,
  //     httpOnly: true,
  //     // path: "/",
  //   });
  try {
    const sendResult = await transport.sendMail({
      from: process.env.SMTP_EMAIL,
      to: `${email}`,
      html: `<p>Your otp for signing in the ecoomerce app is ${generatedOtp}</p>`,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }

  const hashedOtp = await bcrypt.hash(generatedOtp, 8);

  try {
    const otp = await prisma.otpToken.create({
      data: {
        email,
        otp: hashedOtp,
        expiresAt: Math.floor(Date.now() / 1000) + 600,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      type: "error",
      message: "error in creating a token in database",
    };
  }
}

export async function loginAction(prevState, formData) {
  "use server";
  const email = formData.get("email");
  const password = formData.get("password");

  // console.log({ email, password });
  let user;

  try {
    //check user
    user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    // console.log({ user });
    if (!user) {
      return {
        type: "error",
        message: "user not found with this email",
      };
    }

    //user definitely present
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return {
        type: "error",
        message: "password is incorrect",
      };
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = "HS256";

    const jwt = await new jose.SignJWT({})
      .setProtectedHeader({ alg }) // Set the algorithm in the protected header
      // .setAudience("urn:example:audience")
      .setExpirationTime("2h")
      .setSubject("" + user.id)
      .sign(secret);

    // cookies().set("authorization", jwt);
    console.log({ jwt });
    cookies().set({
      name: "authorization",
      value: jwt,
      httpOnly: true,
      path: "/",
    });

    // return {
    //   type: "success",
    //   message: "user logged in",
    // };

    // redirect("/protected");

    //    console.log(jwt);
  } catch (error) {
    console.log(error);
    return {
      type: "error",
      message: error,
    };
  }
  redirect(`/protected/?userId=${user.id}`);
}

export async function handleInterestAction(prevState, formData) {
  console.log(formData.get("reading"));
}
