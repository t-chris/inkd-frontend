import React from "react";

export default function NotFound() {
  return (
    <div style={errorStyle} className="NotFound">
        <h1 style={fourOFourErrorStyle}>404 Error.</h1>
        <h3>Looks like Chris screwed up.</h3>
    </div>
  );
}

const errorStyle = {
    paddingTop : "100px",
    textAlign : "center"
}

const fourOFourErrorStyle = {
    fontSize: "5em"
}