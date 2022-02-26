import * as React from 'react';

/*
@params

*/
interface ListingsProps {
  dropState: boolean;
  setDropState: Function;
}

const Listings: React.FC<ListingsProps> = ({ dropState, setDropState }) => {
  return (
    <>
      <div
        className="text-5xl flex cursor-pointer"
        onClick={() => setDropState(!dropState)}
      >
        Your Listings {dropState ? <CaretUp /> : <CaretDown />}
      </div>
      <div
        className={
          `grid grid-cols-5 gap-x-2 gap-y-4 ` + (dropState ? '' : 'hidden')
        }
      >
        img img img
      </div>
    </>
  );
};

function CaretDown() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      height="36"
      width="36"
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M17 10L12 16L7 10H17Z"
        fill="#0D0D0D"
      ></path>
    </svg>
  );
}

function CaretUp() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      height="36"
      width="36"
    >
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M7 14L12 8L17 14L7 14Z"
        fill="#0D0D0D"
      ></path>
    </svg>
  );
}

export default Listings;
