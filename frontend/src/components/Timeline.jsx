import React, { useEffect, useState } from "react";
import api from "../api";
import IconBot from "../icons/IconBot";
import IconNotes from "../icons/IconNotes";
import IconClick from "../icons/IconClick";
import IconProfile from "../icons/IconProfile";
import "../styles/Home.css";

const Timeline = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    getTimeLine();
  }, []);

  const getTimeLine = () => {
    api
      .get("/api/timeline/")
      .then((res) => res.data)
      .then((data) => {
        setActivities(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };
  // Mapping between activity types and icons
  const activityIcons = {
    "Had a Chat with the bot": <IconBot />,
    "Created a note": <IconNotes />,
    "Clicked the clicker": <IconClick />,
    "Updated their bio": <IconProfile />,
  };

  return (
    <div className="container">
      <h2>Stuff Happened</h2>
      <article className="timeline">
        {activities.map((activity, index) => (
          <div key={index} className="activity-card">
            <div className="icon">{activityIcons[activity.event]}</div>
            <div>
              {activity.user} {activity.event}
            </div>
            <div className="time">
              <small> @ {new Date(activity.time).toLocaleString()} </small>
            </div>
          </div>
        ))}
      </article>
    </div>
  );
};

export default Timeline;
