import React, { useState } from "react";

export default function IndexPage() {
  const [effect, setEffect] = useState(false);
  addEventListener('animationend', (event) => {});
  return (
    <div className="flex h-screen flex-col justify-center">
      <div className="flex justify-center">
        <button
          className={`${
            effect && "animate-wiggle"
          } bg-blue-500 p-4 text-white rounded hover:bg-blue-700 hover:shadow-xl`}
          onClick={() => {
            setEffect(true);
          }}
          onAnimationEnd={() => setEffect(false)}
        >
          Wiggle wiggle...
        </button>
      </div>
    </div>
  );
}