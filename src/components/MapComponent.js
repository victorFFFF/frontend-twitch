import React, { useState } from "react";

export default function MapComponent() {
  updateMap("hi", "there");
  return (
    <ul>
      {[...myMap.keys()].map((k) => (
        <li key={k}>myMap.get(k)</li>
      ))}
    </ul>
  );
}
