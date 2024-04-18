import React, { useState, useEffect } from "react";
import "../styles/Profile.css";
import api from "../api";

const Profile = () => {
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = () => {
    // Fetch the profile when the component mounts
    api.get("/api/profile/").then((res) => {
      setProfile(res.data);
      setBio(res.data.bio);
    });
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("bio", bio);
    if (avatar) {
      formData.append("avatar", avatar);
    }

    api
      .put("/api/profile/", formData)
      .then((res) => {
        alert("Profile updated!");
        setProfile(res.data);
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="fit">
      <h1>This is your profile: {profile.user}</h1>
      <form onSubmit={handleSubmit}>
        {profile.avatar && <img src={profile.avatar} alt="Avatar" />}
        <label>
          Bio:
          <textarea
            className="text-area"
            value={bio}
            onChange={handleBioChange}
          />
        </label>
        <label>
          Avatar:
          <input type="file" onChange={handleAvatarChange} />
        </label>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
