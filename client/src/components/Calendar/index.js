import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import { createAuthLink } from "../../utils/apis/auth";
import { getUserDetails } from "../../utils/apis/user";

function Calendar() {
  const setting = {
    googleCalendarApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    eventSources: [
      {
        googleCalendarId: "manisaiprasadam@gmail.com",
      },
    ],
    initialView: "dayGridMonth",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay",
    },
    themeSystem: "Simplex",
    plugins: [
      googleCalendarPlugin,
      dayGridPlugin,
      timeGridPlugin,
      interactionPlugin,
    ],
    visibleRange: {
      start: "2020-03-22",
      end: "2020-03-25",
    },
    navLinks: true,
    weekNumbers: true,
    weekText: "",
    selectable: true,
    nowIndicator: true,
    select: (info) => {
      console.log(info);
    },
    eventClick: (info) => {
      // open event in new tab
      info.jsEvent.preventDefault();
      window.open(info.event.url, "gcalevent", "width=700,height=600").focus();
    },
  };

  const getUserAccesdetails = async () => {
    getUserDetails().then((res) => {
      const { data } = res;
      if (!data?.googleConnected || data?.googleConnected === false)
        createAuthLink().then((res) => {
          const {
            data: { url },
          } = res;
          debugger;
          window.location.href = url;
        });
      else window.location.href = "/";
    });
  };

  return (
    <div className="p-4">
      <button className="btn_default" onClick={getUserAccesdetails}>
        Connect to google calendar
      </button>
      <FullCalendar {...setting} />
    </div>
  );
}

export default Calendar;
