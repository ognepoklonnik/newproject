import React, { useEffect, useState } from "react";
import { css } from "./Timer.css";

const Timer = () => {
    const [seconds,setSeconds]=useState(0);
   


    let timer = 0;
    useEffect(() => {
        timer = setInterval(()=>{
            setSeconds(seconds+1);
            if(seconds === 60){ 
            setSeconds(0);
            }
        }, 1000)
        return () => clearInterval(timer);
    });

    const reset = () => {
        setSeconds(0);
    }

    const stop = () => { 
        clearInterval(timer);
    }

    // const start = () => {
    //     setInterval(()=>{
    //         let _seconds = 0;
    //         if ()
    //     }, 1000)
    //     return () => clearInterval(timer);
    // };

    return (
        <div>
            <h1> Test timer v.1</h1>
            <h2>{seconds<10? '0'+seconds: seconds}</h2>
            {/* <button className="start" onClick={start}>Start</button> */}
            <button className="start" onClick={reset}>Reset</button>
            <button className="stop" onClick={stop}>Stop</button>
        </div>
    )
}





export default Timer;