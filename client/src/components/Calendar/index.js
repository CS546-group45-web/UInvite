import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { createAuthLink } from '../../utils/apis/auth';
import { getUserDetails } from '../../utils/apis/user';

function Calendar() {
  const [user, setUser] = useState(null);
  const setting = {
    googleCalendarApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    eventSources: [
      {
        googleCalendarId: 'manisaiprasadam@gmail.com',
      },
    ],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
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

  const getUser = async () => {
    const { data } = await getUserDetails();
    setUser(data);
    console.log(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  const getUserAccesdetails = async () => {
    if (user?.googleConnected) {
      const { googleCalendarId } = user;
      setting.eventSources = [
        {
          googleCalendarId,
        },
      ];
    } else {
      createAuthLink().then((res) => {
        const {
          data: { url },
        } = res;
        window.location.href = url;
      });
    }
  };

  return (
    <div className="p-4">
      {user?.googleConnected ? (
        <FullCalendar {...setting} />
      ) : (
        <button className="btn_default" onClick={getUserAccesdetails}>
          Connect to google calendar
        </button>
      )}
    </div>
  );
}

export default Calendar;
