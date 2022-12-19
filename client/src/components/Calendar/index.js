import React, { useState, useEffect } from 'react';
import { getUserDetails } from '../../utils/apis/user';
import { createAuthLink } from '../../utils/apis/auth';
import CalendarHelper from './CalendarHelper';
function Calendar() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    const { data } = await getUserDetails();
    setUser(data);
    console.log(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  const getUserAccesdetails = async () => {
    if (!user?.googleConnected) {
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
        <CalendarHelper
          googleCalendarId={user?.googleCalendarDetails.googleCalendarId}
        />
      ) : (
        <button className="btn_default" onClick={getUserAccesdetails}>
          Connect to google calendar
        </button>
      )}
    </div>
  );
}

export default Calendar;
