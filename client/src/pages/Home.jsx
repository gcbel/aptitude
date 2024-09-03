/* DEPENDENCIES */
import React from "react";
import Hourglass from "../components/Loading";

const loading = false;

/* HOME PAGE */
export default function Home() {
  if (loading) {
    return <Hourglass />;
  }

  return (
    <div>
      <h1 className="title playfair">Personalize your productivity.</h1>
    </div>
  );
}
