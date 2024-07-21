//@ts-nocheck

import React from "react";

const InterestsList = ({ interests, handleChange, isSelected }) => {
  return (
    <div className="flex flex-col items-start gap-6">
      <h2 className="text-red-500">
        Please submit your selected hobies on last page
      </h2>
      {interests.map((i) => {
        return (
          <div key={i.id}>
            <input
              type="checkbox"
              name={i.title}
              checked={isSelected[i.title]}
              onChange={(e) => handleChange(e, i.title)}
            />
            <label className="ml-3" htmlFor={"" + i.id}>
              {i.title}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default InterestsList;
