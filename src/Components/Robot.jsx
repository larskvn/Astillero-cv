import React from "react";
import { Zoom } from "react-reveal";
import robot from "../assets/robot.png";

const Robot = ({ inputText }) => {
  return (
    <Zoom top cascade>
      <div className="sectio-robot">
        <div className="robot-img">
          <img src={robot} className="w-72" />
        </div>

        <div className="eyes-container">
          <div className="eye left-eye">
            <div
              className="pupil"
              style={{
                transform: `translateX(${inputText.length * 0.4}px)`,
                top:
                  inputText.length >= 17
                    ? "45%"
                    : inputText.length >= 1
                    ? "45%"
                    : "0%", // Posición inicial en el centro, luego baja a 45% cuando se escribe
                left:
                  inputText.length >= 20
                    ? "-90%"
                    : inputText.length >= 17
                    ? "-70%"
                    : inputText.length >= 1
                    ? "-75%"
                    : "0%", // Posición inicial en el centro, luego baja a -70% cuando se escribe
              }}
            ></div>
          </div>
          <div className="eye right-eye">
            <div
              className="pupil"
              style={{
                transform: `translateX(${inputText.length * 0.4}px)`,
                top:
                  inputText.length >= 17
                    ? "45%"
                    : inputText.length >= 1
                    ? "45%"
                    : "0%", // Posición inicial en el centro, luego baja a 45% cuando se escribe
                left:
                  inputText.length >= 20
                    ? "-90%"
                    : inputText.length >= 17
                    ? "-70%"
                    : inputText.length >= 1
                    ? "-75%"
                    : "0%", // Posición inicial en el centro, luego baja a -70% cuando se escribe
              }}
            ></div>
          </div>
        </div>
      </div>
    </Zoom>
  );
};

export default Robot;
