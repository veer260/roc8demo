import React from "react";

interface DigitProps {
  num: string;
  handleFill: (num: number) => void;
}

const Digit: React.FC<DigitProps> = ({ num, handleFill }) => {
  //   const [val, setVal] = React.useState("");
  //@ts-ignore
  const handleValUpdate = (e) => {
    handleFill(e.target.value);
  };
  return (
    <>
      <input
        type="text"
        id={num}
        value={num}
        onChange={handleValUpdate}
      ></input>
      <label htmlFor="id"></label>
    </>
  );
};

export default Digit;
