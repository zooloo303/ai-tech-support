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
    bot: <IconBot />,
    notes: <IconNotes />,
    click: <IconClick />,
    profile: <IconProfile />,
  };

  return (
    <div className="container">
      <h2>Stuff Happened</h2>
      <article className="timeline">
        {activities.map((activity, index) => (
          <div key={index} className="activity-card">
            {/* <div className="activity-icon">{activityIcons[activity.event]}</div> */}
            <div className="activity-details">{activity.user}</div>
            <div className="activity-type">{activity.event}</div>
            <div className="activity-time">
              {new Date(activity.time).toLocaleString()}
            </div>
          </div>
        ))}
      </article>
    </div>
  );
};

export default Timeline;
