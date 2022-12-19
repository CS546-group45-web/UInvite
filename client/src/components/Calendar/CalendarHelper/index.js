import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import googleCalendarPlugin from '@fullcalendar/google-calendar';

export default function CalendarHelper(googleCalendarId) {
  console.log(googleCalendarId.googleCalendarId);
  const setting = {
    googleCalendarApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    eventSources: [
      {
        googleCalendarId: googleCalendarId.googleCalendarId,
      },
    ],
    themeSystem: 'Simplex',
    plugins: [
      googleCalendarPlugin,
      dayGridPlugin,
      timeGridPlugin,
      interactionPlugin,
    ],
    visibleRange: {
      start: '2020-03-22',
      end: '2020-03-25',
    },
    navLinks: true,
    weekNumbers: true,
    weekText: '',
    selectable: true,
    nowIndicator: true,
    select: (info) => {
      console.log(info);
    },
    eventClick: (info) => {
      // open event in new tab
      info.jsEvent.preventDefault();
      window.open(info.event.url, 'gcalevent', 'width=700,height=600').focus();
    },
  };

  return <FullCalendar {...setting} />;
}
