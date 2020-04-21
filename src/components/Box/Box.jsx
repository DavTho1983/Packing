import React from "react";
import "./box.css";

export default function Box({ width, height, backgroundColour, boxText }) {
    const generateText = () => {

    }

    const getTextContainer = () => {
        let remainingWidth = width - height;
        return <div style={{
            position: 'absolute', 
            top: 0, 
            left: 0, 
            marginLeft: height, 
            padding: '5px', 
            width: remainingWidth, 
            overflow: 'hidden'
        }}>{boxText}</div>
    }
    

    const Circle = () => { 
        return <div className="circle" style={{position: 'absolute', top: 0, left: 0, width: Math.min(width, height), height: Math.min(width, height), backgroundColor: 'white'}}>
            &nbsp;
        </div>
    }

  return (
    <div
      className="Box"
      style={{  width: width, height: height, backgroundColor: backgroundColour }}
    >
        <Circle/>
        {Math.min(width, height) === height && getTextContainer()}

    </div>
  );
}
