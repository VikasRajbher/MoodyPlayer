import React, { useRef, useEffect } from "react";
import * as faceapi from "face-api.js";
import "./FacialExpression.css";
import axios from "axios";

export default function FacialExpression({ setsongs }) {
  const videoRef = useRef();

  const loadModels = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
    await faceapi.nets.faceExpressionNet.loadFromUri("/models");
    startVideo();
  };
  loadModels();

  // Start webcam
  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => (videoRef.current.srcObject = stream))
      .catch((err) => console.error("Error accessing webcam:", err));
  };

  // Detect expressions
  async function DetectMood() {
    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    let MostProableExpression = 0;
    let _expression = "";

    if (!detections || detections.length === 0) {
      console.log("No face detected");
      return;
    }

    for (const expression of Object.keys(detections[0].expressions)) {
      if (detections[0].expressions[expression] > MostProableExpression) {
        MostProableExpression = detections[0].expressions[expression];
        _expression = expression;
      }
    }

    console.log(_expression);

    axios
      .get(`https://moodyplayer-zbf4.onrender.com/songs?mood=${_expression}`)
      .then((response) => {
        console.log(response.data);
        setsongs(response.data.songs);
      });
  }

  // Load models
  useEffect(() => {
    loadModels().then(startVideo);
  }, []);

  return (
    <div className="mood-elem">
      <video ref={videoRef} autoPlay muted className="user-video-feed" />

      <button onClick={DetectMood} className="btn">
        Detect Mood
      </button>
    </div>
  );
}
