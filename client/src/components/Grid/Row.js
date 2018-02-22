import React from "react";

export const Row = ({ fluid, children }) =>
  <div className={`row${fluid ? "-fluid" : ""}`}>
    <div className='col s12'>
      {children}
    </div>
  </div>;
