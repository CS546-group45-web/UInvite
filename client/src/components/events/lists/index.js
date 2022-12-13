import React from "react";

function EventsList() {
  console.log(window.location);
  return (
    <div className="w-full">
      <h1 className="mt-6 text-center text-5xl font-bold tracking-tight text-gray-900">
        Home
      </h1>
      <header className="mt-6 text-2xl text-center  tracking-tight text-gray-900">
        Browse through public events listed here on our home page
      </header>
    </div>
  );
}

export default EventsList;
