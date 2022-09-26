import React, { lazy, Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import Loading from "../../Utils/Loading";

const AnalogTimer= lazy(() => import("./Analog/Analog"));
const DigitalTimer = lazy(() => import("./Digital/Digital"));

const Timer = () => {
    const { type, active, activites } = useSelector((state) => state.timer);

    useEffect(() => {
        if(Notification.permission === 'default') {
            Notification.requestPermission();
        }
    });

    return (
        <div className="clock-container" style={{background: `${activites[active].timerBorder}`}}>
            <div className="clock">
                <Suspense fallback={<Loading color={activites[active].color} />}>
                    {type === "digital" ? (<DigitalTimer />) : (
                        <AnalogTimer />
                    )}
                </Suspense>
            </div>
        </div>
    )
}

export default Timer;