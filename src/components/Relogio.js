import React, { useState, useEffect } from 'react';
import caneca from "../img/mug-rotate.gif";

function Relogio() {

    const [second, setSecond] = useState('00');
    const [minute, setMinute] = useState('00');
    const [isActive, setIsActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [counter, setCounter] = useState(0);
    const [valorInicial, setValorInicial] = useState(0);
    const [lbStart, setLbStart] = useState("Start");
    const [lbCancel, setLbCancel] = useState("Cancel");
    const [stScreen, setStScreen] = useState("Please, turn on");

    function stopTimer() {
      setIsActive(false);
      setIsPaused(false);
      setCounter(0);
      setSecond('00');
      setMinute('00');
      setLbStart("Start"); 
      setStScreen("Cancelled");
      this.forceUpdate();
    }

    function endTimer() {
      setIsActive(false);
      setIsPaused(false);
      setCounter(0);
      setSecond('00');
      setMinute('00');
      setLbStart("Start"); 
      setStScreen("Finished");
      this.forceUpdate();
    }

    function addTimer(m) {
      setCounter(counter + m);
    }  

    function startTimer() {
      let inicio = valorInicial;
      if ( inicio === 0 ) inicio = 30;
      setCounter(inicio);
      setIsActive(true);
      setIsPaused(false);
    }  

    function pauseResume() {
      setIsPaused(!isPaused);
    } 

    function pressedBtStart() {
      if ( isActive ) {
        if ( isPaused ) {
          pauseResume();
        } else {
          addTimer(30);
        }
      } else {
        startTimer();
      }
   }

    function pressedBtCancel() {
      if ( isActive ) {
        if ( isPaused ) {
          stopTimer();
        } else {
          pauseResume();
        }
      } else {
        stopTimer();
      }

    }

    function updateScreen() {
      if ( isActive ) {
         if ( isPaused ) {
          setLbStart("Resume");
          setLbCancel("Cancel");
          setStScreen("Paused");
        } else {
          setLbStart("+30s");
          setLbCancel("Pause");
          setStScreen(<img src={ caneca } />);
         }
      } else {
        setLbStart("Start");
        setLbCancel("Cancel");
        setStScreen("Finished");
      }
    }

    useEffect(() => {
      let intervalId;
      if ( isActive ) {
        intervalId = setInterval(() => {
          const secondCounter = counter % 60;
          const minuteCounter = Math.floor(counter / 60);
          const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}`: secondCounter;
          const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}`: minuteCounter;
          setSecond(computedSecond);
          setMinute(computedMinute);
          if ( counter == 0 ) {
            endTimer();
          } else if ( !isPaused ) {
            setCounter(counter - 1);
          }
          updateScreen();
        }, 1000)
      }
         return () => clearInterval(intervalId);
      }, [isActive, isPaused, lbStart, lbCancel, stScreen, counter]
    )

    return (
      <div className={ isActive ? "container strunning": "container stinicio" }>
        <div className={ isActive ? "tela turnedon": "tela" }>
          <h1>{ stScreen }</h1>
        </div>
        <div className="panel">
        <div className="time">
          <span className="minute">{minute}</span>
          <span>:</span>
          <span className="second">{second}</span>
        </div>
        <div className="buttons">
          <button onClick={pressedBtStart} className="start">
            { lbStart }
          </button>
          <button onClick={pressedBtCancel} className="reset">
            { lbCancel }
          </button>
        </div>

        </div>
      </div>
    )
}

export default Relogio;
