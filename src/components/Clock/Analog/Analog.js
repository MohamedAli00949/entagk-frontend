import React from "react";

import AnalogControllers from "../Analog/Controllers/AnalogControllers"
import Arrows from "../Analog/Arrows"

const AnalogTimer = ({ time, setTime, handleReset, toggleStart, handleSkip }) => {
  const nums = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

  return (
    <>
      <Arrows
        nums={nums}
        time={time <= 60 ? time : time / 60}
      />
      <AnalogControllers
        handleReset={handleReset} 
        toggleStart={toggleStart} 
        handleSkip={handleSkip}
        setTime={setTime} 
        time={time}
      />
    </>
  )
};

export default AnalogTimer;
