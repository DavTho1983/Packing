import React from "react";
import "./box.css";

export default function Box({ width, height, backgroundColour }) {  
  return (
    <div
      className="Box"
      style={{ width: width, height: height, backgroundColor: backgroundColour }}
    >
      &nbsp;
    </div>
  );
}
