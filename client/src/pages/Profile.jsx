/* DEPENDENCIES */
import React, { useState } from "react";
import Hourglass from "../components/Loading";
import "../styles/profile.css";

/* PROFILE */
export default function Profile() {
  const loading = false;

  if (loading) {
    return <Hourglass />;
  }

  return (
    <div className="montserrat" id="profile-page">
      <div>
        <div className="card">Name</div>
        <div className="card">Edit profile</div>
      </div>
    </div>
  );
}
