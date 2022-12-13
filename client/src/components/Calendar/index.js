import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

// import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

function Calendar() {
  const [height, setHeight] = React.useState(window.innerHeight - 100);

  return (
    <div className="p-4">
      <FullCalendar
        height={height}
        initialView="dayGridMonth"
        firstDay={1}
        locale="en"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        themeSystem="Simplex"
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        visibleRange={{
          start: "2020-03-22",
          end: "2020-03-25",
        }}
        navLinks={true}
        weekNumbers={true}
        weekText=""
        selectable={true}
        nowIndicator={true}
        select={(info) => {
          console.log(info);
        }}
        eventClick={(e) => {
          const eventObj = e.event;
          console.log({ eventObj });
        }}
        dayMaxEvents={true}
        eventMaxStack={2}
        events={"https://fullcalendar.io/api/demo-feeds/events.json"}
        windowResize={() => setHeight(window.innerHeight - 100)}
      />
    </div>
  );
}

export default Calendar;
