import React, { useEffect, useRef } from "react";

const AudioVisualizer = ({ audioElements }) => {
  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserNodesRef = useRef([]);
  const dataArraysRef = useRef([]);

  useEffect(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    }

    const audioContext = audioContextRef.current;

    audioElements.forEach((audioElement, index) => {
      if (!analyserNodesRef.current[index]) {
        const source = audioContext.createMediaElementSource(audioElement);
        const analyser = audioContext.createAnalyser();
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        analyser.fftSize = 256;

        analyserNodesRef.current[index] = analyser;
        dataArraysRef.current[index] = new Uint8Array(
          analyser.frequencyBinCount
        );
      }
    });

    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext("2d");

    if (!canvasCtx) {
      console.error("Failed to get canvas context");
      return;
    }

    const draw = () => {
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

      audioElements.forEach((audioElement, index) => {
        const analyser = analyserNodesRef.current[index];
        const dataArray = dataArraysRef.current[index];

        if (analyser && dataArray) {
          analyser.getByteFrequencyData(dataArray);

          const barWidth =
            canvas.width / dataArray.length / audioElements.length;
          let barHeight;
          let x = index * barWidth * dataArray.length;

          for (let i = 0; i < dataArray.length; i++) {
            barHeight = dataArray[i];
            canvasCtx.fillStyle = `rgb(${barHeight + 100},50,50)`;
            canvasCtx.fillRect(
              x,
              canvas.height - barHeight / 2,
              barWidth,
              barHeight / 2
            );

            x += barWidth;
          }
        } else {
          console.error(
            `Analyser or data array not found for audio element at index ${index}`
          );
        }
      });

      requestAnimationFrame(draw);
    };

    draw();

    // Clean up on unmount
    return () => {
      audioContext.close();
    };
  }, [audioElements]);

  return <canvas ref={canvasRef} width="800" height="400"></canvas>;
};

export default AudioVisualizer;
