import React from "react";

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 2,
      marginBottom: "20px",
    }}
  />
);

export default ColoredLine;
