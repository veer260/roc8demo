//@ts-nocheck

import React from "react";
import prisma from "../lib/db";
import { ParsedUrlQuery } from "querystring";
import InterestsForm from "../Components/InterestsForm";
import Link from "next/link";

const TOTAL_INTERESTS = 41;

async function page({ searchParams }: { searchParams: ParsedUrlQuery }) {
  const page = typeof searchParams?.page == "string" ? +searchParams.page : 1;
  const userId =
    typeof searchParams?.userId == "string" ? +searchParams.userId : 0;
  const allInterests = await prisma.interest.findMany();
  const usersInterest = await prisma.userInterest.findMany({
    where: {
      userId: userId,
    },
  });

  // usersInterest.forEach((int) => {
  //   if()
  //   int.title = interests[int]
  // })

  // const initialInterest = usersInterest.reduce(() => {

  // },{})

  // console.log({ usersInterest });
  const interests = await prisma.interest.findMany({
    take: 7,
    skip: (page - 1) * 7,
  });

  // console.log({ interests, usersInterest });

  const result = usersInterest.reduce((acc, { interestId }) => {
    // console.log({ interestId });
    const interest = allInterests.find(({ id }) => {
      // console.log({ id });
      // if (id == interestId) {
      //   console.log("true");
      // }
      return +id === +interestId;
      // if (interestId === id) {
      //   // acc[interest.title] = true;
      //   console.log(interest);
      // }
    });
    if (interest) {
      acc[interest.title] = true;
    }

    return acc;
  }, {});

  console.log({ result });

  // const initialState = interests.reduce((obj, interest) => {
  //   //@ts-ignore
  //   obj[interest.title] = false;
  //   return obj;
  // }, {});

  // console.log({ initialState });

  return (
    <div className=" border-[1px] mb-7 ml-auto mr-auto rounded-md w-fit text-center mt-[78px] border-[#C1C1C1] pt-10 pb-[72px] px-[60px]">
      <InterestsForm page={page} interests={interests} initialState={result} />

      <ul className=" list flex gap-3 items-center justify-start mt-[66px]">
        {new Array(Math.ceil(TOTAL_INTERESTS / 7))
          .fill("")
          .map((val, index) => {
            return (
              <Link
                className={`text-[20px] ${
                  page == index + 1 ? "font-semibold  " : " text-gray-400"
                }   
                `}
                href={`/protected/?page=${index + 1}&userId=${userId}`}
                key={index + 1}
              >
                {index + 1}
              </Link>
            );
          })}
      </ul>
    </div>
  );
}

export default page;
