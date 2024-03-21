//@ts-nocheck

"use client";
import React from "react";
import InterestsList from "./InterestsList";
// import { cookies } from "next/headers";

interface Interest {
  id: number;
  title: string;
}
//@ts-ignore
const InterestsForm = ({ initialState, interests, page }) => {
  const [isSelected, setIsSelected] = React.useState(initialState);
  // const user = cookies().get()

  const handleChange = (e, title) => {
    const newIsSelected = { ...isSelected };
    newIsSelected[title] = e.target.checked;
    setIsSelected(newIsSelected);
  };
  // console.log({ isSelected, initialState });
  console.log({ isSelected });

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/interests`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isSelected }),
      }
    );

    const data = await res.json();
    if (data.status == "success") {
      console.log(data.message);
    } else if (data.status == "error") {
      console.log(data.message);
    }
  }

  return (
    <div>
      <form className="" onSubmit={handleSubmit}>
        <h1 className="text-[32px] font-semibold">
          Please mark your interests!
        </h1>
        <p className="mb-[37px] mt-[23px]">We will keep you notified</p>
        <h2 className="text-[20px] font-medium mb-7 text-start">
          My saved interests
        </h2>
        {/* //@ts-ignore */}
        {/* {interests.map((i: Interest) => {
          return (
            
          );
        })} */}
        <InterestsList
          isSelected={isSelected}
          interests={interests}
          handleChange={handleChange}
        />
        {page == "6" && <button type="submit">Submit choices</button>}
      </form>
    </div>
  );
};

export default InterestsForm;
