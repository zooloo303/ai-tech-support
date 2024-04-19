import React, { useEffect, useState } from "react";
import api from "../api";
import "../styles/MyNotes.css";

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

  return (
    <div className="container">
      <h2>Stuff Happened</h2>
      <article>
        {" "}
        {activities.map((activity, index) => (
          <div key={index} className="activity">
            <div className="activity-type">{activity.event}</div>
            <div className="activity-time">
              {new Date(activity.time).toLocaleString()}
            </div>
            <div className="activity-details">{activity.user}</div>
          </div>
        ))}
      </article>
    </div>
  );
};

export default Timeline;
