import React from "react";
import { Checkbox, FormControlLabel, Link, TextField } from "@mui/material";

function Calendar() {
  return (
    <div className="flex min-h-full justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-4">
        <div className="flex items-center flex-col">
          <div className="w-40"></div>

          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Calendar
          </h2>
        </div>
        <div className="space-y-4 p-4">
          <div className="-space-y-px rounded-md"></div>

          <div>
            <button
              className="btn_default"
              // onClick={validateData}
              // disabled={errors?.password || errors?.email}
            >
              Import Calendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
