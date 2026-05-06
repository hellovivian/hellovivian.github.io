import React, { useRef, useEffect, useState } from "react";
import { hexToRgb, getMouseColor } from "../utils/color";

function createGaussianDot(size, blur, color) {
  const dotCanvas = document.createElement("canvas");
  const dotCtx = dotCanvas.getContext("2d");
  const canvasSize = size + blur * 4;
  dotCanvas.width = canvasSize;
  dotCanvas.height = canvasSize;

  let rgb;
  if (color && color.indexOf("#") === 0) {
    rgb = hexToRgb(color);
  } else if (color && color.indexOf("rgb") === 0) {
    const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      rgb = { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) };
    }
  }
  if (!rgb || isNaN(rgb.r) || isNaN(rgb.g) || isNaN(rgb.b)) {
    rgb = { r: 0, g: 0, b: 0 };
  }
  const safeSize = isFinite(size) ? size : 50;
  const safeBlur = isFinite(blur) ? blur : 10;
  const dotCanvasSize = safeSize + safeBlur * 4;
  dotCanvas.width = dotCanvasSize;
  dotCanvas.height = dotCanvasSize;

  const gradient = dotCtx.createRadialGradient(
    dotCanvasSize / 2,
    dotCanvasSize / 2,
    0,
    dotCanvasSize / 2,
    dotCanvasSize / 2,
    safeSize / 2
  );
  gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`);
  gradient.addColorStop(0.7, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.53)`);
  gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
  dotCtx.fillStyle = gradient;
  dotCtx.fillRect(0, 0, canvasSize, canvasSize);

  dotCtx.filter = `blur(${blur}px)`;
  dotCtx.globalCompositeOperation = "source-over";
  dotCtx.drawImage(dotCanvas, 0, 0);

  return dotCanvas;
}

function discretizeImage(sourceCanvas, gridSize) {
  const discreteCanvas = document.createElement("canvas");
  const discreteCtx = discreteCanvas.getContext("2d");
  discreteCanvas.width = sourceCanvas.width;
  discreteCanvas.height = sourceCanvas.height;

  const tempCtx = document.createElement("canvas").getContext("2d");
  tempCtx.canvas.width = sourceCanvas.width;
  tempCtx.canvas.height = sourceCanvas.height;
  tempCtx.drawImage(sourceCanvas, 0, 0);

  const imageData = tempCtx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
  const data = imageData.data;

  for (let y = 0; y < sourceCanvas.height; y += gridSize) {
    for (let x = 0; x < sourceCanvas.width; x += gridSize) {
      const centerX = Math.min(x + Math.floor(gridSize / 2), sourceCanvas.width - 1);
      const centerY = Math.min(y + Math.floor(gridSize / 2), sourceCanvas.height - 1);
      const centerIndex = (centerY * sourceCanvas.width + centerX) * 4;
      const r = data[centerIndex];
      const g = data[centerIndex + 1];
      const b = data[centerIndex + 2];
      const a = data[centerIndex + 3];
      discreteCtx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a / 255})`;
      discreteCtx.fillRect(x, y, gridSize, gridSize);
    }
  }
  return discreteCanvas;
}

function InteractiveDot({ dotSize, blurAmount, dotColor }) {
  const canvasRef = useRef(null);
  const [canvasSize, setCanvasSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [mouse, setMouse] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    useMouseColor: true,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      setMouse({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        useMouseColor: true,
      });
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [canvasSize]);

  useEffect(() => {
    function updateCanvasSize() {
      setCanvasSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setMouse((m) => ({
        ...m,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      }));
    }
    window.addEventListener("resize", updateCanvasSize);
    updateCanvasSize();
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const { width, height } = canvasSize;

    const color = mouse.useMouseColor
      ? getMouseColor(mouse.x, mouse.y, width, height)
      : dotColor;

    const dotCanvas = createGaussianDot(dotSize, blurAmount, color);

    const dotX = mouse.x - dotCanvas.width / 2;
    const dotY = mouse.y - dotCanvas.height / 2;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);

    ctx.drawImage(dotCanvas, dotX, dotY);

    const discreteCanvas = discretizeImage(canvas, 12);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(discreteCanvas, 0, 0);
  }, [dotSize, blurAmount, dotColor, mouse, canvasSize]);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "block",
        zIndex: 0,
      }}
    />
  );
}

export default InteractiveDot;
